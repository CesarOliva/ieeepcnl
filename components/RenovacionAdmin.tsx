'use client'

import React, { useState } from 'react'
import { useColony } from '@/context/ColonyContext'
import { toast } from 'sonner'
import { InputModal } from './InputModal'

export default function RenovacionAdmin(){
  const { db, setDb }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const d = db.colonias[coloniaKey]
  const adminActivo = d.admins.find((a:any)=>a.activo)
  const [mensaje, setMensaje] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalStep, setModalStep] = useState<'nombre' | 'correo'>('nombre')
  const [tempNombre, setTempNombre] = useState('')

  if (!adminActivo) return <div className="card"><p>No hay administrador activo.</p></div>

  function mantener(){
    setDb((prev:any)=>{
      const next = JSON.parse(JSON.stringify(prev))
      const a = next.colonias[coloniaKey].admins.find((x:any)=>x.id===adminActivo.id)
      a.inicio = new Date().toISOString().split('T')[0]
      return next
    })
    setMensaje('✅ Administrador renovado por 6 meses.')
  }

  function cambiar(){
    // kept for backward compatibility; prefer using guardarNuevo from form
    setModalStep('nombre')
    setShowModal(true)
  }

  function handleModalConfirm(value: string) {
    if (modalStep === 'nombre') {
      setTempNombre(value)
      setModalStep('correo')
    } else {
      const nombre = tempNombre
      const correo = value
      setDb((prev:any)=>{
        const next = JSON.parse(JSON.stringify(prev))
        const a = next.colonias[coloniaKey].admins.find((x:any)=>x.id===adminActivo.id)
        a.activo = false
        next.colonias[coloniaKey].admins.push({ id:'a'+Date.now(), nombre, correo, inicio: new Date().toISOString().split('T')[0], activo: true })
        return next
      })
      setMensaje(`✅ Nuevo administrador "${nombre}" asignado.`)
      setShowModal(false)
      setTempNombre('')
    }
  }

  // Inline form state for postular nuevo admin
  const [isPosting, setIsPosting] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')

  function guardarNuevo(){
    if (!newName.trim() || !newEmail.trim()) { toast.error('Complete nombre y correo.'); return }
    setDb((prev:any)=>{
      const next = JSON.parse(JSON.stringify(prev))
      const a = next.colonias[coloniaKey].admins.find((x:any)=>x.id===adminActivo.id)
      if (a) a.activo = false
      next.colonias[coloniaKey].admins.push({ id:'a'+Date.now(), nombre: newName.trim(), correo: newEmail.trim(), inicio: new Date().toISOString().split('T')[0], activo: true })
      return next
    })
    setMensaje(`✅ Nuevo administrador "${newName}" asignado.`)
    setIsPosting(false)
    setNewName('')
    setNewEmail('')
  }

  return (
    <div>
  <h2 className='text-xl font-semibold text-neutral-800'>🔄 Renovación del Administrador</h2>
      <div className="card mt-3">
        <p><strong>Administrador actual:</strong> {adminActivo.nombre}</p>

        <div className="mt-3">
          <p className="text-sm"><strong>Inicio del periodo:</strong> {adminActivo.inicio}</p>
          {(() => {
            const fin = new Date(adminActivo.inicio)
            fin.setMonth(fin.getMonth() + 6)
            const hoy = new Date()
            const dias = Math.ceil((fin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
            return (
              <p className="text-sm mt-2"><strong>Vencimiento:</strong> {fin.toISOString().split('T')[0]} <span className={`ml-2 text-sm ${dias>0? 'text-neutral-600':'text-red-600'}`}>({dias>0? `en ${dias} días` : 'VENCIDO'})</span></p>
            )
          })()}

          <div className="mt-3">
            {(() => {
              const fin = new Date(adminActivo.inicio)
              fin.setMonth(fin.getMonth() + 6)
              const hoy = new Date()
              const dias = Math.ceil((fin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
              return (
                <div className={`p-3 rounded-md ${dias<=45? 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800':'bg-neutral-50 border-l-4 border-neutral-200 text-neutral-700'}`}>
                  {dias<=45? '⚠️ El periodo está próximo a vencer.' : '✅ El periodo aún está vigente.'}
                </div>
              )
            })()}
          </div>
        </div>

        <h3 className="mt-4 text-sm font-semibold">Consulta vecinal: ¿Desea mantener al administrador actual?</h3>
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center px-4 py-2 rounded-md bg-[#ffc000] hover:bg-[#ffc000]/80 text-black font-semibold text-sm" onClick={mantener}>Mantener a {adminActivo.nombre}</button>
            {!isPosting && <button className="inline-flex items-center px-4 py-2 rounded-md bg-[#ffc000] hover:bg-[#ffc000]/80 text-black font-semibold text-sm" onClick={cambiar}>Cambiar administrador</button>}
            {!isPosting && <button className="inline-flex items-center px-4 py-2 rounded-md bg-[#ffc000] hover:bg-[#ffc000]/80 text-black font-semibold text-sm" onClick={()=>setIsPosting(true)}>Postular nuevo administrador</button>}
          </div>

          {isPosting && (
            <div className="mt-3 space-y-2">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <input className="w-full border rounded px-3 py-2" value={newName} onChange={e=>setNewName(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Correo</label>
                <input className="w-full border rounded px-3 py-2" value={newEmail} onChange={e=>setNewEmail(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <button className="btn btn-dorado" onClick={guardarNuevo}>Guardar</button>
                <button className="btn btn-secondary" onClick={()=>setIsPosting(false)}>Cancelar</button>
              </div>
            </div>
          )}
        </div>
        <div id="resultadoRenovacion" className="mt-4">{mensaje && <div className="text-green-700">{mensaje}</div>}</div>

        <InputModal 
          isOpen={showModal}
          title={modalStep === 'nombre' ? 'Nombre del nuevo administrador' : 'Correo del nuevo administrador'}
          placeholder={modalStep === 'nombre' ? 'Ingrese el nombre' : 'Ingrese el correo'}
          onConfirm={handleModalConfirm}
          onCancel={() => {
            setShowModal(false)
            setTempNombre('')
            setModalStep('nombre')
          }}
        />
      </div>
    </div>
  )
}



