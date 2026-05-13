import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className="card">
        <h2 className="text-xl font-semibold text-neutral-800">✨ Organiza tu colonia sin tanto rollo</h2>
        <p className="mt-2">Herramienta gratuita para juntas vecinales, comités de colonos y mesas directivas. Convoca, vota y dale seguimiento a tus decisiones con transparencia.</p>
        <div className="grid-3 mt-4">
          <div className="stat-box"><div className="number">📋</div><strong>Padrón confiable</strong><div className="label">Registrá vecinos</div></div>
          <div className="stat-box"><div className="number">🗳️</div><strong>Voto secreto</strong><div className="label">Una vivienda = un voto</div></div>
          <div className="stat-box"><div className="number">📄</div><strong>Actas automáticas</strong><div className="label">Resultados y seguimiento</div></div>
        </div>
        <div className="mt-4">
          <Link href="/login" className="btn btn-primary">Ingresar a la plataforma</Link>
        </div>
      </div>
    </div>
  )
}



