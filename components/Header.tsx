'use client'

import { useRouter } from 'next/navigation'
import { useColony } from '@/context/ColonyContext'

export default function Header(){
  const router = useRouter()
  const { session, logout, isHydrated } = useColony()

  return (
    <nav className="fixed w-full top-0 z-50 bg-white border-b border-neutral-200 py-4">
      <div className="max-w-7xl flex w-full justify-between items-center mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img src="/imagenes/logoCropped.png" alt="Logo" style={{width:36, height:36}}/>
          <div className="font-bold text-xl">Foro IEEPCNL</div>
        </div>
        <div className="text-center">
          <h1 className="text-center font-semibold text-xl">🏘️ Mi Colonia Participa</h1>
          <div className="text-center text-neutral-500">Plataforma de Participación Vecinal</div>
        </div>
        <div className='flex flex-col items-end'>
          {!isHydrated || !session?.role ? (
            <>
              <button className="btn btn-dorado btn-sm mr-2" onClick={()=>router.push('/login')}>🔐 Ingresar</button>
              <button className="btn btn-sm" onClick={()=>router.push('/register')}>➕ Registrar colonia</button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-[#ffc000] hover:bg-[#ffc000]/80 text-black rounded-md" onClick={()=>{ logout(); router.push('/')}}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}


