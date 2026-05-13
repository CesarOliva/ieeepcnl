/**
 * Archivo de inicialización para Next.js
 * Este archivo se ejecuta automáticamente cuando el servidor inicia
 * 
 * Para que Next.js ejecute este archivo, debe estar configurado en next.config.js:
 * experimental: { instrumentationHook: true }
 */

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Solo en servidor
    const { iniciarCronJobs } = require('./lib/cronJobs')
    iniciarCronJobs()
  }
}
