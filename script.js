// ========== BASE DE DATOS LOCAL ==========
const DB_KEY = 'miColoniaParticipaDB_v2';
let DB = JSON.parse(localStorage.getItem(DB_KEY)) || {
    colonias: {
        'las-lomas-del-sur': {
            nombre: 'Las Lomas del Sur',
            cp: '64000',
            municipio: 'Monterrey',
            viviendas: 220,
            padronCerrado: true,
            fechaCierre: '2026-08-10',
            admins: [{ id: 'a1', nombre: 'Carlos Méndez', correo: 'admin@lomas.com', inicio: '2026-03-01',
                activo: true }],
            convocatorias: [
                { id: 'CONV-001', tema: 'Elección de Mesa Directiva y Priorización de Problemas',
                    tipo: 'Elección + Priorización', fecha: '2026-08-16', horario: '9:00 - 14:00',
                    lugar: 'Palapa del parque central', modalidad: 'Presencial', estado: 'Finalizada',
                    metodoVotacion: 'Mayoría simple (planilla)',
                    metodoPriorizacion: 'Puntaje ponderado (2pts / 1pt)' },
                { id: 'CONV-002', tema: 'Aprobación de cuota extraordinaria para portones',
                    tipo: 'Aprobación de cuota', fecha: '2026-09-30', horario: '18:00 - 20:00',
                    lugar: 'Virtual (Zoom)', modalidad: 'Híbrida', estado: 'Próxima',
                    metodoVotacion: 'Mayoría simple (Sí/No)' }
            ],
            planillas: [
                { nombre: 'Planilla A - Vecindad Activa',
                    integrantes: 'Presidencia: Ana López, Secretaría: Luis Díaz, Tesorería: Marta Ruiz, Vocal Seguridad: Pedro Gómez, Vocal Mantenimiento: Rosa Gil',
                    propuesta: 'Transparencia mensual de cuotas, reparación de juegos infantiles y reuniones bimestrales abiertas.',
                    color: '#3498db' },
                { nombre: 'Planilla B - Orden y Seguridad',
                    integrantes: 'Presidencia: Carlos Méndez, Secretaría: Juana Torres, Tesorería: Felipe Ríos, Vocal Seguridad: Andrés Vega, Vocal Mantenimiento: Lourdes Pardo',
                    propuesta: 'Gestión de rondines con Seguridad Pública, control de accesos vehiculares y canal único de reportes vecinales.',
                    color: '#e67e22' },
                { nombre: 'Planilla C - Comunidad Verde',
                    integrantes: 'Presidencia: Gloria Estrada, Secretaría: Omar Fuentes, Tesorería: Diana Rosas, Vocal Seguridad: Tomás Leyva, Vocal Mantenimiento: Cecilia Bravo',
                    propuesta: 'Mejora del parque central, reforestación con especies nativas, mantenimiento preventivo y convivencia familiar.',
                    color: '#2ecc71' }
            ],
            problemas: [
                { nombre: 'Seguridad pública (rondines)',
                    evidencia: '3 reportes vecinales, 2 denuncias, mapa de incidentes y horarios recurrentes.',
                    gestion: 'Oficio a Secretaría de Seguridad municipal con mapa de puntos.' },
                { nombre: 'Obra de Agua y Drenaje',
                    evidencia: 'Fotografías, ubicación, testimonio de vecino accidentado y registro de lluvias.',
                    gestion: 'Reporte formal con folio, oficio, evidencia y solicitud de limpieza.' },
                { nombre: 'Parque central y canchas',
                    evidencia: 'Fotografías, cotizaciones preliminares y reporte de uso por niñas, niños y jóvenes.',
                    gestion: 'Plan interno de mantenimiento y solicitud de apoyo municipal.' }
            ],
            resultadosEleccion: { votosEmitidos: 156, votosNulos: 3,
                planillas: [{ n: 'Planilla A - Vecindad Activa', v: 52, p: 33.3 }, { n: 'Planilla B - Orden y Seguridad',
                    v: 81, p: 51.9, g: true }, { n: 'Planilla C - Comunidad Verde', v: 20, p: 12.8 }] },
            resultadosPriorizacion: [
                { op: 'Seguridad pública (rondines)', pt: 167 },
                { op: 'Obra de Agua y Drenaje', pt: 155 },
                { op: 'Parque central y canchas', pt: 127 }
            ],
            seguimiento: [
                { acuerdo: 'Entregar oficio y mapa a Seguridad Pública municipal',
                    responsable: 'Vocalía de Seguridad', fecha: '2026-08-21',
                    evidencia: 'Acuse, folio, calendario de rondines', estatus: 'En proceso' },
                { acuerdo: 'Registrar reporte formal de obra de Agua y Drenaje',
                    responsable: 'Presidencia', fecha: '2026-08-23',
                    evidencia: 'Folio, fotos antes/después', estatus: 'Pendiente' },
                { acuerdo: 'Actualizar cotizaciones para el parque', responsable: 'Vocalía de Mantenimiento',
                    fecha: '2026-09-05', evidencia: 'Cotizaciones y propuesta técnica',
                estatus: 'Pendiente' }
            ],
            bitacora: [
                { evento: 'Urna abierta', ts: '2026-08-16 09:00:00', hash: 'a1b2c3d4e5f6' },
                { evento: 'Voto emitido (FOL-***)', ts: '2026-08-16 09:15:23', hash: 'f6e5d4c3b2a1' },
                { evento: 'Voto emitido (FOL-***)', ts: '2026-08-16 10:30:11', hash: '1a2b3c4d5e6f' },
                { evento: 'Urna cerrada', ts: '2026-08-16 14:00:00', hash: '7890abcdef12' },
                { evento: 'Acta generada', ts: '2026-08-16 14:05:00', hash: '34567890abcd' }
            ],
            comentarios: [
                { folio: 'FOL-045', texto: 'Considero que la Planilla B tiene mejor propuesta de seguridad.',
                    fecha: '2026-08-10', estado: 'Aprobado' },
                { folio: 'FOL-102',
                    texto: '¿Alguien tiene más información sobre costos de la Planilla C?',
                    fecha: '2026-08-11', estado: 'Aprobado' },
                { folio: 'FOL-187',
                    texto: 'El problema de agua y drenaje es urgente, hay fotos del encharcamiento.',
                    fecha: '2026-08-12', estado: 'Pendiente' }
            ]
        }
    }
};

