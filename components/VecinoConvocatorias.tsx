import React from 'react'
import { useColony } from '@/context/ColonyContext'

export default function VecinoConvocatorias({ onNavigate }:{ onNavigate:(v:string)=>void }){
  const { db }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const d = db.colonias[coloniaKey]

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-800">📢 Convocatorias de {d.nombre}</h2>
      <div className="space-y-3 mt-3">
        {d.convocatorias.length>0 ? d.convocatorias.map((c:any)=> (
          <article key={c.id} className="bg-white rounded-[16px] p-4 shadow-soft border border-neutral-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-md font-semibold">{c.tema}</h3>
                <p className="text-sm text-neutral-500">📅 {c.fecha} · {c.horario} · 📍 {c.lugar}</p>
              </div>
              <span className={`ml-4 inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${c.estado==='Finalizada'?'bg-green-50 text-green-800':'bg-blue-100 text-blue-800'}`}>{c.estado}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="inline-flex items-center px-3 py-2 rounded-full bg-[#ffc000] text-neutral-800 text-sm font-semibold hover:bg-[#ffc000]/80" onClick={()=>onNavigate('deliberacion')}>Informarme y deliberar</button>
              {c.estado === 'Finalizada' && <button className="inline-flex items-center px-3 py-2 rounded-full border border-neutral-200 text-sm font-medium" onClick={()=>onNavigate('resultados')}>Resultados</button>}
            </div>
          </article>
        )) : <p className="text-sm text-neutral-500">No hay convocatorias activas.</p>}
      </div>
    </div>
  )
}


