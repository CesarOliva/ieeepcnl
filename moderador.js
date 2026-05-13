function dashModerador(d) {
    return `
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 class="text-xl font-semibold text-neutral-900">🔧 Panel de Moderación</h2>
                    <p class="mt-1 text-sm text-neutral-700">Gestiona administradores de <strong class="text-neutral-900">${d.nombre}</strong></p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-4">
                    <div class="text-center p-4 bg-gray-50 rounded border"><div class="text-2xl font-bold" style="color:#ffc000">${d.admins.length}</div><div class="text-sm text-gray-600">Administradores</div></div>
                    <div class="text-center p-4 bg-gray-50 rounded border"><div class="text-2xl font-bold" style="color:#ffc000">${d.admins.filter(a=>a.activo).length}</div><div class="text-sm text-gray-600">Activos</div></div>
                </div>
                <div class="flex gap-3">
                    <button class="inline-flex items-center px-4 py-2 rounded-md font-semibold text-sm bg-[#ffc000] text-black shadow-sm hover:bg-[#ffc000]/80" onclick="irSeccion('gestionAdmins')">Gestionar Administradores</button>
                    <button class="inline-flex items-center px-4 py-2 rounded-md font-semibold text-sm bg-[#ffc000] text-black hover:bg-[#ffc000]/80 ml-2" onclick="irSeccion('renovacionAdmin')">Renovación de Periodo</button>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                <h3 class="text-lg font-semibold text-neutral-900">📊 Estado de la colonia</h3>
                <p class="mt-2 text-sm text-gray-700">Viviendas: <strong>${d.viviendas}</strong> · Convocatorias: <strong>${d.convocatorias.length}</strong></p>
            </div>`;
}

