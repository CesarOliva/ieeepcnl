import React from 'react'

export default function PrivacyPage(){
  return (
    <div className="card">
      <h2>Política de Privacidad</h2>
      <p className="mt-3">En esta plataforma respetamos tu privacidad. Los datos que solicitamos se recaban únicamente para validar que el usuario pertenece a la comunidad de la colonia y permitir el acceso a las herramientas vecinales.</p>

      <h3 className="mt-4 font-semibold">Qué datos recogemos</h3>
      <ul className="list-disc list-inside mt-2 text-sm">
        <li>Identificador de usuario (nombre de usuario).</li>
        <li>Información de perfil necesaria para identificar pertenencia a la colonia (por ejemplo CURP o dirección) cuando se solicite en el flujo de registro.</li>
      </ul>

      <h3 className="mt-4 font-semibold">Para qué usamos los datos</h3>
      <p className="mt-2 text-sm">Los datos se usan exclusivamente para verificar que la persona que accede forma parte de la comunidad y para enlazar sus acciones (votos, comentarios, reportes) con la colonia correspondiente.</p>

      <h3 className="mt-4 font-semibold">Retención y seguridad</h3>
      <p className="mt-2 text-sm">La información se almacena localmente en el dispositivo (simulación) y, en caso de integraciones externas, será tratada con medidas razonables de seguridad. No compartimos datos con terceros salvo requerimiento legal.</p>

      <h3 className="mt-4 font-semibold">Contacto</h3>
      <p className="mt-2 text-sm">Si tienes dudas sobre esta política escribe a <strong>soporte@tucolonia.local</strong>.</p>

      <p className="mt-4 text-xs text-neutral-500">Última actualización: {new Date().toLocaleDateString('es-MX')}</p>
    </div>
  )
}
