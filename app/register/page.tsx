'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useColony } from '@/context/ColonyContext'
import { toast } from 'sonner'

export default function RegisterPage(){
  const { db, setDb } = useColony() as any
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [cp, setCp] = useState('')
  const [correo, setCorreo] = useState('')

  function registrar(){
    if (!nombre || !cp || !correo) { toast.error('Complete los campos'); return }
    const key = nombre.toLowerCase().replace(/\s+/g,'-')
    setDb((prev:any)=>{
      const next = JSON.parse(JSON.stringify(prev))
      next.colonias[key] = { nombre, cp, municipio: 'Monterrey', viviendas: 100, padronCerrado: false, fechaCierre: null, admins: [{ id:'a'+Date.now(), nombre: 'Administrador', correo, inicio: new Date().toISOString().split('T')[0], activo:true }], convocatorias:[], planillas:[], problemas:[], resultadosEleccion:null, resultadosPriorizacion:[], seguimiento:[], bitacora:[], comentarios:[] }
      return next
    })
    toast.success('Colonia registrada (simulado).')
    router.push('/')
  }

  return (
    <div className="card">
      <h2>Registrar nueva colonia</h2>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        <input placeholder="Nombre de la colonia" className="border rounded px-3 py-2" value={nombre} onChange={e=>setNombre(e.target.value)} />
        <input placeholder="Codigo Postal" className="border rounded px-3 py-2" value={cp} onChange={e=>setCp(e.target.value)} />
        <input placeholder="Correo del administrador" className="border rounded px-3 py-2" value={correo} onChange={e=>setCorreo(e.target.value)} />
      </div>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={registrar}>Registrar colonia</button>
      </div>
    </div>
  )
}
