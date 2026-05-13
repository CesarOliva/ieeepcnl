import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { obtenerConvocatoriasANotificar, generarHTMLNotificacion, obtenerCorreosColonia } from '@/lib/notifications'

export async function POST(req: NextRequest) {
  try {
    const { db, testEmail, dryRun } = await req.json()

    if (testEmail) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
        port: parseInt(process.env.SMTP_PORT || '2525'),
        auth: {
          user: process.env.SMTP_USER || 'cesaroliva.work@gmail.com',
          pass: process.env.SMTP_PASS || 'cesar',
        },
      })

      const htmlContent = `
        <html>
          <body style="font-family:Arial,sans-serif;color:#1f2937">
            <h2>Correo de prueba - Mi Colonia Participa</h2>
            <p>Este es un envío simulado hacia <strong>${testEmail}</strong>.</p>
            <p>Si recibes este correo, la configuración SMTP está funcionando correctamente.</p>
          </body>
        </html>
      `

      if (dryRun) {
        return NextResponse.json(
          {
            ok: true,
            dryRun: true,
            to: testEmail,
            message: 'Simulación preparada sin envío real',
          },
          { status: 200 }
        )
      }

      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@tucolonia.local',
          to: testEmail,
          subject: 'Correo de prueba - Mi Colonia Participa',
          html: htmlContent,
        })

        return NextResponse.json(
          {
            ok: true,
            sent: 1,
            to: testEmail,
            message: 'Correo de prueba enviado correctamente',
          },
          { status: 200 }
        )
      } catch (emailError) {
        const msg = emailError instanceof Error ? emailError.message : String(emailError)
        console.error('Error enviando correo de prueba:', msg)
        return NextResponse.json(
          {
            ok: false,
            sent: 0,
            to: testEmail,
            error: msg,
          },
          { status: 500 }
        )
      }
    }

    if (!db || !db.colonias) {
      return NextResponse.json(
        { error: 'Base de datos no válida' },
        { status: 400 }
      )
    }

    const convocatoriasANotificar = obtenerConvocatoriasANotificar(db.colonias)

    if (convocatoriasANotificar.length === 0) {
      return NextResponse.json(
        { message: 'No hay convocatorias pendientes de notificación', sent: 0 },
        { status: 200 }
      )
    }

    // Configurar transporte de correo
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: parseInt(process.env.SMTP_PORT || '2525'),
      auth: {
        user: process.env.SMTP_USER || 'cesaroliva.work@gmail.com',
        pass: process.env.SMTP_PASS || 'cesar',
      },
    })

    let sent = 0
    const errors: string[] = []

    for (const item of convocatoriasANotificar) {
      try {
        const coloniaKey = Object.keys(db.colonias).find(k => db.colonias[k].nombre === item.colonia)
        
        if (!coloniaKey) {
          errors.push(`Colonia ${item.colonia} no encontrada`)
          continue
        }

        const colonia = db.colonias[coloniaKey]

        const todosLosCorreos = obtenerCorreosColonia(colonia)

        if (todosLosCorreos.length === 0) {
          errors.push(`No hay correos registrados en ${item.colonia}`)
          continue
        }

        const htmlContent = generarHTMLNotificacion(
          item.colonia,
          item.convocatoria,
          item.dias
        )

        if (dryRun) {
          console.log(`DRY RUN: ${item.colonia} -> ${todosLosCorreos.join(', ')}`)
          sent += todosLosCorreos.length
          continue
        }

        for (const correo of todosLosCorreos) {
          try {
            await transporter.sendMail({
              from: process.env.SMTP_FROM || 'noreply@tucolonia.local',
              to: correo,
              subject: `⏰ Convocatoria próxima a vencer: ${item.convocatoria.tema}`,
              html: htmlContent,
            })
            sent++
          } catch (emailError) {
            const msg = emailError instanceof Error ? emailError.message : String(emailError)
            console.error(`Error enviando a ${correo}:`, msg)
            errors.push(`Error enviando a ${correo}: ${msg}`)
          }
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        console.error(`Error procesando ${item.colonia}:`, msg)
        errors.push(`Error procesando ${item.colonia}: ${msg}`)
      }
    }

    return NextResponse.json(
      {
        message: `Notificaciones enviadas: ${sent}`,
        sent,
        total: convocatoriasANotificar.length,
        errors: errors.length > 0 ? errors : undefined,
        dryRun: Boolean(dryRun),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error en notificaciones:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor', detail: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

/**
 * GET /api/notifications/check
 * Solo verifica sin enviar (para debugging)
 */
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(
      {
        message: 'API de notificaciones activa',
        endpoint: 'POST /api/notifications/send',
        usage: 'Envía notificaciones a TODOS los vecinos de colonias con convocatorias a 2 días de vencer',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Error' },
      { status: 500 }
    )
  }
}