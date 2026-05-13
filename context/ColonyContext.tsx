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
    <ColonyContext.Provider value={{ db, setDb, session, login, logout, isHydrated }}>
      {children}
    </ColonyContext.Provider>
  )
}

export const useColony = () => {
  const ctx = useContext(ColonyContext)
  if (!ctx) throw new Error('useColony must be used inside ColonyProvider')
  return ctx
}
