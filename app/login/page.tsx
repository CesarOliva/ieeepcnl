'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useColony } from '@/context/ColonyContext'
import { toast } from 'sonner'

type LoginFormState = {
  correo: string
  contrasena: string
}

const initialFormState: LoginFormState = {
  correo: '',
  contrasena: '',
}

export default function LoginPage() {
  const { authLogin } = useColony() as any
  const router = useRouter()
  const [form, setForm] = useState<LoginFormState>(initialFormState)

  const handleChange = (field: keyof LoginFormState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: event.target.value }))
  }

  function doLogin(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault()

    const requiredFields: Array<keyof LoginFormState> = ['correo', 'contrasena']

    const missingField = requiredFields.find(field => !form[field].trim())

    if (missingField) {
      toast.error('Completa correo y contraseña para continuar.')
      return
    }

    const res = authLogin(form.correo.trim(), form.contrasena.trim())
    if (!res.ok) {
      toast.error(res.error || 'Credenciales incorrectas')
      return
    }
    toast.success('Sesión iniciada.')
    router.push('/dashboard')
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_24px_80px_rgba(27,45,92,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,192,0,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(27,45,92,0.12),_transparent_38%)]" />

      <div className="relative grid gap-0 lg:grid-cols-[1.05fr_1fr]">
        <section className="flex flex-col justify-between bg-[linear-gradient(160deg,#1b2d5c_0%,#243a73_55%,#0f172a_100%)] px-6 py-8 text-white sm:px-10 sm:py-12">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <img src="/imagenes/logoCropped.png" alt="Logo" className="h-8 w-8 rounded-full bg-white" />
              <span className="font-semibold tracking-wide">Mi Colonia Participa</span>
            </div>
            <h2 className="max-w-md text-3xl font-semibold leading-tight sm:text-4xl">
              Accede con tus datos y entra al panel de tu colonia.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/80 sm:text-base">
              Una entrada clara, rápida y alineada al diseño de la plataforma para registrar a cada vecino con su información básica.
            </p>
          </div>

          <div className="mt-10 grid gap-3 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur sm:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/60">Acceso</div>
              <div className="mt-1 text-lg font-semibold">Panel vecinal</div>
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] px-6 py-8 sm:px-10 sm:py-12">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="inline-flex rounded-full bg-[#ffc000]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#1b2d5c]">
                Ingreso vecinal
              </span>
              <h1 className="mt-4 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                Inicia sesión
              </h1>
              <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                Accede con tu usuario y contraseña para entrar al panel.
              </p>
            </div>

            <form id="login-form" className="grid gap-4 sm:grid-cols-2" onSubmit={doLogin}>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Correo</label>
                <input type="email" className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.correo} onChange={handleChange('correo')} placeholder="tu@correo.com" autoComplete="email" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Contraseña</label>
                <input type="password" className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.contrasena} onChange={handleChange('contrasena')} placeholder="Tu contraseña" autoComplete="current-password" />
              </div>
            </form>
            <div className="sm:col-span-2  mt-4">
              <p className="mt-1 text-sm text-neutral-500">No tienes cuenta? <a href="/register" className="font-semibold text-[#1b2d5c] hover:underline">Regístrate aquí</a></p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" form="login-form" className="inline-flex items-center justify-center rounded-xl bg-[#ffc000] px-6 py-3 font-semibold text-black shadow-[0_12px_30px_rgba(255,192,0,0.28)] transition hover:bg-[#e8b300]">
                Ingresar a la plataforma
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
