/**
 * Utility functions for notification management
 */

export interface ConvocatoriaNotificable {
  id: string
  tema: string
  fecha: string
  horario: string
  estado: string
  correoContacto?: string
}

export interface VecinoData {
  id: string
  nombre: string
  usuario: string
  correo: string
  telefono: string
}

export interface ColoniaData {
  nombre: string
  convocatorias: ConvocatoriaNotificable[]
  vecinos?: VecinoData[]
}

/**
 * Calcula cuántos días faltan para que una convocatoria venza
 */
export function diasFaltantes(fechaConvocatoria: string): number {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  const fecha = new Date(fechaConvocatoria)
  fecha.setHours(23, 59, 59, 999)

  const diferencia = fecha.getTime() - hoy.getTime()
  const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24))

  return dias
}

/**
 * Verifica si una convocatoria debe notificarse (falta exactamente 2 días)
 */
export function debeNotificarse(fechaConvocatoria: string, estado: string): boolean {
  // Solo notificar si está en estado "Próxima" y falta exactamente 2 días (o menos, hasta 2)
  if (estado !== 'Próxima') return false

  const diasFalt = diasFaltantes(fechaConvocatoria)
  return diasFalt <= 2 && diasFalt > 0
}

/**
 * Obtiene todos los correos de una colonia (vecinos + admins)
 */
export function obtenerCorreosColonia(colonia: any): string[] {
  const correos = new Set<string>()

  // Agregar correos de vecinos
  if (colonia.vecinos && Array.isArray(colonia.vecinos)) {
    colonia.vecinos.forEach((v: any) => {
      if (v.correo) correos.add(v.correo)
    })
  }

  // Agregar correos de admins
  if (colonia.admins && Array.isArray(colonia.admins)) {
    colonia.admins.forEach((a: any) => {
      if (a.correo && a.activo) correos.add(a.correo)
    })
  }

  return Array.from(correos)
}

/**
 * Obtiene todas las convocatorias que necesitan notificación
 */
export function obtenerConvocatoriasANotificar(
  colonias: Record<string, ColoniaData>
): { colonia: string; convocatoria: ConvocatoriaNotificable; dias: number }[] {
  const aNotificar: { colonia: string; convocatoria: ConvocatoriaNotificable; dias: number }[] = []

  Object.entries(colonias).forEach(([key, colonia]) => {
    colonia.convocatorias.forEach((conv) => {
      if (debeNotificarse(conv.fecha, conv.estado)) {
        aNotificar.push({
          colonia: colonia.nombre,
          convocatoria: conv,
          dias: diasFaltantes(conv.fecha),
        })
      }
    })
  })

  return aNotificar
}

/**
 * Genera el contenido HTML del correo de notificación
 */
export function generarHTMLNotificacion(
  colonianombre: string,
  convocatoria: ConvocatoriaNotificable,
  diasRestantes: number
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(160deg, #1b2d5c, #243a73); color: white; padding: 20px; border-radius: 8px; }
        .content { background: #f5f5f5; padding: 20px; margin-top: 20px; border-radius: 8px; }
        .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
        .alert { background: #fff3cd; border-left: 4px solid #ffc000; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .btn { background: #ffc000; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏘️ Mi Colonia Participa</h1>
          <p>Notificación de Convocatoria Próxima a Vencer</p>
        </div>

        <div class="content">
          <h2>Hola vecino/a de ${colonianombre}</h2>

          <div class="alert">
            <strong>⚠️ Importante:</strong> La siguiente convocatoria vence en <strong>${diasRestantes} ${diasRestantes === 1 ? 'día' : 'días'}</strong>
          </div>

          <h3>${convocatoria.tema}</h3>

          <p><strong>Fecha:</strong> ${convocatoria.fecha}</p>
          <p><strong>Horario:</strong> ${convocatoria.horario}</p>
          <p><strong>Estado:</strong> ${convocatoria.estado}</p>

          <p>Te invitamos a participar en esta convocatoria. No pierdas la oportunidad de ser parte de las decisiones importantes de tu colonia.</p>

          <a href="https://tucolonia.local/dashboard" class="btn">Ir a la Plataforma</a>

          <div class="footer">
            <p>Este es un mensaje automatizado de Mi Colonia Participa.</p>
            <p>Si tienes dudas, contacta a tu administrador de colonia.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
