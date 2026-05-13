function dashAdmin(d) {
    return `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 class="text-xl font-semibold text-neutral-800">⚙️ Panel de Administración</h2>
                    <p class="mt-2 text-sm text-gray-700"><strong>${d.nombre}</strong> · ${d.viviendas} viviendas</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-4">
                        <div class="text-center p-4 bg-gray-50 rounded border"><div class="text-2xl font-bold" style="color:#ffc000">${d.viviendas}</div><div class="text-sm text-gray-600">Viviendas</div></div>
                        <div class="text-center p-4 bg-gray-50 rounded border"><div class="text-2xl font-bold" style="color:#ffc000">${d.convocatorias.length}</div><div class="text-sm text-gray-600">Convocatorias</div></div>
                        <div class="text-center p-4 bg-gray-50 rounded border"><div class="text-2xl font-bold" style="color:#ffc000">${d.admins.filter(a=>a.activo).length}</div><div class="text-sm text-gray-600">Admins activos</div></div>
                    </div>
                    <div class="flex gap-3">
                        <button class="inline-flex items-center px-4 py-2 rounded-md font-semibold text-sm bg-[#ffc000] hover:bg-[#ffc000]/80 text-black" onclick="irSeccion('crear')">Nueva Convocatoria</button>
                        <button class="inline-flex items-center px-4 py-2 rounded-md border-2" style="border-color:#e0a800;color:#b88600;margin-left:0.5rem;" onclick="irSeccion('padron')">📋 Padrón</button>
                        <button class="inline-flex items-center px-4 py-2 rounded-md border-2" style="border-color:#e0a800;color:#b88600;margin-left:0.5rem;" onclick="irSeccion('resultados')">📄 Resultados</button>
                    </div>
                </div>
                <aside class="w-full shrink-0 space-y-6">
                    <div class="bg-white rounded-2xl p-5 shadow-soft">
                        <h3 class="text-xl font-semibold text-neutral-800 mb-4">Seguimiento de acuerdos</h3>

                        <div class="space-y-2">
                            ${d.seguimiento&&d.seguimiento.length>0? d.seguimiento.map(s=>`<div class="flex items-center gap-3"><svg class="w-4 h-4 text-[#ffc000]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"/></svg><p class="text-sm text-neutral-700">${s.titulo}</p></div>`).join('') : '<p class="text-sm text-neutral-700">Sin acuerdos pendientes.</p>'}
                        </div>
                    </div>
                </aside>
            </div>`;
}

function convAdmin(d) {
    return `
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-semibold text-neutral-800">📢 Convocatorias de ${d.nombre}</h2>
                <div class="mt-4">
                    <button class="inline-flex items-center px-4 py-2 rounded-md font-semibold text-sm bg-[#ffc000] text-black" onclick="irSeccion('crear')">➕ Nueva Convocatoria</button>
                </div>
                <div class="mt-4 space-y-3">
                    ${d.convocatorias.length>0?d.convocatorias.map(c=>`<div class="border rounded p-4 bg-white"><strong>${c.tema}</strong> <span class="ml-2 inline-block px-2 py-1 rounded-full text-xs font-semibold ${c.estado==='Finalizada'?'bg-yellow-50 text-yellow-800':'bg-green-100 text-green-800'}">${c.estado}</span><br class="hidden sm:block">📅 ${c.fecha} · ${c.horario} · 📍 ${c.lugar} · ${c.modalidad}<br>${c.metodoVotacion||''}<br>${c.estado==='Finalizada'?`<button class="mt-2 inline-flex items-center px-3 py-1 rounded-md border-2" style="border-color:#e0a800;color:#b88600" onclick="irSeccion('resultados')">Ver Resultados</button>`:'<button class="mt-2 inline-flex items-center px-3 py-1 rounded-md border-2" style="border-color:#e0a800;color:#b88600">Editar</button>'}</div>`).join(''):'<p class="text-gray-500">No hay convocatorias aún. Cree la primera.</p>'}
                </div>
            </div>`;
}

function crearConv(d) {
    return `
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-semibold" style="color:#ffc000">➕ Nueva Convocatoria</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div class="flex flex-col"><label class="font-semibold text-sm mb-1">Tema</label><input id="temaConv" class="border rounded px-3 py-2" value="Elección de Mesa Directiva"></div>
                    <div class="flex flex-col"><label class="font-semibold text-sm mb-1">Tipo</label><select id="tipoConv" class="border rounded px-3 py-2"><option>Elección</option><option>Priorización</option><option>Consulta</option><option>Aprobación de cuota</option></select></div>
                    <div class="flex flex-col"><label class="font-semibold text-sm mb-1">Fecha</label><input type="date" id="fechaConv" class="border rounded px-3 py-2" value="2026-09-15"></div>
                    <div class="flex flex-col"><label class="font-semibold text-sm mb-1">Horario</label><input id="horarioConv" class="border rounded px-3 py-2" value="9:00 - 14:00"></div>
                    <div class="flex flex-col"><label class="font-semibold text-sm mb-1">Lugar</label><input id="lugarConv" class="border rounded px-3 py-2" value="Palapa del parque central"></div>
                    <div class="flex flex-col"><label class="font-semibold text-sm mb-1">Modalidad</label><select id="modalidadConv" class="border rounded px-3 py-2"><option>Presencial</option><option>Híbrida</option><option>Digital</option></select></div>
                </div>
                <div class="mt-4"><label class="font-semibold text-sm mb-1">Reglas</label><textarea id="reglasConv" class="w-full border rounded px-3 py-2">Un voto por vivienda registrada. Voto secreto. Mayoría simple gana.</textarea></div>
                <div class="mt-4 flex items-center gap-3"><button class="inline-flex items-center px-4 py-2 rounded-md font-semibold text-sm bg-[#ffc000] text-black" onclick="crearConvocatoria()">📢 Publicar Convocatoria</button>
                <div class="w-24 h-24 bg-gray-100 border rounded flex items-center justify-center">QR</div><small class="text-sm text-gray-500">Código QR de acceso</small></div>
            </div>`;
}

function crearConvocatoria() {
    const tema = document.getElementById('temaConv').value.trim();
    const fecha = document.getElementById('fechaConv').value;
    if (!tema || !fecha) { showSimpleToast('Complete tema y fecha.', 'error'); return; }
    DB.colonias[coloniaActual].convocatorias.push({
        id: 'CONV-' + Date.now(),
        tema,
        tipo: document.getElementById('tipoConv').value,
        fecha,
        horario: document.getElementById('horarioConv').value,
        lugar: document.getElementById('lugarConv').value,
        modalidad: document.getElementById('modalidadConv').value,
        estado: 'Próxima',
        metodoVotacion: document.getElementById('reglasConv').value.substring(0, 60)
    });
    guardarDB();
    showSimpleToast('✅ Convocatoria publicada. Se generó enlace y código QR.', 'success');
    irSeccion('convocatorias');
}
