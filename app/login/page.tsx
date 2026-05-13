'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useColony } from '@/context/ColonyContext'

export default function LoginPage(){
  const { db, login } = useColony() as any
  const router = useRouter()
  const [col, setCol] = useState(Object.keys(db.colonias)[0])
  const [role, setRole] = useState('admin')

  useEffect(()=>{
    setCol(Object.keys(db.colonias)[0])
  },[db])

  function doLogin(){
    login(col, role)
    router.push('/dashboard')
  }

  return (
    <div className="card">
      <h2>?? Ingresar a tu colonia</h2>
      <div className="mt-3">
        <label className="text-sm">Colonia</label>
        <select className="border rounded px-3 py-2 w-full" value={col} onChange={e=>setCol(e.target.value)}>
          {Object.entries(db.colonias).map(([k,v]: any)=> <option key={k} value={k}>{v.nombre} ({v.viviendas} viv.)</option>)}
        </select>
      </div>
      <div className="mt-3">
        <label className="text-sm">Rol</label>
        <select className="border rounded px-3 py-2 w-full" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="admin">Administrador/a</option>
          <option value="vecino">Vecino/a</option>
          <option value="moderador">Moderador/a</option>
        </select>
      </div>
      <div className="mt-4">
        <button className="btn btn-primary" onClick={doLogin}>Ingresar</button>
      </div>
    </div>
  )
}
