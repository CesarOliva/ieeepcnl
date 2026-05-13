'use client'

import React, { useState } from 'react'
import { useColony } from '@/context/ColonyContext'
import { toast } from 'sonner'

export default function CrearConvocatoria(){
  const { db, setDb }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const [tema, setTema] = useState('Elección de Mesa Directiva')
  const [fecha, setFecha] = useState('2026-09-15')

  function publicar(){
    if (!tema || !fecha) { toast.error('Complete tema y fecha.'); return }
    setDb((prev:any)=>{
      const next = JSON.parse(JSON.stringify(prev))
      next.colonias[coloniaKey].convocatorias.push({ id: 'CONV-' + Date.now(), tema, fecha, horario: '9:00 - 14:00', lugar: 'Palapa', modalidad: 'Presencial', estado: 'Próxima', metodoVotacion: 'Mayoría simple' })
      return next
    })
    toast.success('✅ Convocatoria publicada.');
  }

  return (
    <div>
  <h2 className='text-xl font-semibold text-neutral-800'>➕ Nueva Convocatoria</h2>
      <div className="card mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="text-sm">Tema</label><input value={tema} onChange={e=>setTema(e.target.value)} className="border rounded px-3 py-2 w-full" /></div>
          <div><label className="text-sm">Fecha</label><input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} className="border rounded px-3 py-2 w-full" /></div>
        </div>
        <div className="mt-3"><button className="btn btn-dorado" onClick={publicar}>📢 Publicar Convocatoria</button></div>
      </div>
    </div>
  )
}



