import React, { useState } from 'react'
import { useColony } from '@/context/ColonyContext'
import { Clock } from 'lucide-react'
import { toast } from 'sonner'
import ComentarioCard from './ComentarioCard'

export default function AdminPanel({ onNavigate }:{ onNavigate?: (v:string)=>void }){
  const { db, session }: any = useColony()
  const colonyKey = session?.colonyKey || Object.keys(db.colonias)[0]
  const d = db.colonias[colonyKey]
  const [sending, setSending] = useState(false)
  const [comentario, setComentario] = useState('')

  async function enviarNotificaciones() {
    setSending(true)
    try {
      const res = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ db }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(`${data.sent} notificación(es) enviada(s)`)
      } else {
        toast.error(data.error || 'Error al enviar notificaciones')
      }
    } catch (err) {
      toast.error('Error al conectar con el servidor')
    } finally {
      setSending(false)
    }
  }

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
            <div className="bg-white rounded-2xl p-5 shadow-soft col-span-1 lg:col-span-2">
        <h3 className="text-xl font-semibold text-neutral-800 mb-4">Comentarios de vecinos</h3>
        <div className="mb-4 space-y-3">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escribe un comentario en nombre de la administración..."
            className="w-full min-h-[96px] rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-800 outline-none focus:border-[#ffc000] focus:ring-2 focus:ring-[#ffc000]/20"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                const texto = comentario.trim()
                if (!texto) return
                // agregar comentario a la colonia
                try {
                  const colonyKey = session?.colonyKey || Object.keys(db.colonias)[0]
                  // mutate via localStorage-backed db in context
                  // use fetch to update through context not available here, so do direct mutation via window (colony context persists db automatically)
                  // Best-effort: dispatch custom event or rely on context setter if available
                  // Simple approach: call fetch to API not implemented; mutate local storage directly
                  const stored = localStorage.getItem('miColoniaParticipaDB_v2')
                  if (stored) {
                    const next = JSON.parse(stored)
                    next.colonias[colonyKey].comentarios = next.colonias[colonyKey].comentarios || []
                    next.colonias[colonyKey].comentarios.unshift({ folio: `FOL-${Date.now()}`, texto, fecha: new Date().toISOString().slice(0,10), estado: 'Publicado', autor: session?.usuario || session?.profile?.nombre || 'Admin' })
                    localStorage.setItem('miColoniaParticipaDB_v2', JSON.stringify(next))
                    // reload window to let context sync (lightweight)
                    window.dispatchEvent(new Event('storage'))
                  }
                } catch (e) {
                  console.error(e)
                }
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