function gestionAdmins(d) {
    return `
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex flex-col md:flex-row items-center justify-between mb-4">
                    <h2 class="w-full md:w-auto text-lg font-semibold text-neutral-900">👥 Administradores — ${d.nombre}</h2>
                    <div class="w-full md:w-auto flex items-center gap-2 mt-2 md:mt-0">
                        <button class="inline-flex items-center px-3 py-1 rounded-md bg-[#ffc000] hover:bg-[#ffc000]/80 text-black text-sm font-semibold" onclick="nuevoAdmin()">Nuevo</button>
                        <button class="inline-flex items-center px-3 py-1 rounded-md bg-[#ffc000] hover:bg-[#ffc000]/80 text-black text-sm font-semibold" onclick="irSeccion('renovacionAdmin')">Renovación</button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full text-sm">
                        <thead class="bg-yellow-50 text-neutral-700"><tr><th class="px-3 py-2 text-left">ID</th><th class="px-3 py-2 text-left">Nombre</th><th class="px-3 py-2 text-left">Correo</th><th class="px-3 py-2 text-left">Inicio</th><th class="px-3 py-2 text-left">Vence</th><th class="px-3 py-2 text-left">Activo</th></tr></thead>
                        <tbody>
                            ${d.admins.map(a=>{const fin=new Date(a.inicio);fin.setMonth(fin.getMonth()+6);return`<tr class="border-t"><td class="px-3 py-2">${a.id}</td><td class="px-3 py-2">${a.nombre}</td><td class="px-3 py-2">${a.correo}</td><td class="px-3 py-2">${a.inicio}</td><td class="px-3 py-2">${fin.toISOString().split('T')[0]}</td><td class="px-3 py-2"><span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${a.activo?'bg-yellow-100 text-yellow-800':'bg-neutral-100 text-neutral-600'}">${a.activo?'Sí':'No'}</span></td></tr>`;}).join('')}
                        </tbody>
                    </table>
                </div>
            </div>`;
}

function nuevoAdmin() {
    const nombre = prompt('Nombre del nuevo administrador:');
    if (!nombre) return;
    const correo = prompt('Correo electrónico:');
    if (!correo) return;
    DB.colonias[coloniaActual].admins.push({
        id: 'a' + Date.now(),
        nombre,
        correo,
        inicio: new Date().toISOString().split('T')[0],
        activo: true
    });
    guardarDB();
    showToastNotification('✅ Nuevo administrador creado.', 'success');
    irSeccion('gestionAdmins');
}

function renovacionAdmin(d) {
    const adminActivo = d.admins.find(a => a.activo);
    if (!adminActivo) return `
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-neutral-900">🔄 Renovación de Administrador</h2>
            <p class="mt-2 text-sm text-neutral-600">No hay administrador activo actualmente. Use la gestión de administradores para crear uno.</p>
            <div class="mt-4">
                <button class="inline-flex items-center px-3 py-1 rounded-md bg-[#ffc000] text-black text-sm font-semibold" onclick="irSeccion('gestionAdmins')">Ir a gestión</button>
            </div>
        </div>`;
    const fin = new Date(adminActivo.inicio);
    fin.setMonth(fin.getMonth() + 6);
    const hoy = new Date();
    const dias = Math.ceil((fin - hoy) / (1000 * 60 * 60 * 24));
    return `
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-semibold text-neutral-900">🔄 Renovación del Administrador</h2>
                <div class="mt-3">
                    <p class="text-sm"><strong>Administrador actual:</strong> <span class="text-neutral-900">${adminActivo.nombre}</span></p>
                    <p class="text-sm"><strong>Inicio del periodo:</strong> ${adminActivo.inicio}</p>
                    <p class="text-sm"><strong>Vencimiento:</strong> ${fin.toISOString().split('T')[0]} <span class="ml-2 text-sm ${dias>0?'text-neutral-600':'text-red-600'}">(${dias>0?`en ${dias} días`:'VENCIDO'})</span></p>
                </div>
                <div class="mt-4">
                    <div class="p-3 rounded-md ${dias<=45? 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800':'bg-neutral-50 border-l-4 border-neutral-200 text-neutral-700'}">${dias<=45? '⚠️ El periodo está próximo a vencer.' : '✅ El periodo aún está vigente.'}</div>
                </div>
                <h3 class="mt-4 text-sm font-semibold">Consulta vecinal: ¿Desea mantener al administrador actual?</h3>
                <div class="mt-3 flex items-center gap-2">
                    <button class="inline-flex items-center px-4 py-2 rounded-md bg-[#ffc000] hover:bg-[#ffc000]/80 text-black font-semibold text-sm" onclick="votarRenovacion('mantener')">Mantener a ${adminActivo.nombre}</button>
                    <button class="inline-flex items-center px-4 py-2 rounded-md bg-[#ffc000] hover:bg-[#ffc000]/80 text-black font-semibold text-sm" onclick="votarRenovacion('cambiar')">Postular nuevo administrador</button>
                </div>
                <div id="resultadoRenovacion" class="mt-4"></div>
            </div>`;
}

function votarRenovacion(opcion) {
    const d = DB.colonias[coloniaActual];
    const admin = d.admins.find(a => a.activo);
    if (!admin) return;
    if (opcion === 'mantener') {
        admin.inicio = new Date().toISOString().split('T')[0];
        guardarDB();
        document.getElementById('resultadoRenovacion').innerHTML =
            '<div class="alert alert-success">✅ Administrador renovado por otros 6 meses.</div>';
    } else {
        const nombre = prompt('Nombre del nuevo administrador:');
        if (!nombre) return;
        const correo = prompt('Correo electrónico del nuevo administrador:');
        if (!correo) return;
        admin.activo = false;
        d.admins.push({ id: 'a' + Date.now(), nombre, correo, inicio: new Date().toISOString().split('T')[0],
            activo: true });
        guardarDB();
        document.getElementById('resultadoRenovacion').innerHTML =
            `<div class="alert alert-success">✅ Nuevo administrador "${nombre}" asignado. Periodo reiniciado.</div>`;
    }
}
