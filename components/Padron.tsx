import React from 'react'
import { useColony } from '@/context/ColonyContext'

export default function Padron(){
  const { db }: any = useColony()
  const coloniaKey = Object.keys(db.colonias)[0]
  const d = db.colonias[coloniaKey]

  return (
    <div>
  <h2 className='text-xl font-semibold text-neutral-800'>📋 Padrón Vecinal</h2>
      <div className={`card mt-3`}>
        <div className={d.padronCerrado? 'p-3 rounded-md bg-[#ffc000] text-neutral-800':'p-3 rounded-md bg-green-50 text-green-800'}>
          <strong>{d.padronCerrado? 'Padrón Cerrado':'Padrón Abierto'}</strong> {d.padronCerrado? 'desde '+d.fechaCierre:'Aún puede modificar registros.'}
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm">
            <thead className="bg-[#ffc000] text-black text-left"><tr><th className="px-3 py-2">Folio</th><th className="px-3 py-2">Vivienda</th><th className="px-3 py-2">Representante</th><th className="px-3 py-2">Estatus</th></tr></thead>
            <tbody>
              <tr className="border"><td className="px-3 py-2 border">FOL-001</td><td className="px-3 py-2 border">Casa 1</td><td className="px-3 py-2 border">María Gómez</td><td className="px-3 py-2 border"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Válido</span></td></tr>
              <tr className="border bg-gray-50"><td className="px-3 py-2 border">FOL-002</td><td className="px-3 py-2 border">Casa 2</td><td className="px-3 py-2 border">Carlos Ruiz</td><td className="px-3 py-2 border"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Válido</span></td></tr>
              <tr className="border"><td className="px-3 py-2 border">FOL-003</td><td className="px-3 py-2 border">Casa 3</td><td className="px-3 py-2 border">—</td><td className="px-3 py-2 border"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Pendiente</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