function guardarDB() { localStorage.setItem(DB_KEY, JSON.stringify(DB)); }

// ========== TOAST NOTIFICATION HELPER ==========
function showToastNotification(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = 'position: fixed; top: 16px; right: 16px; z-index: 9999; display: flex; flex-direction: column; gap: 8px;';
        document.body.appendChild(container);
        
        const style = document.createElement('style');
        style.innerHTML = `
          .toast-notification {
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            animation: slideInRight 0.3s ease-in-out;
            border: 1px solid;
          }
          .toast-notification.success {
            background-color: #dcfce7;
            color: #166534;
            border-color: #bbf7d0;
          }
          .toast-notification.error {
            background-color: #fee2e2;
            color: #991b1b;
            border-color: #fca5a5;
          }
          .toast-notification.info {
            background-color: #dbeafe;
            color: #1e40af;
            border-color: #bfdbfe;
          }
          .toast-notification.warning {
            background-color: #fef3c7;
            color: #92400e;
            border-color: #fde68a;
          }
          @keyframes slideInRight {
            from {
              transform: translateX(400px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `;
        document.head.appendChild(style);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ========== NAVEGACIÓN ==========
let coloniaActual = 'las-lomas-del-sur';
let rolActual = 'admin';

function mostrarLanding() {
    document.getElementById('landingScreen').classList.remove('hidden');
    document.getElementById('registroScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('plataformaInterna').classList.add('hidden');
}

function mostrarRegistro() {
    document.getElementById('landingScreen').classList.add('hidden');
    document.getElementById('registroScreen').classList.remove('hidden');
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('plataformaInterna').classList.add('hidden');
}

function mostrarLogin() {
    actualizarListaColonias();
    document.getElementById('landingScreen').classList.add('hidden');
    document.getElementById('registroScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('plataformaInterna').classList.add('hidden');
}

function actualizarListaColonias() {
    const sel = document.getElementById('loginColonia');
    sel.innerHTML = Object.entries(DB.colonias).map(([key, c]) =>
        `<option value="${key}">${c.nombre} (${c.viviendas} viv.)</option>`).join('');
}

function registrarColonia() {
    const nombre = document.getElementById('regNombre').value.trim();
    const cp = document.getElementById('regCP').value.trim();
    const correo = document.getElementById('regCorreo').value.trim();
    const pass = document.getElementById('regPass').value;
    const pass2 = document.getElementById('regPass2').value;
    const acepta = document.getElementById('regAcepta').checked;
    if (!nombre || !cp || !correo || !pass) { showToastNotification('Complete todos los campos obligatorios.', 'error'); return; }
    if (pass !== pass2) { showToastNotification('Las contraseñas no coinciden.', 'error'); return; }
    if (!acepta) { showToastNotification('Debe aceptar el aviso de privacidad.', 'error'); return; }
    const duplicado = Object.values(DB.colonias).some(c => c.nombre.toLowerCase() === nombre.toLowerCase() && c
        .cp === cp);
    if (duplicado) { showToastNotification('⚠️ Ya existe una colonia registrada con ese nombre y código postal.', 'warning'); return; }
    const key = nombre.toLowerCase().replace(/\s+/g, '-');
    DB.colonias[key] = {
        nombre,
        cp,
        municipio: document.getElementById('regMunicipio').value,
        viviendas: parseInt(document.getElementById('regViv').value) || 100,
        padronCerrado: false,
        fechaCierre: null,
        admins: [{ id: 'a' + Date.now(), nombre: 'Administrador', correo, inicio: new Date().toISOString()
                .split('T')[0], activo: true }],
        convocatorias: [],
        planillas: [],
        problemas: [],
        resultadosEleccion: null,
        resultadosPriorizacion: [],
        seguimiento: [],
        bitacora: [],
        comentarios: []
    };
    guardarDB();
    showToastNotification(`✅ ¡Colonia "${nombre}" registrada exitosamente!\n\nSe envió un enlace de administración a ${correo}.`, 'success');
    document.getElementById('regNombre').value = '';
    document.getElementById('regCP').value = '';
    document.getElementById('regCorreo').value = '';
    document.getElementById('regPass').value = '';
    document.getElementById('regPass2').value = '';
    document.getElementById('regAcepta').checked = false;
    mostrarLanding();
}

function iniciarSesion() {
    const key = document.getElementById('loginColonia').value;
    rolActual = document.getElementById('loginRol').value;
    coloniaActual = key;
    document.getElementById('landingScreen').classList.add('hidden');
    document.getElementById('registroScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('plataformaInterna').classList.remove('hidden');
    const d = DB.colonias[key];
    document.getElementById('nombreColoniaDisplay').textContent = d.nombre;
    document.getElementById('rolDisplay').textContent =
        rolActual === 'admin' ? 'Administrador/a' :
        rolActual === 'vecino' ? 'Vecino/a' : 'Moderador/a';
    document.getElementById('btnRegistrarColonia').style.display = rolActual === 'admin' ? 'inline-block' :
        'none';
    verificarVencimientoAdmin();
    irSeccion('dashboard');
}

function cerrarSesion() {
    document.getElementById('plataformaInterna').classList.add('hidden');
    document.getElementById('dynamicContent').innerHTML = '';
    document.getElementById('btnRegistrarColonia').style.display = 'inline-block';
    mostrarLanding();
}

function irSeccion(s) {
    const d = DB.colonias[coloniaActual];
    const c = document.getElementById('dynamicContent');
    switch (s) {
        case 'dashboard':
            c.innerHTML = rolActual === 'admin' ? dashAdmin(d) : rolActual === 'moderador' ? dashModerador(d) :
                dashVecino(d);
            break;
        case 'padron':
            c.innerHTML = padron(d);
            break;
        case 'convocatorias':
            c.innerHTML = rolActual === 'admin' ? convAdmin(d) : convVecino(d);
            break;
        case 'crear':
            c.innerHTML = crearConv(d);
            break;
        case 'deliberacion':
            c.innerHTML = deliberacion(d);
            break;
        case 'votacion':
            c.innerHTML = votacion(d);
            break;
        case 'resultados':
            c.innerHTML = resultados(d);
            break;
        case 'seguimiento':
            c.innerHTML = seguimiento(d);
            break;
        case 'actas':
            c.innerHTML = actas(d);
            break;
        case 'bitacoras':
            c.innerHTML = bitacoras(d);
            break;
        case 'gestionAdmins':
            c.innerHTML = gestionAdmins(d);
            break;
        case 'renovacionAdmin':
            c.innerHTML = renovacionAdmin(d);
            break;
        default:
            c.innerHTML = dashAdmin(d);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function verificarVencimientoAdmin() {
    const d = DB.colonias[coloniaActual];
    if (!d || !d.admins) return;
    const hoy = new Date();
    d.admins.forEach(admin => {
        if (!admin.activo) return;
        const inicio = new Date(admin.inicio);
        const fin = new Date(inicio);
        fin.setMonth(fin.getMonth() + 6);
        const diffDays = Math.ceil((fin - hoy) / (1000 * 60 * 60 * 24));
        if (diffDays <= 45 && diffDays > 0) {
            if (confirm(
                    `⚠️ El periodo del administrador "${admin.nombre}" vence en ${diffDays} días.\n\n¿Desea iniciar el proceso de renovación?`
                    )) {
                irSeccion('renovacionAdmin');
            }
        } else if (diffDays <= 0) {
            admin.activo = false;
            guardarDB();
            alert(
                `⏰ El periodo de "${admin.nombre}" ha vencido. Ha pasado a ser vecino automáticamente.`);
        }
    });
}

function padron(d) {
    return `
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-semibold text-neutral-800">📋 Padrón Vecinal</h2>
                <div class="mt-2 p-3 rounded-md text-sm ${d.padronCerrado? 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800':'bg-green-50 border-l-4 border-green-500 text-green-800'}"><strong>${d.padronCerrado? '🔒 Padrón Cerrado':'🔓 Padrón Abierto'}</strong> ${d.padronCerrado? 'desde '+d.fechaCierre:'Aún puede modificar registros.'}</div>
                <div class="overflow-x-auto mt-4">
                    <table class="min-w-full text-sm">
                        <thead class="bg-yellow-600 text-white text-left"><tr><th class="px-3 py-2">Folio</th><th class="px-3 py-2">Vivienda</th><th class="px-3 py-2">Representante</th><th class="px-3 py-2">Estatus</th></tr></thead>
                        <tbody>
                            <tr class="border-t"><td class="px-3 py-2">FOL-001</td><td class="px-3 py-2">Casa 1</td><td class="px-3 py-2">María Gómez</td><td class="px-3 py-2"><span class="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Válido</span></td></tr>
                            <tr class="border-t bg-gray-50"><td class="px-3 py-2">FOL-002</td><td class="px-3 py-2">Casa 2</td><td class="px-3 py-2">Carlos Ruiz</td><td class="px-3 py-2"><span class="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Válido</span></td></tr>
                            <tr class="border-t"><td class="px-3 py-2">FOL-003</td><td class="px-3 py-2">Casa 3</td><td class="px-3 py-2">—</td><td class="px-3 py-2"><span class="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Pendiente</span></td></tr>
                            <tr><td colspan="4" class="text-center text-gray-500 py-2">... ${d.viviendas-3} registros adicionales</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-4">
                    <button class="inline-flex items-center px-3 py-1 rounded-md border-2" style="border-color:#e0a800;color:#b88600;background:#fff;text-sm" onclick="showToastNotification('📥 Exportando CSV...', 'info')">📥 Exportar CSV</button>
                    ${!d.padronCerrado?`<button class="ml-2 inline-flex items-center px-3 py-1 rounded-md bg-[#ffc000] text-black text-sm">➕ Agregar</button><button class="ml-2 inline-flex items-center px-3 py-1 rounded-md bg-yellow-500 text-white text-sm" onclick="showToastNotification('🔐 Padrón cerrado.', 'info')">🔒 Cerrar Padrón</button>`:''}
                </div>
            </div>`;
}

function resultados(d) {
    if (!d.resultadosEleccion && d.resultadosPriorizacion.length === 0) return '<div class="card"><h2>📄 Resultados</h2><p style="color:#888;">Aún no hay resultados disponibles.</p></div>';
    return `
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl text-neutral-800 font-semibold">📄 Resultados</h2>
                ${d.resultadosEleccion?`
                <h3 class="mt-4 text-lg font-semibold" style="color:#333">Elección de Mesa Directiva</h3>
                <div class="mt-2 overflow-x-auto">
                    <table class="min-w-full text-sm">
                        ${d.resultadosEleccion.planillas.map(p=>`<tr ${p.g?'class="bg-yellow-50 font-semibold"':''}><td class="px-3 py-2">${p.n}</td><td class="px-3 py-2">${p.v} votos (${p.p}%)</td></tr>`).join('')}
                        <tr><td class="px-3 py-2">Votos nulos</td><td class="px-3 py-2">${d.resultadosEleccion.votosNulos}</td></tr>
                    </table>
                </div>
                <p class="mt-2"><strong>Ganador:</strong> <span>${d.resultadosEleccion.planillas.find(p=>p.g).n}</span></p>
                `:''}
                ${d.resultadosPriorizacion.length>0?`
                <h3 class="mt-4 text-lg font-semibold" style="color:#333">Priorización de Problemas</h3>
                <div class="mt-2 overflow-x-auto">
                    <table class="min-w-full text-sm">
                        ${d.resultadosPriorizacion.map(p=>`<tr ${p.pt===167?'class="bg-yellow-50 font-semibold"':''}><td class="px-3 py-2">${p.op}</td><td class="px-3 py-2">${p.pt} pts</td></tr>`).join('')}
                    </table>
                </div>
                `:''}
            </div>`;
}

function seguimiento(d) {
    return `
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl text-neutral-800 font-semibold">📌 Seguimiento de Acuerdos</h2>
                ${d.seguimiento.length>0?`
                <div class="overflow-x-auto mt-4">
                    <table class="min-w-full text-sm">
                        <thead class="bg-yellow-50"><tr><th class="px-3 py-2">#</th><th class="px-3 py-2">Acuerdo</th><th class="px-3 py-2">Responsable</th><th class="px-3 py-2">Fecha</th><th class="px-3 py-2">Estatus</th>${rolActual==='admin'?'<th class="px-3 py-2">Acción</th>':''}</tr></thead>
                        <tbody>
                        ${d.seguimiento.map((s,i)=>`<tr class="border-t"><td class="px-3 py-2">${i+1}</td><td class="px-3 py-2">${s.acuerdo}</td><td class="px-3 py-2">${s.responsable}</td><td class="px-3 py-2">${s.fecha}</td><td class="px-3 py-2"><span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${s.estatus==='En proceso'?'bg-yellow-100 text-yellow-800':'bg-neutral-100 text-neutral-600'}">${s.estatus}</span></td>${rolActual==='admin'?`<td class="px-3 py-2"><button class="inline-flex items-center px-2 py-1 rounded-md border-2 border-yellow-800 text-yellow-800 text-xs" onclick="alert('Estatus actualizado')">Actualizar</button></td>`:''}</tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="mt-4 w-full bg-neutral-100 rounded-full h-2 overflow-hidden"><div class="h-2" style="background:#ffc000;width:${(d.seguimiento.filter(s=>s.estatus==='En proceso'||s.estatus==='Completado').length/d.seguimiento.length)*100}%;"></div></div>
                `:'<p class="text-gray-500 mt-3">No hay acuerdos registrados.</p>'}
            </div>`;
}

function actas(d) {
    return `
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl text-neutral-800 font-semibold">📄 Actas Públicas</h2>
                ${d.resultadosEleccion?`
                <div class="mt-4 overflow-x-auto">
                    <table class="min-w-full text-sm">
                        <thead class="bg-yellow-600 text-white"><tr><th class="px-3 py-2">Convocatoria</th><th class="px-3 py-2">Fecha</th><th class="px-3 py-2">Hash</th><th class="px-3 py-2">Descargar</th></tr></thead>
                        <tbody>
                            <tr class="border-t"><td class="px-3 py-2">Elección Mesa Directiva</td><td class="px-3 py-2">16/ago/2026</td><td class="px-3 py-2 font-mono">ACTA-A3F2B8C9</td><td class="px-3 py-2"><button class="inline-flex items-center px-3 py-1 rounded-md bg-[#ffc000] text-black text-sm" onclick="showToastNotification('📥 Descargando...', 'info')">PDF</button></td></tr>
                        </tbody>
                    </table>
                </div>
                `:'<p class="text-gray-500 mt-3">No hay actas disponibles.</p>'}
            </div>`;
}

function bitacoras(d) {
    return `
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-semibold" style="color:#ffc000">🔍 Bitácora de Auditoría</h2>
                ${d.bitacora&&d.bitacora.length>0?`
                <div class="mt-4 overflow-x-auto">
                    <table class="min-w-full text-sm">
                        <thead class="bg-gray-100"><tr><th class="px-3 py-2">Evento</th><th class="px-3 py-2">Timestamp</th><th class="px-3 py-2">Hash</th></tr></thead>
                        <tbody>
                            ${d.bitacora.map(b=>`<tr class="border-t"><td class="px-3 py-2">${b.evento}</td><td class="px-3 py-2">${b.ts}</td><td class="px-3 py-2 font-mono">${b.hash}</td></tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <p class="text-sm text-gray-500 mt-3">Folios anonimizados para proteger la secrecía del voto.</p>
                `:'<p class="text-gray-500 mt-3">No hay eventos registrados.</p>'}
            </div>`;
}

function tablaSeguimiento(d) {
    return (d.seguimiento || []).map(s =>
        `<div class="py-2 border-b">${s.acuerdo.substring(0,55)}... <span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${s.estatus==='En proceso'?'bg-green-100 text-green-800':'bg-yellow-100 text-yellow-800'}">${s.estatus}</span></div>`
    ).join('') || '<p class="text-gray-500">Sin acuerdos.</p>';
}