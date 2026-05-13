function dashVecino(d) {
    return `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article class="bg-white rounded-[20px] p-0 shadow-glass overflow-hidden border border-neutral-200/60">
                <div class="p-6">
                    <div class="flex flex-col mb-4">
                        <h3 class="text-xl font-bold text-neutral-900 mt-1 leading-tight">${d.nombre}</h3>
                        <p class="text-sm text-neutral-500 leading-relaxed">${d.viviendas} viviendas registradas</p>

                        <div class="mt-2 text-sm text-neutral-700 bg-yellow-100 leading-relaxed p-3">
                            Próxima Convocatoria: <strong>${d.convocatorias.find(c=>c.estado==='Próxima')?.tema||'Aprobación de cuota'}</strong> · ${d.convocatorias.find(c=>c.estado==='Próxima')?.fecha||'30 sep 2026'}
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row items-center justify-between pt-2 border-t border-neutral-100">
                        <div class="w-full sm:w-auto flex gap-2">
                            <button class="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffc000] text-neutral-800 font-semibold text-sm hover:bg-[#ffc000]/80 transition-colors cursor-pointer" onclick="irSeccion('convocatorias')">
                                <span>Ver convocatorias</span>
                            </button>
                        </div>
                    </div>
                </div>
            </article>
            <aside class="w-full shrink-0 space-y-6">
                <div class="bg-white rounded-2xl p-5 shadow-soft">
                    <h3 class="text-xl font-semibold text-neutral-800 mb-4">Seguimiento de propuestas</h3>

                    <div class="space-y-2">
                        ${d.seguimiento&&d.seguimiento.length>0? d.seguimiento.map(s=>`<div class="flex items-center gap-3"><svg class="w-4 h-4 text-[#ffc000]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"/></svg><p class="text-sm text-neutral-700">${s.titulo}</p></div>`).join('') : '<p class="text-sm text-neutral-700">Sin acuerdos pendientes.</p>'}
                    </div>
                </div>
            </aside>
        </div>`;
}

function convVecino(d) {
    return `
        <div class="space-y-4">
            <h2 class="text-xl font-bold text-neutral-900">📢 Convocatorias de ${d.nombre}</h2>
            <div class="space-y-3">
                ${d.convocatorias.length>0?d.convocatorias.map(c=>`
                    <article class="bg-white rounded-[16px] p-4 shadow-soft border border-neutral-100">
                        <div class="flex items-start justify-between">
                            <div>
                                <h3 class="text-md font-semibold">${c.tema}</h3>
                                <p class="text-sm text-neutral-500">📅 ${c.fecha} · ${c.horario} · 📍 ${c.lugar}</p>
                            </div>
                                <span class="ml-4 inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${c.estado==='Finalizada'?'bg-green-50 text-green-800':'bg-blue-100 text-blue-800'}">${c.estado}</span>
                        </div>
                        <div class="mt-3 flex items-center gap-2">
                            <button class="inline-flex items-center px-3 py-2 rounded-full bg-[#ffc000] text-neutral-800 text-sm font-semibold hover:bg-[#ffc000]/80" onclick="irSeccion('deliberacion')">Informarme y deliberar</button>
                            ${c.estado==='Finalizada'?`<button class="inline-flex items-center px-3 py-2 rounded-full border border-neutral-200 text-sm font-medium" onclick="irSeccion('resultados')">Resultados</button>`:''}
                        </div>
                    </article>
                `).join(''):'<p class="text-sm text-neutral-500">No hay convocatorias activas.</p>'}
            </div>
        </div>`;
}

