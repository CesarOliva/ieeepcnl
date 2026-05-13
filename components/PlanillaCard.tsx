import React from 'react'

export default function PlanillaCard({ planilla, onSelect, selected }: any){
  return (
    <div className={`card border ${selected? 'ring-2 ring-dashed ring-yellow-400': ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{planilla.nombre}</h4>
          <div className="text-sm text-neutral-600">{planilla.integrantes}</div>
        </div>
        <div>
          <button className="btn btn-dorado btn-sm" onClick={onSelect}>Votar</button>
        </div>
      </div>
      <p className="mt-2 text-sm">{planilla.propuesta}</p>
    </div>
  )
}


