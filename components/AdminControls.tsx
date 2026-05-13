'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useColony } from '@/context/ColonyContext'
import CrearConvocatoria from './CrearConvocatoria'
import GestionAdmins from './GestionAdmins'
import RenovacionAdmin from './RenovacionAdmin'
import Padron from './Padron'
import Resultados from './Resultados'
import Convocatorias from './Convocatorias'
import Seguimiento from './Seguimiento'
import Actas from './Actas'
import Bitacoras from './Bitacoras'
import VecinoPanel from './VecinoPanel'
import VecinoConvocatorias from './VecinoConvocatorias'
import Deliberacion from './Deliberacion'
import Votacion from './Votacion'
import ModeradorPanel from './ModeradorPanel'
import AdminPanel from './AdminPanel'

export default function AdminControls(){
  const { db, session, logout, isHydrated } = useColony()
  const router = useRouter()
  const [view, setView] = useState('dashboard')

  // Resolve colony name safely
  const colonyKey = session?.colonyKey || Object.keys(db.colonias)[0]
  const colony = db?.colonias?.[colonyKey]
  const colonyName = colony?.nombre || 'Colonia'

  // Map role to visible buttons (based on original scripts prior to migration)
  const buttons = useMemo(() => {
    const role = session?.role || null
    const base = [
      { key: 'dashboard', label: '📊 Panel' },
      { key: 'convocatorias', label: '📢 Convocatorias' }
    ]
    if (role === 'admin') {
      return [
        ...base,
      ]
    }
    if (role === 'moderador') {
      return [
        ...base,
      ]
    }
    // vecino / default
    return [
      ...base,
    ]
  }, [db, session])

  function handleLogout(){
    logout()
    router.push('/')
  }

  // role display text (match original labels)
  const roleLabel = useMemo(()=>{
    if (!isHydrated) return ''
    const r = session?.role
    return r === 'admin' ? 'Administrador/a' : r === 'moderador' ? 'Moderador/a' : r === 'vecino' ? 'Vecino/a' : ''
  }, [session, isHydrated])

  return (
    <div id="plataformaInterna" className="w-full">
      <div className="w-full py-5 bg-[#ffc000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-col md:flex-row gap-3">
          <div className="flex w-full md:w-auto items-center gap-3">
            <span id="nombreColoniaDisplay" className="font-bold text-neutral-900">{colonyName}</span>
            {roleLabel && <span id="rolDisplay" className="text-sm text-neutral-800 bg-white/80 px-2 py-1 rounded-md">{roleLabel}</span>}
          </div>

          <div className="flex w-full md:w-auto items-center gap-2">
            {buttons.map(b => (
              <button key={b.key} className="px-3 py-1 rounded-md bg-white text-neutral-900 text-sm font-semibold" onClick={()=>setView(b.key)}>{b.label}</button>
            ))}
            <button className="px-3 py-1 rounded-md bg-white/70 text-neutral-900 text-sm font-semibold" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      </div>

      <div style={{padding:'1.5rem 0'}} id="dynamicContent">
  {view==='dashboard' && session?.role === 'vecino' && <VecinoPanel onNavigate={setView} />}
  {view==='dashboard' && session?.role === 'moderador' && <ModeradorPanel onNavigate={setView} />}
  {view==='dashboard' && session?.role === 'admin' && <AdminPanel onNavigate={setView} />}
  {view==='dashboard' && !session?.role && <div className="card"><h3 className="font-semibold">Panel</h3><p>Usa los botones para navegar entre herramientas.</p></div>}
        {view==='convocatorias' && session?.role === 'vecino' && <VecinoConvocatorias onNavigate={setView} />}
        {view==='convocatorias' && session?.role !== 'vecino' && <Convocatorias />}
        {view==='crear' && <CrearConvocatoria />}
        {view==='padron' && <Padron />}
        {view==='resultados' && <Resultados />}
        {view==='seguimiento' && <Seguimiento />}
        {view==='gestionAdmins' && <GestionAdmins />}
        {view==='renovacion' && <RenovacionAdmin />}
        {view==='actas' && <Actas />}
        {view==='bitacoras' && <Bitacoras />}
        {view==='deliberacion' && <Deliberacion onNavigate={setView} />}
        {view==='votacion' && <Votacion />}
      </div>
    </div>
  )
}