function deliberacion(d) {
    return `
        <div class="space-y-4">
            <h2 class="text-lg font-bold text-neutral-900">💬 Información y Deliberación</h2>
            ${d.planillas&&d.planillas.length>0?`
            <h3 class="text-md font-semibold text-neutral-500">Planillas para Mesa Directiva</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">${d.planillas.map(p=>`
                <article class="bg-white rounded-[12px] p-4 shadow-soft border border-neutral-100 flex flex-col justify-between">
                    <div class="flex items-start gap-3">
                        <div class="flex-1">
                            <h4 class="font-semibold">${p.nombre}</h4>
                            <p class="text-sm text-neutral-600">👥 ${p.integrantes}</p>
                            <p class="text-sm text-neutral-600 mt-2">${p.propuesta}</p>
                        </div>
                        <div class="flex-shrink-0">
                            <div class="w-3 h-10 rounded" style="background:${p.color}"></div>
                        </div>
                    </div>
                </article>
            `).join('')}</div>
            `:'<p class="text-sm text-neutral-500">No hay planillas registradas.</p>'}
            ${d.problemas&&d.problemas.length>0?`
            <h3 class="text-md font-semibold text-neutral-500">Problemas a priorizar</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">${d.problemas.map(pr=>`
                <article class="bg-white rounded-[12px] p-3 border border-neutral-100">
                    <strong class="block">${pr.nombre}</strong>
                    <p class="text-sm text-neutral-600">📎 ${pr.evidencia}</p>
                </article>
            `).join('')}</div>
            `:''}
            <h3 class="text-md font-semibold text-neutral-500">Comentarios de vecinos</h3>
            ${d.comentarios&&d.comentarios.length>0?d.comentarios.filter(co=>co.estado==='Aprobado').map(co=>`
                <article class="bg-neutral-50 p-3 rounded-lg shadow-sm border border-neutral-100">
                    <div class="flex items-center justify-between mb-2">
                        <strong class="text-sm text-neutral-800">${co.folio}</strong>
                        <span class="text-xs text-neutral-400">${co.fecha}</span>
                    </div>
                    <p class="text-sm text-neutral-700">${co.texto}</p>
                </article>
            `).join(''):'<p class="text-sm text-neutral-500">Sin comentarios aún.</p>'}
            <div class="pt-2">
                <button class="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#ffc000] text-black font-semibold text-sm hover:bg-[#ffc000]/80 transition-colors" onclick="irSeccion('votacion')">🗳️ Ir a Votar</button>
            </div>
        </div>`;
}

function votacion(d) {
    return `
        <div class="space-y-4">
            <h2 class="text-lg text-neutral-800 font-bold">🗳️ Urna Digital</h2>
            ${d.planillas&&d.planillas.length>0?`
            <h3 class="text-md font-semibold text-neutral-500">Elección de Mesa Directiva</h3>
                <div class="space-y-3">${d.planillas.map(p=>`
                <article class="flex items-center gap-3 p-3 bg-white rounded-[12px] border border-neutral-100 cursor-pointer voto-option hover:shadow-md hover:border-yellow-300" onclick="selVoto(this)">
                    <input type="radio" name="planilla" class="w-4 h-4"/>
                    <div class="flex-1">
                        <strong>${p.nombre}</strong>
                        <p class="text-sm text-neutral-600">${p.propuesta.substring(0,60)}...</p>
                    </div>
                </article>
            `).join('')}</div>
                <div class="mt-3 flex items-center gap-2">
                <button class="inline-flex items-center px-4 py-2 rounded-full bg-[#ffc000] text-black font-semibold text-sm hover:brightness-95 transition-colors" onclick="emitirVoto()">Emitir Voto</button>
                <div id="votoOK" class="text-green-800 hidden">✅ Voto emitido. Comprobante: <strong>HASH-${Math.random().toString(36).substr(2,10).toUpperCase()}</strong></div>
            </div>
            `:'<p class="text-sm text-neutral-500">No hay planillas para votar.</p>'}
            ${d.problemas&&d.problemas.length>0?`
            <hr class="my-4">
            <h3 class="text-md font-semibold text-neutral-500">Priorización de Problemas</h3>
            <p class="text-sm text-neutral-600">Asigne <strong>2 pts</strong> a la prioridad principal y <strong>1 pt</strong> a la secundaria.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3"> <div>
                <label class="text-sm font-semibold">Prioridad Principal (2 pts)</label>
                <select id="pri1" class="w-full border rounded px-3 py-2">${d.problemas.map(p=>`<option>${p.nombre}</option>`).join('')}</select>
            </div>
            <div>
                <label class="text-sm font-semibold">Prioridad Secundaria (1 pt)</label>
                <select id="pri2" class="w-full border rounded px-3 py-2">${d.problemas.map(p=>`<option>${p.nombre}</option>`).join('')}</select>
            </div></div>
            <div class="mt-3 flex items-center gap-2">
                <button class="inline-flex items-center px-4 py-2 rounded-full bg-[#ffc000] text-black font-semibold text-sm hover:bg-[#ffc000]/80 transition-colors" onclick="emitirPri()">⭐ Emitir Priorización</button>
                <div id="priOK" class="text-green-800 hidden">✅ Priorización emitida.</div>
            </div>
            `:''}
        </div>`;
}

function selVoto(el) {
    document.querySelectorAll('.voto-option').forEach(o => {
        o.classList.remove('selected', 'bg-yellow-50', 'border-yellow-300', 'ring-2', 'ring-yellow-300', 'shadow-md');
        o.querySelector('input')?.removeAttribute('checked');
    });
    el.classList.add('selected', 'bg-yellow-50', 'border-yellow-300', 'ring-2', 'ring-yellow-300', 'shadow-md');
    const input = el.querySelector('input'); if (input) input.checked = true;
}

function emitirVoto() {
    if (!document.querySelector('.voto-option.selected')) { showToastNotification('Seleccione una planilla.', 'error'); return; }
    document.getElementById('votoOK').classList.remove('hidden');
    document.querySelectorAll('.voto-option').forEach(o => { o.style.pointerEvents = 'none'; o.classList.add('opacity-60'); });
}

function emitirPri() {
    if (document.getElementById('pri1').value === document.getElementById('pri2').value) { showToastNotification('Las prioridades deben ser diferentes.', 'error'); return; }
    document.getElementById('priOK').classList.remove('hidden');
}