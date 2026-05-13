'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import initialDB from '@/lib/db'

const DB_KEY = 'miColoniaParticipaDB_v2'
const SESSION_KEY = 'miColoniaParticipa_session'

export const ColonyContext = createContext<any>(null)

export function ColonyProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState(initialDB)
  const [session, setSession] = useState<any>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DB_KEY)
      if (stored) setDb(JSON.parse(stored))
      
      const sessionStored = localStorage.getItem(SESSION_KEY)
      if (sessionStored) setSession(JSON.parse(sessionStored))
    } catch (e) {}
    setIsHydrated(true)
  }, [])

  const login = (coloniaKeyOrSession: string | Record<string, any>, role?: string) => {
    const sess = typeof coloniaKeyOrSession === 'string'
      ? { coloniaKey: coloniaKeyOrSession, role, timestamp: Date.now() }
      : { ...coloniaKeyOrSession, timestamp: Date.now() }
    setSession(sess)
    localStorage.setItem(SESSION_KEY, JSON.stringify(sess))
  }

  // Authenticate with correo + contrasena across all colonias
  const authLogin = (correo: string, contrasena: string) => {
    const correoNormalizado = correo.trim().toLowerCase()
    const contrasenaNormalizada = contrasena.trim()

    // search in db
    for (const [colKey, col] of Object.entries(db.colonias)) {
      // admins
      if (col.admins && Array.isArray(col.admins)) {
        const a = col.admins.find((x:any) => String(x.correo || '').toLowerCase() === correoNormalizado && x.contrasena === contrasenaNormalizada)
        if (a) {
          const sess = { coloniaKey: colKey, role: 'admin', correo: a.correo, profile: a }
          setSession(sess)
          localStorage.setItem(SESSION_KEY, JSON.stringify(sess))
          return { ok: true, role: 'admin', profile: a }
        }
      }
      // moderadores
      if (col.moderadores && Array.isArray(col.moderadores)) {
        const m = col.moderadores.find((x:any) => String(x.correo || '').toLowerCase() === correoNormalizado && x.contrasena === contrasenaNormalizada)
        if (m) {
          const sess = { coloniaKey: colKey, role: 'moderador', correo: m.correo, profile: m }
          setSession(sess)
          localStorage.setItem(SESSION_KEY, JSON.stringify(sess))
          return { ok: true, role: 'moderador', profile: m }
        }
      }
      // vecinos
      if (col.vecinos && Array.isArray(col.vecinos)) {
        const v = col.vecinos.find((x:any) => String(x.correo || '').toLowerCase() === correoNormalizado && x.contrasena === contrasenaNormalizada)
        if (v) {
          const sess = { coloniaKey: colKey, role: 'vecino', correo: v.correo, profile: v }
          setSession(sess)
          localStorage.setItem(SESSION_KEY, JSON.stringify(sess))
          return { ok: true, role: 'vecino', profile: v }
        }
      }
    }

    return { ok: false, error: 'Usuario o contraseña inválidos' }
  }

  // Register a new vecino using the password provided in the form.
  const Register = ({ coloniaKey, role, profile }: any) => {
    const pass = String(profile.contrasena || '').trim()
    if (!pass) {
      return { ok: false, error: 'La contraseña es obligatoria' }
    }

    setDb((prev:any)=>{
      const next = JSON.parse(JSON.stringify(prev))
      next.colonias[coloniaKey].vecinos = next.colonias[coloniaKey].vecinos || []
      const id = `v-${Date.now()}`
      const usuario = (profile.correo || profile.usuario || '').split('@')[0] || `user${Date.now()}`
      next.colonias[coloniaKey].vecinos.push({
        id,
        nombre: `${profile.nombre} ${profile.apellidos}`,
        usuario,
        correo: profile.correo,
        telefono: profile.telefono,
        contrasena: pass,
        profile,
      })
      return next
    })

    const sess = { coloniaKey, role: 'vecino', usuario: profile.correo?.split('@')[0] || profile.usuario, profile }
    setSession(sess)
    localStorage.setItem(SESSION_KEY, JSON.stringify(sess))

    return { ok: true }
  }

  const logout = () => {
    setSession(null)
    localStorage.removeItem(SESSION_KEY)
  }

  useEffect(() => {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(db))
    } catch (e) {}
  }, [db])

  return (
    <ColonyContext.Provider value={{ db, setDb, session, login, logout, authLogin, Register, isHydrated }}>
      {children}
    </ColonyContext.Provider>
  )
}

export const useColony = () => {
  const ctx = useContext(ColonyContext)
  if (!ctx) throw new Error('useColony must be used inside ColonyProvider')
  return ctx
}
