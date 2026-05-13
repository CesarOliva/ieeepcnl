import React from 'react'
import { useColony } from '@/context/ColonyContext'

export default function ModeradorPanel({ onNavigate }: { onNavigate?: (v:string)=>void }){
  const { db, session } : any = useColony()
  const colonyKey = session?.colonyKey || Object.keys(db.colonias)[0]
  const d = db.colonias[colonyKey]

  const adminsTotal = d.admins?.length || 0
  const adminsActive = d.admins?.filter((a:any)=>a.activo).length || 0

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">🔧 Panel de Moderación</h2>
        <p className="mt-1 text-sm text-neutral-700">Gestiona administradores de <strong className="text-neutral-900">{d.nombre}</strong></p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-4">
          <div className="text-center p-4 bg-gray-50 rounded border">
            <div className="text-2xl font-bold" style={{color:'#ffc000'}}>{adminsTotal}</div>
            <div className="text-sm text-gray-600">Administradores</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded border">
            <div className="text-2xl font-bold" style={{color:'#ffc000'}}>{adminsActive}</div>
            <div className="text-sm text-gray-600">Activos</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="inline-flex items-center px-4 py-2 rounded-md font-semibold text-sm bg-[#ffc000] text-black shadow-sm hover:bg-[#ffc000]/80" onClick={()=>onNavigate?.('gestionAdmins')}>Gestionar Administradores</button>
          <button className="inline-flex items-center px-4 py-2 rounded-md font-semibold text-sm bg-[#ffc000] text-black hover:bg-[#ffc000]/80 ml-2" onClick={()=>onNavigate?.('renovacion')}>Renovación de Periodo</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-900">📊 Estado de la colonia</h3>
        <p className="mt-2 text-sm text-gray-700">Viviendas: <strong>{d.viviendas}</strong> · Convocatorias: <strong>{d.convocatorias?.length||0}</strong></p>
      </div>
    </div>
  )
}


