import React from 'react'
import { useColony } from '@/context/ColonyContext'
import ComentarioCard from './ComentarioCard'

export default function Deliberacion({ onNavigate }:{ onNavigate?: (v:string)=>void }){
  const { db }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const colonia = db.colonias[coloniaKey]

  return (
    <section>
      <h2 className='text-xl font-semibold text-neutral-800'>💬 Información y Deliberación</h2>
      <div className="grid grid-cols-1 gap-4 mt-3">
        <div>
          <h3 className="font-semibold">Planillas</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
            {colonia.planillas && colonia.planillas.length>0 ? colonia.planillas.map((p:any)=> (
              <div key={p.nombre} className="card">
                <h4 className="font-semibold">{p.nombre}</h4>
                <p className="text-sm text-neutral-600">{p.integrantes}</p>
                <p className="text-sm text-neutral-600 mt-1">{p.propuesta}</p>
              </div>
            )) : <p className="text-sm text-neutral-500">No hay planillas registradas.</p>}
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Problemas a priorizar</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
            {colonia.problemas && colonia.problemas.length>0 ? colonia.problemas.map((pr:any)=> (
              <div key={pr.nombre} className="card">
                <strong>{pr.nombre}</strong>
                <p className="text-sm text-neutral-600">{pr.evidencia}</p>
              </div>
            )) : <p className="text-sm text-neutral-500">No hay problemas reportados.</p>}
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Comentarios de vecinos</h3>
          <div className="mt-2 space-y-2">
            {colonia.comentarios && colonia.comentarios.length>0 ? colonia.comentarios.map((c:any)=> <ComentarioCard key={c.folio} c={c} />) : <p className="text-sm text-neutral-500">Sin comentarios aún.</p>}
          </div>
        </div>

      </div>

      <div className="pt-6">
        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#ffc000] text-black font-semibold text-sm hover:bg-[#ffc000]/80 transition-colors" onClick={()=>onNavigate?.('votacion')}>🗳️ Ir a Votar</button>
      </div>
    </section>
  )
}


