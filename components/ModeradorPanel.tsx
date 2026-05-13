import React from 'react'
import { useColony } from '@/context/ColonyContext'
import ComentarioCard from './ComentarioCard'

// Moderador puede ver y agregar comentarios (similar a VecinoPanel)

export default function ModeradorPanel({ onNavigate }: { onNavigate?: (v:string)=>void }){
  const { db, session, setDb } : any = useColony()
  const colonyKey = session?.colonyKey || Object.keys(db.colonias)[0]
  const d = db.colonias[colonyKey]
  const [comentario, setComentario] = React.useState('')

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
      <div className="bg-white rounded-2xl p-5 shadow-soft">
        <h3 className="text-xl font-semibold text-neutral-800 mb-4">Comentarios de vecinos</h3>
        <div className="mb-4 space-y-3">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escribe un comentario..."
            className="w-full min-h-[96px] rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-800 outline-none focus:border-[#ffc000] focus:ring-2 focus:ring-[#ffc000]/20"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                const texto = comentario.trim()
                if (!texto) return
                setDb((prev:any) => {
                  const next = JSON.parse(JSON.stringify(prev))
                  const col = next.colonias[colonyKey]
                  col.comentarios = col.comentarios || []
                  col.comentarios.unshift({ folio: `FOL-${Date.now()}`, texto, fecha: new Date().toISOString().slice(0,10), estado: 'Publicado', autor: session?.usuario || session?.profile?.nombre || 'Moderador' })
                  return next
                })
                setComentario('')
              }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#ffc000] text-black font-semibold text-sm hover:bg-[#ffc000]/80 transition-colors"
            >
              Agregar comentario
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {d.comentarios && d.comentarios.length > 0 ? d.comentarios.map((c:any)=> <ComentarioCard key={c.folio} c={c} />) : <p className="text-sm text-neutral-500">Sin comentarios aún.</p>}
        </div>
      </div>
    </div>
  )
}


