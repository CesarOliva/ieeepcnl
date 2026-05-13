import Link from 'next/link'

export default function Footer(){
    const year = new Date().getFullYear()
    return (
        <div className="footer-bar">
            <strong>Mi colonia participa</strong> · IEEPCNL · TecNM · HackaTec {year} · Un proyecto de DeltaHBC
        </div>
  )
}


