import React from 'react'
import { useColony } from '@/context/ColonyContext'

export default function Seguimiento(){
  const { db, setDb }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const d = db.colonias[coloniaKey]

  function marcarCompletado(i:number){
    setDb((prev:any)=>{
      const next = JSON.parse(JSON.stringify(prev))
      next.colonias[coloniaKey].seguimiento[i].estatus = 'Completado'
      return next
    })
  }

  return (
    <div>
  <h2 className='text-xl font-semibold text-neutral-800'>📌 Seguimiento de Acuerdos</h2>
      <div className="card mt-3">
        {d.seguimiento && d.seguimiento.length>0? (
          <div>
            <table className="min-w-full text-sm">
              <tbody>
                {d.seguimiento.map((s:any,i:number)=> (
                  <tr key={i} className="border-t"><td className="px-3 py-2">{i+1}</td><td className="px-3 py-2">{s.acuerdo}</td><td className="px-3 py-2">{s.responsable}</td><td className="px-3 py-2">{s.fecha}</td><td className="px-3 py-2">{s.estatus}</td><td className="px-3 py-2">{s.estatus!=='Completado' && <button className="btn btn-dorado btn-sm" onClick={()=>marcarCompletado(i)}>Marcar completado</button>}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ): <p className="text-gray-500">No hay acuerdos registrados.</p>}
      </div>
    </div>
  )
}


