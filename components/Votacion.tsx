'use client'

import React, { useMemo, useState } from 'react'
import { useColony } from '@/context/ColonyContext'
import { toast } from 'sonner'

export default function Votacion(){
  const { db, setDb }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const colonia = db.colonias[coloniaKey]

  const [sel, setSel] = useState<number | null>(null)
  const [votoOK, setVotoOK] = useState<string | null>(null)
  const [disabledVoto, setDisabledVoto] = useState(false)
  const [timeLeft, setTimeLeft] = useState<string | null>(null)

  const problemas = colonia.problemas || []
  const [pri1, setPri1] = useState(problemas[0]?.nombre || '')
  const [pri2, setPri2] = useState(problemas[1]?.nombre || (problemas[0]?.nombre || ''))
  const [priOK, setPriOK] = useState(false)

  const planillas = colonia.planillas || []

  function seleccionarPlanilla(i:number){
    if (disabledVoto) return
    setSel(i)
  }

  function emitir(){
    if (sel === null) { toast.error('Seleccione una planilla o voto nulo.'); return }
    // update simulated DB
    setDb((prev:any)=>{
      const next = JSON.parse(JSON.stringify(prev))
      const res = next.colonias[coloniaKey].resultadosEleccion || { votosEmitidos:0, planillas: [] }
      res.votosEmitidos = (res.votosEmitidos || 0) + 1
      // ensure planillas array exists in resultadosEleccion
      if (!res.planillas || res.planillas.length === 0) {
        res.planillas = next.colonias[coloniaKey].planillas.map((pl:any)=>({ n: pl.nombre, v: 0 }))
      }
      // handle null vote indicated by sel === -1
      if (sel === -1) {
        res.votosNulos = (res.votosNulos || 0) + 1
      } else {
        res.planillas[sel].v = (res.planillas[sel].v || 0) + 1
      }
      next.colonias[coloniaKey].resultadosEleccion = res
      return next
    })
    // show comprobante hash and disable further interaction
    const hash = 'HASH-' + Math.random().toString(36).substr(2,10).toUpperCase()
    setVotoOK(hash)
    setDisabledVoto(true)
  }

  // Countdown timer for voting window
  React.useEffect(()=>{
    let timer: any = null
    const conv = (colonia.convocatorias || []).find((c:any)=> (c.metodoVotacion||'').toLowerCase().includes('mayoría') || (c.tipo||'').toLowerCase().includes('elección') ) || null

    if (!conv) {
      setTimeLeft(null)
      return
    }

    const fecha = conv.fecha // expect YYYY-MM-DD
    const horario = conv.horario || '' // expect 'HH:MM - HH:MM'
    const parts = horario.split('-').map((s:string)=>s.trim())
    const startTime = parts[0] || '00:00'
    const endTime = parts[1] || '23:59'

    const pad = (s:string)=>s.split(':').map(p=>p.padStart(2,'0')).join(':')
    const start = new Date(`${fecha}T${pad(startTime)}:00`)
    const end = new Date(`${fecha}T${pad(endTime)}:00`)

    function update(){
      const now = new Date()
      if (now > end) {
        setTimeLeft('Votación cerrada')
        setDisabledVoto(true)
        return
      }
      if (now < start) {
        const diff = start.getTime() - now.getTime()
        setTimeLeft(msToStr(diff) + ' restantes')
        return
      }
      // between start and end
      const diff = end.getTime() - now.getTime()
      setTimeLeft(msToStr(diff) + ' restantes')
    }

    function msToStr(ms:number){
      const sec = Math.floor(ms/1000)
      const days = Math.floor(sec / 86400)
      let rest = sec % 86400
      const hrs = Math.floor(rest / 3600)
      rest = rest % 3600
      const mins = Math.floor(rest / 60)
      const s = rest % 60
      if (days>0) return `${days}d ${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(s).padStart(2,'0')}`
      return `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(s).padStart(2,'0')}`
    }

    update()
    timer = setInterval(update, 1000)
    return ()=> clearInterval(timer)
  },[colonia.convocatorias])

  function emitirPri(){
    if (pri1 === pri2) { toast.error('Las prioridades deben ser diferentes.'); return }
    // update simulated prioritization results in DB
    setDb((prev:any)=>{
      const next = JSON.parse(JSON.stringify(prev))
      next.colonias[coloniaKey].resultadosPriorizacion = next.colonias[coloniaKey].resultadosPriorizacion || []
      // add 2 pts to pri1 and 1 pt to pri2 in resultadosPriorizacion tally
      const addPoints = (name:string, pts:number)=>{
        const found = next.colonias[coloniaKey].resultadosPriorizacion.find((r:any)=>r.op===name)
        if (found) found.pt = (found.pt||0) + pts
        else next.colonias[coloniaKey].resultadosPriorizacion.push({ op: name, pt: pts })
      }
      addPoints(pri1, 2)
      addPoints(pri2, 1)
      return next
    })
    setPriOK(true)
  }

  const problemaOptions = useMemo(()=>problemas.map((p:any)=>p.nombre), [problemas])

  return (
    <section className="mt-4">
      <div className="flex items-center justify-between">
        <h2 className='text-xl font-semibold text-neutral-800'>🗳️ Urna Digital</h2>
        {timeLeft && <div className="text-md font-semibold text-neutral-600">⏱ {timeLeft}</div>}
      </div>

      {/* Elección de Mesa Directiva */}
      {planillas.length>0 ? (
        <>
          <h3 className="text-md font-semibold text-neutral-500 mt-3">Elección de Mesa Directiva</h3>
          <div className="space-y-3 mt-2">
            {planillas.map((p:any, i:number)=> (
              <article
                key={p.nombre}
                onClick={()=>seleccionarPlanilla(i)}
                className={`flex items-center gap-3 p-3 bg-white rounded-[12px] border border-neutral-100 cursor-pointer voto-option hover:shadow-md hover:border-yellow-300 ${sel===i? 'selected bg-yellow-50 border-yellow-300 ring-2 ring-yellow-300 shadow-md':''} ${disabledVoto? 'opacity-60 pointer-events-none':''}`}
              >
                <input type="radio" name="planilla" className="w-4 h-4" readOnly checked={sel===i} />
                <div className="flex-1">
                  <strong className="block">{p.nombre}</strong>
                  <p className="text-sm text-neutral-600">{(p.propuesta||'').substring(0,60)}{(p.propuesta||'').length>60? '...':''}</p>
                </div>
              </article>
            ))}
                {/* Voto nulo option */}
                <article
                  key="voto-nulo"
                  onClick={()=>seleccionarPlanilla(-1)}
                  className={`flex items-center gap-3 p-3 bg-white rounded-[12px] border border-neutral-100 cursor-pointer voto-option hover:shadow-md hover:border-red-300 ${sel===-1? 'selected bg-red-50 border-red-300 ring-2 ring-red-300 shadow-md':''} ${disabledVoto? 'opacity-60 pointer-events-none':''}`}
                >
                  <input type="radio" name="planilla" className="w-4 h-4" readOnly checked={sel===-1} />
                  <div className="flex-1">
                    <strong className="block">Voto nulo</strong>
                    <p className="text-sm text-neutral-600">Si no deseas apoyar a ninguna planilla selecciona esta opción.</p>
                  </div>
                </article>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="inline-flex items-center px-4 py-2 rounded-full bg-[#ffc000] text-black font-semibold text-sm hover:brightness-95 transition-colors" onClick={emitir}>Emitir Voto</button>
            {votoOK && <div id="votoOK" className="text-green-800">✅ Voto emitido. Comprobante: <strong>{votoOK}</strong></div>}
          </div>
        </>
      ) : (
        <p className="text-sm text-neutral-500">No hay planillas para votar.</p>
      )}

      {/* Priorización de Problemas */}
      {problemas.length>0 && (
        <>
          <hr className="my-4" />
          <h3 className="text-md font-semibold text-neutral-500">Priorización de Problemas</h3>
          <p className="text-sm text-neutral-600">Asigne <strong>2 pts</strong> a la prioridad principal y <strong>1 pt</strong> a la secundaria.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div>
              <label className="text-sm font-semibold">Prioridad Principal (2 pts)</label>
              <select id="pri1" value={pri1} onChange={e=>setPri1(e.target.value)} className="w-full border rounded px-3 py-2">
                {problemaOptions.map((o: string) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Prioridad Secundaria (1 pt)</label>
              <select id="pri2" value={pri2} onChange={e=>setPri2(e.target.value)} className="w-full border rounded px-3 py-2">
                {problemaOptions.map((o: string) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="inline-flex items-center px-4 py-2 rounded-full bg-[#ffc000] text-black font-semibold text-sm hover:bg-[#ffc000]/80 transition-colors" onClick={emitirPri}>Emitir Priorización</button>
            {priOK && <div id="priOK" className="text-green-800">✅ Priorización emitida.</div>}
          </div>
        </>
      )}
    </section>
  )
}



