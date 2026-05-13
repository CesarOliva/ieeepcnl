'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useColony } from '@/context/ColonyContext'
import { toast } from 'sonner'

function validateCURP(curp: string): { valid: boolean; error?: string } {
  const curpUpper = curp.toUpperCase().trim()

  // Validar que tenga exactamente 18 caracteres
  if (curpUpper.length !== 18) {
    return { valid: false, error: 'El CURP debe tener 18 caracteres.' }
  }

  // El CURP tiene formato: 6 letras + 8 números (YYMMDD) + 3 letras + 1 número
  const curpPattern = /^[A-Z]{6}\d{8}[A-Z]{3}\d{1}$/
  if (!curpPattern.test(curpUpper)) {
    return { valid: false, error: 'El formato del CURP no es válido.' }
  }

  // Extraer la fecha: caracteres 4-10 son YYMMDD
  const yearStr = curpUpper.substring(4, 6)
  const monthStr = curpUpper.substring(6, 8)
  const dayStr = curpUpper.substring(8, 10)

  const year = parseInt(yearStr, 10)
  const month = parseInt(monthStr, 10)
  const day = parseInt(dayStr, 10)

  // Determinar el siglo (si YY > 30 es 19XX, si no es 20XX)
  const fullYear = year > 30 ? 1900 + year : 2000 + year

  // Validar que el mes sea válido
  if (month < 1 || month > 12) {
    return { valid: false, error: 'El mes en el CURP no es válido.' }
  }

  // Validar que el día sea válido
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const isLeapYear = (fullYear % 4 === 0 && fullYear % 100 !== 0) || fullYear % 400 === 0
  if (isLeapYear) daysInMonth[1] = 29

  if (day < 1 || day > daysInMonth[month - 1]) {
    return { valid: false, error: 'El día en el CURP no es válido.' }
  }

  // Validar edad: debe ser mayor de 18 años
  const birthDate = new Date(fullYear, month - 1, day)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  if (age < 18) {
    return { valid: false, error: 'Debes ser mayor de 18 años para registrarte.' }
  }

  return { valid: true }
}

type RegisterFormState = {
  nombre: string
  apellidos: string
  curp: string
  correo: string
  telefono: string
  municipio: string
  colonia: string
  cp: string
  calle: string
  numero: string
}

const initialFormState: RegisterFormState = {
  nombre: '',
  apellidos: '',
  curp: '',
  correo: '',
  telefono: '',
  municipio: '',
  colonia: '',
  cp: '',
  calle: '',
  numero: '',
}

export default function RegisterPage() {
  const { db, Register } = useColony() as any
  const router = useRouter()
  const [form, setForm] = useState<RegisterFormState>(initialFormState)

  const coloniaKey = useMemo(() => Object.keys(db?.colonias ?? {})[0] ?? '', [db])

  const handleChange = (field: keyof RegisterFormState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: event.target.value }))
  }

  function doRegister(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault()

    const requiredFields: Array<keyof RegisterFormState> = [
      'nombre',
      'apellidos',
      'curp',
      'correo',
      'telefono',
      'municipio',
      'colonia',
      'cp',
      'calle',
      'numero',
    ]

    const missingField = requiredFields.find(field => !form[field].trim())

    if (missingField) {
      toast.error('Completa todos los campos para continuar.')
      return
    }

    const curpValidation = validateCURP(form.curp)
    if (!curpValidation.valid) {
      toast.error(curpValidation.error || 'CURP inválido.')
      return
    }

    Register({
      coloniaKey,
      role: 'vecino',
      profile: form,
    })

    toast.success('Datos guardados. Bienvenido/a.')
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
                Completa tus datos
              </h1>
              <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                Capturamos la información solicitada para identificar tu perfil dentro de la colonia.
              </p>
            </div>

            <form id="Register-form" className="grid gap-4 sm:grid-cols-2" onSubmit={doRegister}>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Nombre</label>
                <input className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.nombre} onChange={handleChange('nombre')} placeholder="Nombre(s)" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Apellidos</label>
                <input className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.apellidos} onChange={handleChange('apellidos')} placeholder="Apellido paterno y materno" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">CURP (18 caracteres)</label>
                <input className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 uppercase outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.curp} onChange={handleChange('curp')} placeholder="ABCD123456HDFXXX09" maxLength={18} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Correo</label>
                <input type="email" className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.correo} onChange={handleChange('correo')} placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Número de teléfono</label>
                <input type="tel" className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.telefono} onChange={handleChange('telefono')} placeholder="81 1234 5678" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Municipio</label>
                <input className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.municipio} onChange={handleChange('municipio')} placeholder="Municipio" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Colonia</label>
                <input className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.colonia} onChange={handleChange('colonia')} placeholder="Nombre de la colonia" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">CP</label>
                <input inputMode="numeric" className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.cp} onChange={handleChange('cp')} placeholder="00000" />
              </div>
              <div className="sm:col-span-2 grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Calle</label>
                  <input className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.calle} onChange={handleChange('calle')} placeholder="Nombre de la calle" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Número</label>
                  <input inputMode="numeric" className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#1b2d5c] focus:ring-2 focus:ring-[#ffc000]/30" value={form.numero} onChange={handleChange('numero')} placeholder="123" />
                </div>
              </div>
            </form>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" form="Register-form" className="inline-flex items-center justify-center rounded-xl bg-[#ffc000] px-6 py-3 font-semibold text-black shadow-[0_12px_30px_rgba(255,192,0,0.28)] transition hover:bg-[#e8b300]">
                Registrarse
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
