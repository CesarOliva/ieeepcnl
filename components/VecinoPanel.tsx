import React from 'react'
import { useColony } from '@/context/ColonyContext'
import { Clock } from 'lucide-react'

export default function VecinoPanel({ onNavigate }: { onNavigate:(v:string)=>void }){
  const { db }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const d = db.colonias[coloniaKey]

  const prox = d.convocatorias.find((c:any)=>c.estado==='Próxima')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <article className="bg-white rounded-[20px] p-0 shadow-glass overflow-hidden border border-neutral-200/60">
        <div className="p-6">
          <div className="flex flex-col mb-4">
            <h3 className="text-xl font-bold text-neutral-900 mt-1 leading-tight">{d.nombre}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">{d.viviendas} viviendas registradas</p>

            <div className="mt-2 text-sm text-neutral-700 bg-yellow-100 leading-relaxed p-3">
              Próxima Convocatoria: <strong>{prox?.tema || 'Ninguna convocatoria próxima'}</strong> · {prox?.fecha || ''}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-2 border-t border-neutral-100">
            <div className="w-full sm:w-auto flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffc000] text-neutral-800 font-semibold text-sm hover:bg-[#ffc000]/80 transition-colors cursor-pointer" onClick={()=>onNavigate('convocatorias')}>
                <span>Ver convocatorias</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      <aside className="w-full shrink-0 space-y-6">
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <h3 className="text-xl font-semibold text-neutral-800 mb-4">Seguimiento de propuestas</h3>

          <div className="space-y-2">
            {d.seguimiento && d.seguimiento.length>0 ? d.seguimiento.map((s:any,i:number)=> (
              <div key={i} className="flex items-center gap-3">
                <Clock className="size-4 text-[#ffc000]"/>
                <p className="text-sm text-neutral-700">{s.acuerdo}</p>
              </div>
            )) : <p className="text-sm text-neutral-700">Sin acuerdos pendientes.</p>}
          </div>
        </div>
      </aside>
    </div>
  )
}


