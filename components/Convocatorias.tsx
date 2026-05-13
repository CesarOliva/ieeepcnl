import React from 'react'
import { useColony } from '@/context/ColonyContext'

export default function Convocatorias(){
  const { db, setDb }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const colonia = db.colonias[coloniaKey]

  if (!colonia) return <div>No hay colonias registradas.</div>

  function toggleEstado(idx:number){
    setDb((prev:any)=>{
      const next = JSON.parse(JSON.stringify(prev))
      const c = next.colonias[coloniaKey]
      const conv = c.convocatorias[idx]
      conv.estado = conv.estado === 'Próxima' ? 'Finalizada' : 'Próxima'
      return next
    })
  }

  return (
    <section>
  <h2 className='text-xl font-semibold text-neutral-800'>📅 Convocatorias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {colonia.convocatorias.map((conv:any, i:number)=> (
          <div key={conv.id} className="card">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-semibold">{conv.tema}</h3>
                <div className="text-sm text-neutral-600">{conv.fecha} · {conv.horario} · {conv.modalidad}</div>
              </div>
              <div className="text-right">
                <div className="px-2 py-1 rounded text-sm" style={{background: conv.estado === 'Finalizada' ? '#ecfdf5' : '#fff7ed', color: conv.estado === 'Finalizada' ? '#065f46' : '#92400e'}}>{conv.estado}</div>
              </div>
            </div>
            <p className="mt-2 text-sm">{conv.tipo} · Método: {conv.metodoVotacion}</p>
            <div className="mt-3 flex gap-2">
              <button className="btn btn-dorado btn-sm" onClick={()=>toggleEstado(i)}>{conv.estado === 'Próxima' ? 'Marcar Finalizada' : 'Reabrir'}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


