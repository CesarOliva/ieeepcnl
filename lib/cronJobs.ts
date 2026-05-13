import cron from 'node-cron'
import nodemailer from 'nodemailer'
import { obtenerConvocatoriasANotificar, generarHTMLNotificacion, obtenerCorreosColonia } from './notifications'

let cronJobStarted = false

/**
 * Inicia el cron job para enviar notificaciones automáticamente
 * Se ejecuta diariamente a las 8:00 AM
 */
export function iniciarCronJobs() {
  if (cronJobStarted) {
    console.log('✅ Cron jobs ya iniciados')
    return
  }

  // Ejecutar diariamente a las 8:00 AM
  cron.schedule('0 8 * * *', async () => {
    console.log('⏰ Ejecutando cron job de notificaciones...')
    await enviarNotificacionesAutomaticas()
  })

  // Para testing: ejecutar cada minuto (comentar en producción)
  // cron.schedule('* * * * *', async () => {
  //   console.log('⏰ Ejecutando cron job de notificaciones (test)...')
  //   await enviarNotificacionesAutomaticas()
  // })

  cronJobStarted = true
  console.log('✅ Cron job de notificaciones iniciado (08:00 AM diariamente)')
}

/**
 * Función que envía las notificaciones automáticamente
 * Se conecta a la BD y envía correos a todos los vecinos de colonias
 * con convocatorias a 2 días de vencer
 */
async function enviarNotificacionesAutomaticas() {
  try {
    // Obtener la BD del localStorage (en servidor-side, esto es simulado)
    // En producción, deberías obtenerlo de tu BD real
    const dbJSON = typeof window !== 'undefined' 
      ? localStorage.getItem('miColoniaParticipaDB_v2') 
      : null
    
    if (!dbJSON) {
      console.log('❌ No hay BD disponible en localStorage')
      return
    }

    const db = JSON.parse(dbJSON)

    // Obtener convocatorias a notificar
    const convocatoriasANotificar = obtenerConvocatoriasANotificar(db.colonias)

    if (convocatoriasANotificar.length === 0) {
      console.log('ℹ️ No hay convocatorias pendientes de notificación')
      return
    }

    console.log(`📧 Encontradas ${convocatoriasANotificar.length} convocatoria(s) a notificar`)

    // Configurar transporte de correo
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: parseInt(process.env.SMTP_PORT || '2525'),
      auth: {
        user: process.env.SMTP_USER || 'demo@example.com',
        pass: process.env.SMTP_PASS || 'demo_password',
      },
    })

    let enviados = 0
    let errores = 0

    // Enviar correos para cada convocatoria
    for (const item of convocatoriasANotificar) {
      try {
        // Encontrar la colonia
        const coloniaKey = Object.keys(db.colonias).find(
          k => db.colonias[k].nombre === item.colonia
        )
        
        if (!coloniaKey) {
          console.error(`❌ Colonia ${item.colonia} no encontrada`)
          errores++
          continue
        }

        const colonia = db.colonias[coloniaKey]

        // Obtener TODOS los correos de la colonia (vecinos + admins)
        const todosLosCorreos = obtenerCorreosColonia(colonia)

        if (todosLosCorreos.length === 0) {
          console.error(`❌ No hay correos registrados en ${item.colonia}`)
          errores++
          continue
        }

        // Generar HTML del correo
        const htmlContent = generarHTMLNotificacion(
          item.colonia,
          item.convocatoria,
          item.dias
        )

        // Enviar a TODOS los vecinos y admins
        for (const correo of todosLosCorreos) {
          try {
            await transporter.sendMail({
              from: process.env.SMTP_FROM || 'noreply@tucolonia.local',
              to: correo,
              subject: `⏰ Convocatoria próxima a vencer: ${item.convocatoria.tema}`,
              html: htmlContent,
            })
            enviados++
            console.log(`✅ Notificación enviada a: ${correo}`)
          } catch (emailError) {
            const msg = emailError instanceof Error ? emailError.message : String(emailError)
            console.error(`❌ Error enviando a ${correo}: ${msg}`)
            errores++
          }
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        console.error(`❌ Error procesando ${item.colonia}: ${msg}`)
        errores++
      }
    }

    console.log(`\n📊 Resumen: ${enviados} notificaciones enviadas, ${errores} errores`)
  } catch (error) {
    console.error('❌ Error en cron job de notificaciones:', error)
  }
}

export { enviarNotificacionesAutomaticas }
