'use client'

import React, { useState } from 'react'
import { useColony } from '@/context/ColonyContext'
import { toast } from 'sonner'

export default function GestionAdmins(){
  const { db, setDb }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const d = db.colonias[coloniaKey]
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')

  function nuevo(){
    if (!nombre || !correo) { toast.error('Complete los campos'); return }
    setDb((prev:any)=>{
      const next = JSON.parse(JSON.stringify(prev))
      next.colonias[coloniaKey].admins.push({ id: 'a'+Date.now(), nombre, correo, inicio: new Date().toISOString().split('T')[0], activo: true })
      return next
    })
    setNombre(''); setCorreo('');
  }

  return (
    <div>
  <h2 className='text-xl font-semibold text-neutral-800'>👥 Administradores</h2>
      <div className="card mt-3">
        <div className="mb-3">
          <input placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} className="border rounded px-3 py-2 mr-2" />
          <input placeholder="Correo" value={correo} onChange={e=>setCorreo(e.target.value)} className="border rounded px-3 py-2 mr-2" />
          <button className="btn btn-dorado" onClick={nuevo}>Nuevo</button>
        </div>
        <div>
          <table className="min-w-full text-sm border">
            <thead className="bg-yellow-50"><tr><th className="px-3 py-2">ID</th><th className="px-3 py-2 border">Nombre</th><th className="px-3 py-2">Correo</th><th className="px-3 py-2 border">Inicio</th><th className="px-3 py-2 border">Activo</th></tr></thead>
            <tbody>
              {d.admins.map((a:any)=> <tr key={a.id} className="border"><td className="px-3 py-2 border">{a.id}</td><td className="px-3 py-2 border">{a.nombre}</td><td className="px-3 py-2 border">{a.correo}</td><td className="px-3 py-2 border">{a.inicio}</td><td className="px-3 py-2 border">{a.activo? 'Sí':'No'}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



