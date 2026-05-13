import React from 'react'
import { useColony } from '@/context/ColonyContext'

export default function Bitacoras(){
  const { db }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const d = db.colonias[coloniaKey]

  return (
    <div>
  <h2 className='text-xl font-semibold text-neutral-800'>🔍 Bitácora de Auditoría</h2>
      <div className="card mt-3">
        {d.bitacora && d.bitacora.length>0? (
          <div>
            <table className="min-w-full text-sm">
              <tbody>
                {d.bitacora.map((b:any,i:number)=> <tr key={i} className="border-t"><td className="px-3 py-2">{b.evento}</td><td className="px-3 py-2">{b.ts}</td><td className="px-3 py-2 font-mono">{b.hash}</td></tr>)}
              </tbody>
            </table>
          </div>
        ): <p className="text-gray-500">No hay eventos registrados.</p>}
      </div>
    </div>
  )
}


