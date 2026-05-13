export const initialDB = {
  colonias: {
    'las-lomas-del-sur': {
      nombre: 'Las Lomas del Sur',
      cp: '64000',
      municipio: 'Monterrey',
      viviendas: 220,
      padronCerrado: true,
      fechaCierre: '2026-08-10',
      admins: [{ id: 'a1', nombre: 'Carlos Méndez', correo: 'admin@lomas.com', inicio: '2026-03-01', activo: true }],
      convocatorias: [
        { id: 'CONV-001', tema: 'Elección de Mesa Directiva y Priorización de Problemas', tipo: 'Elección + Priorización', fecha: '2026-08-16', horario: '9:00 - 14:00', lugar: 'Palapa del parque central', modalidad: 'Presencial', estado: 'Finalizada', metodoVotacion: 'Mayoría simple (planilla)', metodoPriorizacion: 'Puntaje ponderado (2pts / 1pt)' },
        { id: 'CONV-002', tema: 'Aprobación de cuota extraordinaria para portones', tipo: 'Aprobación de cuota', fecha: '2026-09-30', horario: '18:00 - 20:00', lugar: 'Virtual (Zoom)', modalidad: 'Híbrida', estado: 'Próxima', metodoVotacion: 'Mayoría simple (Sí/No)' }
      ],
      planillas: [
        { nombre: 'Planilla A - Vecindad Activa', integrantes: 'Presidencia: Ana López, Secretaría: Luis Díaz, Tesorería: Marta Ruiz, Vocal Seguridad: Pedro Gómez, Vocal Mantenimiento: Rosa Gil', propuesta: 'Transparencia mensual de cuotas, reparación de juegos infantiles y reuniones bimestrales abiertas.', color: '#3498db' },
        { nombre: 'Planilla B - Orden y Seguridad', integrantes: 'Presidencia: Carlos Méndez, Secretaría: Juana Torres, Tesorería: Felipe Ríos, Vocal Seguridad: Andrés Vega, Vocal Mantenimiento: Lourdes Pardo', propuesta: 'Gestión de rondines con Seguridad Pública, control de accesos vehiculares y canal único de reportes vecinales.', color: '#e67e22' },
        { nombre: 'Planilla C - Comunidad Verde', integrantes: 'Presidencia: Gloria Estrada, Secretaría: Omar Fuentes, Tesorería: Diana Rosas, Vocal Seguridad: Tomás Leyva, Vocal Mantenimiento: Cecilia Bravo', propuesta: 'Mejora del parque central, reforestación con especies nativas, mantenimiento preventivo y convivencia familiar.', color: '#2ecc71' }
      ],
      problemas: [
        { nombre: 'Seguridad pública (rondines)', evidencia: '3 reportes vecinales, 2 denuncias, mapa de incidentes y horarios recurrentes.', gestion: 'Oficio a Secretaría de Seguridad municipal con mapa de puntos.' },
        { nombre: 'Obra de Agua y Drenaje', evidencia: 'Fotografías, ubicación, testimonio de vecino accidentado y registro de lluvias.', gestion: 'Reporte formal con folio, oficio, evidencia y solicitud de limpieza.' },
        { nombre: 'Parque central y canchas', evidencia: 'Fotografías, cotizaciones preliminares y reporte de uso por niñas, niños y jóvenes.', gestion: 'Plan interno de mantenimiento y solicitud de apoyo municipal.' }
      ],
      resultadosEleccion: { votosEmitidos: 156, votosNulos: 3, planillas: [{ n: 'Planilla A - Vecindad Activa', v: 52, p: 33.3 }, { n: 'Planilla B - Orden y Seguridad', v: 81, p: 51.9, g: true }, { n: 'Planilla C - Comunidad Verde', v: 20, p: 12.8 }] },
      resultadosPriorizacion: [ { op: 'Seguridad pública (rondines)', pt: 167 }, { op: 'Obra de Agua y Drenaje', pt: 155 }, { op: 'Parque central y canchas', pt: 127 } ],
      seguimiento: [ { acuerdo: 'Entregar oficio y mapa a Seguridad Pública municipal', responsable: 'Vocalía de Seguridad', fecha: '2026-08-21', evidencia: 'Acuse, folio, calendario de rondines', estatus: 'En proceso' }, { acuerdo: 'Registrar reporte formal de obra de Agua y Drenaje', responsable: 'Presidencia', fecha: '2026-08-23', evidencia: 'Folio, fotos antes/después', estatus: 'Pendiente' }, { acuerdo: 'Actualizar cotizaciones para el parque', responsable: 'Vocalía de Mantenimiento', fecha: '2026-09-05', evidencia: 'Cotizaciones y propuesta técnica', estatus: 'Pendiente' } ],
      bitacora: [ { evento: 'Urna abierta', ts: '2026-08-16 09:00:00', hash: 'a1b2c3d4e5f6' }, { evento: 'Voto emitido (FOL-***)', ts: '2026-08-16 09:15:23', hash: 'f6e5d4c3b2a1' }, { evento: 'Voto emitido (FOL-***)', ts: '2026-08-16 10:30:11', hash: '1a2b3c4d5e6f' }, { evento: 'Urna cerrada', ts: '2026-08-16 14:00:00', hash: '7890abcdef12' }, { evento: 'Acta generada', ts: '2026-08-16 14:05:00', hash: '34567890abcd' } ],
      comentarios: [ { folio: 'FOL-045', texto: 'Considero que la Planilla B tiene mejor propuesta de seguridad.', fecha: '2026-08-10', estado: 'Aprobado' }, { folio: 'FOL-102', texto: '¿Alguien tiene más información sobre costos de la Planilla C?', fecha: '2026-08-11', estado: 'Aprobado' }, { folio: 'FOL-187', texto: 'El problema de agua y drenaje es urgente, hay fotos del encharcamiento.', fecha: '2026-08-12', estado: 'Pendiente' } ]
    }
  }
}

export default initialDB
