import React from 'react'
import { useColony } from '@/context/ColonyContext'

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

export default function VecinoConvocatorias({ onNavigate }:{ onNavigate:(v:string)=>void }){
  const { db }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const d = db.colonias[coloniaKey]
  const [times, setTimes] = React.useState<Record<string,string>>({})

  React.useEffect(()=>{
    if (!d?.convocatorias || d.convocatorias.length===0) { setTimes({}); return }

    function padTime(s:string){
      const parts = s.split(':').map(p=>p.trim())
      if (parts.length===1) return parts[0]+':00'
      return parts.map(p=>p.padStart(2,'0')).join(':')
    }

    function compute(){
      const now = new Date()
      const nextTimes: Record<string,string> = {}
      d.convocatorias.forEach((c:any)=>{
        if (c.estado === 'Finalizada') { nextTimes[c.id] = '' ; return }
        const fecha = c.fecha
        const horario = c.horario || ''
        const parts = horario.split('-').map((s:string)=>s.trim())
        const startTime = parts[0] ? padTime(parts[0]) : '00:00'
        const endTime = parts[1] ? padTime(parts[1]) : '23:59'
        const start = new Date(`${fecha}T${startTime}:00`)
        const end = new Date(`${fecha}T${endTime}:00`)

        if (now > end) nextTimes[c.id] = 'Votación cerrada'
        else if (now < start) nextTimes[c.id] = msToStr(start.getTime()-now.getTime()) + ' restantes'
        else nextTimes[c.id] = msToStr(end.getTime()-now.getTime()) + ' restantes'
      })
      setTimes(nextTimes)
    }

    compute()
    const t = setInterval(compute, 1000)
    return ()=> clearInterval(t)
  },[d])

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-800">📢 Convocatorias de {d.nombre}</h2>
      <div className="space-y-3 mt-3">
        {d.convocatorias.length>0 ? d.convocatorias.map((c:any)=> (
          <article key={c.id} className="bg-white rounded-[16px] p-4 shadow-soft border border-neutral-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-md font-semibold">{c.tema}</h3>
                <p className="text-sm text-neutral-500">📅 {c.fecha} · {c.horario} · 📍 {c.lugar}</p>
              </div>
              <div className="ml-4 text-right">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${c.estado==='Finalizada'?'bg-green-50 text-green-800':'bg-blue-100 text-blue-800'}`}>{c.estado}</div>
                {times[c.id] && <div className="text-sm font-semibold text-neutral-500 mt-1">⏱ {times[c.id]}</div>}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="inline-flex items-center px-3 py-2 rounded-full bg-[#ffc000] text-neutral-800 text-sm font-semibold hover:bg-[#ffc000]/80" onClick={()=>onNavigate('deliberacion')}>Informarme y deliberar</button>
              {c.estado === 'Finalizada' && <button className="inline-flex items-center px-3 py-2 rounded-full border border-neutral-200 text-sm font-medium" onClick={()=>onNavigate('resultados')}>Resultados</button>}
            </div>
          </article>
        )) : <p className="text-sm text-neutral-500">No hay convocatorias activas.</p>}
      </div>
    </div>
  )
}


