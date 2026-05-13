# Sistema de Notificaciones Automáticas

Este sistema envía **automáticamente** notificaciones por correo a **TODOS los vecinos** de una colonia cuando una convocatoria falta **2 días para vencer**.

## Características

✅ **Automático** - Se ejecuta diariamente sin intervención  
✅ **A todos los vecinos** - Cada vecino registrado recibe notificación  
✅ **Inteligente** - Solo notifica si convocatoria está en estado "Próxima"  
✅ **Robusto** - Maneja errores y reintentos  

## Cómo funciona

1. **Inicialización**: Cuando Next.js inicia, automáticamente se activa el servicio de cron (`lib/cronJobs.ts`)
2. **Revisión**: Cada día a las **08:00 AM**, el sistema revisa todas las colonias
3. **Detección**: Identifica convocatorias con estado `Próxima` y exactamente 2 días para vencer
4. **Notificación**: Envía correos a **TODOS los vecinos** de esa colonia + administradores
5. **Registro**: Registra los envíos exitosos y errores en los logs del servidor

## Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz con las siguientes variables:

```env
# SMTP Configuration
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=tu_usuario_mailtrap
SMTP_PASS=tu_contraseña_mailtrap
SMTP_FROM=noreply@tucolonia.local
```

## Proveedores de SMTP Recomendados

### Para desarrollo/pruebas:
- **Mailtrap** (https://mailtrap.io) - Servicio gratuito para testing
- **Ethereal Email** - Generado automáticamente por nodemailer

### Para producción:
- **SendGrid** - API-based, escalable
- **AWS SES** - Económico
- **Mailgun** - Flexible y confiable
- **Gmail/Outlook** - SMTP directo

## Opciones de Uso

### Opción 1: Automático (RECOMENDADO)
El sistema se ejecuta automáticamente cada día a las 08:00 AM sin necesidad de intervención.

**Logs esperados al iniciar servidor:**
```
✅ Cron job de notificaciones iniciado (08:00 AM diariamente)
```

**Logs diarios a las 08:00 AM:**
```
⏰ Ejecutando cron job de notificaciones...
📧 Encontradas 1 convocatoria(s) a notificar
✅ Notificación enviada a: juan.garcia@email.com
✅ Notificación enviada a: maria.lopez@email.com
...
📊 Resumen: 5 notificaciones enviadas, 0 errores
```

### Opción 2: Manual (desde Admin Panel)
El administrador puede hacer clic en el botón "📧 Notificar" en su panel para enviar manualmente.

**Endpoint:**
```
POST /api/notifications/send
Body: { "db": { colonias: {...} } }
Response: { sent: 5, total: 1, message: "..." }
```

## Editar el Cronograma

Para cambiar la hora de ejecución, edita `lib/cronJobs.ts`:

```typescript
// Para ejecutar a las 09:00 AM
cron.schedule('0 9 * * *', async () => { ... })

// Para ejecutar cada hora
cron.schedule('0 * * * *', async () => { ... })

// Para ejecutar cada 30 minutos
cron.schedule('*/30 * * * *', async () => { ... })
```

**Sintaxis cron**: `"minuto hora día mes día_semana"`

## Estructura de Datos de Vecinos

Los vecinos se encuentran en `lib/db.ts`:

```typescript
vecinos: [
  { 
    id: 'v1', 
    nombre: 'Juan García', 
    usuario: 'jgarcia',
    correo: 'juan.garcia@email.com',
    telefono: '8118234567'
  },
  ...
]
```

El sistema automáticamente **obtiene todos los correos de vecinos activos** y los **administradores activos** de cada colonia.

## Testing

Para probar el sistema sin configurar SMTP real:

1. Usa **Mailtrap** (obtén cuenta gratuita)
2. Copia las credenciales a `.env.local`
3. Los correos se guardan en la bandeja virtual de Mailtrap
4. Puedes ver el contenido HTML y verificar formato

## Producción

Para desplegar en producción:

1. Configura variables de entorno SMTP reales
2. Usa un servicio de email profesional (SendGrid, AWS SES, etc.)
3. Monitorea los logs para asegurar que se envíen sin errores
4. Considera implementar reintentos para correos fallidos
5. Agrega una tabla de auditoría para registrar todos los envíos

## Archivos Relacionados

- `lib/notifications.ts` - Funciones auxiliares para detectar convocatorias y generar HTML
- `lib/cronJobs.ts` - Servicio de cron que se ejecuta automáticamente
- `app/api/notifications/send/route.ts` - API endpoint para envío manual
- `instrumentation.ts` - Inicialización automática en startup de Next.js
- `components/AdminPanel.tsx` - Botón manual para notificar
