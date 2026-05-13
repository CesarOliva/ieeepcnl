import Link from 'next/link'

export default function Footer(){
    const year = new Date().getFullYear()
    return (
        <div className="footer-bar">
            <strong>IEEPCNL</strong> · Instituto Estatal Electoral y de Participación Ciudadana de Nuevo León · TecNM · HackaTec {year} · <Link href="/">Inicio</Link>
        </div>
  )
}


