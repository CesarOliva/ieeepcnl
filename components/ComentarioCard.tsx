import React from 'react'

export default function ComentarioCard({ c }: any){
  return (
    <div className="bg-neutral-50 p-3 rounded-lg shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-neutral-700">{c.texto}</div>
          <div className="text-xs text-neutral-500 mt-2">{c.folio} · {c.fecha}</div>
        </div>
      </div>
    </div>
  )
}


