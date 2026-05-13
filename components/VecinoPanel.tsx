import React from 'react'
import { useColony } from '@/context/ColonyContext'
import { Clock } from 'lucide-react'

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

export default function VecinoPanel({ onNavigate }: { onNavigate:(v:string)=>void }){
  const { db }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const d = db.colonias[coloniaKey]

  const prox = d.convocatorias.find((c:any)=>c.estado==='Próxima')
  const [timeLeft, setTimeLeft] = React.useState<string | null>(null)

  React.useEffect(()=>{
    if (!prox) { setTimeLeft(null); return }
    const fecha = prox.fecha
    const horario = prox.horario || ''
    const parts = horario.split('-').map((s:string)=>s.trim())
    const startTime = parts[0] || '00:00'
    const endTime = parts[1] || '23:59'

    const pad = (s:string)=>s.split(':').map(p=>p.padStart(2,'0')).join(':')
    const start = new Date(`${fecha}T${pad(startTime)}:00`)
    const end = new Date(`${fecha}T${pad(endTime)}:00`)

    function update(){
      const now = new Date()
      if (now > end) { setTimeLeft('Votación cerrada'); return }
      if (now < start) { setTimeLeft(msToStr(start.getTime()-now.getTime()) + ' restantes'); return }
      setTimeLeft(msToStr(end.getTime()-now.getTime()) + ' restantes')
    }

    update()
    const t = setInterval(update,1000)
    return ()=> clearInterval(t)
  },[prox])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <article className="bg-white rounded-[20px] p-0 shadow-glass overflow-hidden border border-neutral-200/60">
        <div className="p-6">
          <div className="flex flex-col mb-4">
            <h3 className="text-xl font-bold text-neutral-900 mt-1 leading-tight">{d.nombre}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">{d.viviendas} viviendas registradas</p>

            <div className="mt-2 text-sm text-neutral-700 bg-yellow-100 leading-relaxed p-3 flex items-center justify-between">
              <div>
                Próxima Convocatoria: <strong>{prox?.tema || 'Ninguna convocatoria próxima'}</strong> · {prox?.fecha || ''}
              </div>
              {timeLeft && <div className="text-sm text-neutral-700 font-medium">⏱ {timeLeft}</div>}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-2 border-t border-neutral-100">
            <div className="w-full sm:w-auto flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffc000] text-neutral-800 font-semibold text-sm hover:bg-[#ffc000]/80 transition-colors cursor-pointer" onClick={()=>onNavigate('convocatorias')}>
                <span>Ver convocatorias</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      <aside className="w-full shrink-0 space-y-6">
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <h3 className="text-xl font-semibold text-neutral-800 mb-4">Seguimiento de propuestas</h3>

          <div className="space-y-2">
            {d.seguimiento && d.seguimiento.length>0 ? d.seguimiento.map((s:any,i:number)=> (
              <div key={i} className="flex items-center gap-3">
                <Clock className="size-4 text-[#ffc000]"/>
                <p className="text-sm text-neutral-700">{s.acuerdo}</p>
              </div>
            )) : <p className="text-sm text-neutral-700">Sin acuerdos pendientes.</p>}
          </div>
        </div>
      </aside>
    </div>
  )
}


