import React from 'react'
import { useColony } from '@/context/ColonyContext'
import { toast } from 'sonner'

export default function Actas(){
  const { db }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const d = db.colonias[coloniaKey]

  return (
    <div>
  <h2 className='text-xl font-semibold text-neutral-800'>📄 Actas Públicas</h2>
      <div className="card mt-3">
        {d.resultadosEleccion? (
          <div>
            <table className="min-w-full text-sm border">
              <tbody>
                <tr><td className="px-3 py-2 border">Elección Mesa Directiva</td><td className="px-3 py-2">16/ago/2026</td><td className="px-3 py-2 font-mono">ACTA-A3F2B8C9</td><td className="px-3 py-2"><button className="btn btn-dorado" onClick={()=>toast.info('📥 Descargando (simulado)...')}>PDF</button></td></tr>
              </tbody>
            </table>
          </div>
        ): <p className="text-gray-500">No hay actas disponibles.</p>}
      </div>
    </div>
  )
}


