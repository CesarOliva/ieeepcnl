import React from 'react'
import { useColony } from '@/context/ColonyContext'

export default function Resultados(){
  const { db }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const d = db.colonias[coloniaKey]

  if (!d) return null

  return (
    <div>
      <h2 className='text-xl font-semibold text-neutral-800'>📄 Resultados</h2>
      <div className="card mt-3">
        {d.resultadosEleccion? (
          <div>
            <h3 className="font-semibold">Elección de Mesa Directiva</h3>
            <div className="mt-2">
              <table className="min-w-full text-sm border">
                <tbody>
                  {d.resultadosEleccion.planillas.map((p:any)=> (
                    <tr key={p.n} className={p.g? 'bg-yellow-50 font-semibold':''}><td className="px-3 py-2 border">{p.n}</td><td className="px-3 py-2 border">{p.v} votos ({p.p}%)</td></tr>
                  ))}
                  <tr><td className="px-3 py-2 border">Votos nulos</td><td className="px-3 py-2 border">{d.resultadosEleccion.votosNulos}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ): <p className="text-gray-500">Aún no hay resultados electorales.</p>}

        {d.resultadosPriorizacion && d.resultadosPriorizacion.length>0? (
          <div className="mt-4">
            <h3 className="font-semibold">Priorización de Problemas</h3>
            <table className="min-w-full text-sm mt-2 border">
              <tbody>
                {d.resultadosPriorizacion.map((p:any)=> <tr key={p.op}><td className="px-3 py-2 border">{p.op}</td><td className="px-3 py-2 border">{p.pt} pts</td></tr>)}
              </tbody>
            </table>
          </div>
        ): null}
      </div>
    </div>
  )
}


