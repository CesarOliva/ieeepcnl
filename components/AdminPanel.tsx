import React from 'react'
import { useColony } from '@/context/ColonyContext'
import { Clock } from 'lucide-react'

export default function AdminPanel({ onNavigate }:{ onNavigate?: (v:string)=>void }){
  const { db, session }: any = useColony()
  const colonyKey = session?.colonyKey || Object.keys(db.colonias)[0]
  const d = db.colonias[colonyKey]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-neutral-800">⚙️ Panel de Administración</h2>
        <p className="mt-2 text-sm text-gray-700"><strong>{d.nombre}</strong> · {d.viviendas} viviendas</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-4">
          <div className="text-center p-4 bg-gray-50 rounded border"><div className="text-2xl font-bold" style={{color:'#ffc000'}}>{d.viviendas}</div><div className="text-sm text-gray-600">Viviendas</div></div>
          <div className="text-center p-4 bg-gray-50 rounded border"><div className="text-2xl font-bold" style={{color:'#ffc000'}}>{d.convocatorias?.length||0}</div><div className="text-sm text-gray-600">Convocatorias</div></div>
          <div className="text-center p-4 bg-gray-50 rounded border"><div className="text-2xl font-bold" style={{color:'#ffc000'}}>{d.admins?.filter((a:any)=>a.activo).length||0}</div><div className="text-sm text-gray-600">Admins activos</div></div>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center px-4 py-2 rounded-md font-semibold text-sm bg-[#ffc000] hover:bg-[#ffc000]/80 text-black" onClick={()=>onNavigate?.('crear')}>➕ Nueva Convocatoria</button>
          <button className="inline-flex items-center px-4 py-2 rounded-md border-2" style={{borderColor:'#e0a800', color:'#b88600', marginLeft:'0.5rem'}} onClick={()=>onNavigate?.('padron')}>📋 Padrón</button>
          <button className="inline-flex items-center px-4 py-2 rounded-md border-2" style={{borderColor:'#e0a800', color:'#b88600', marginLeft:'0.5rem'}} onClick={()=>onNavigate?.('resultados')}>📄 Resultados</button>
        </div>
      </div>
      <aside className="w-full shrink-0 space-y-6">
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <h3 className="text-xl font-semibold text-neutral-800 mb-4">Seguimiento de acuerdos</h3>
          <div className="space-y-2">
            {d.seguimiento && d.seguimiento.length>0 ? d.seguimiento.map((s:any,i:number)=> (
              <div key={i} className="flex items-center gap-3">
                <Clock className="size-6 text-[#ffc000]"/>
                <p className="text-sm text-neutral-700">{s.acuerdo}</p>
              </div>
            )) : <p className="text-sm text-neutral-700">Sin acuerdos pendientes.</p>}
          </div>
        </div>
      </aside>
    </div>
  )
}


