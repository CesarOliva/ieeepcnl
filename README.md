# 🏘️ Mi Colonia Participa

Plataforma digital de participación ciudadana y democracia comunitaria para colonias. Permite a los vecinos participar en convocatorias, emitir votos en elecciones, priorizar problemas comunitarios y mantenerse informados sobre iniciativas locales.

## ✨ Características Principales

### 🔐 Autenticación y Registro
- **Login simplificado**: Usuario y contraseña
- **Registro con validación CURP**: 
  - Valida 18 dígitos exactos
  - Verifica fecha válida en CURP
  - Confirma mayoría de edad (18+ años)
- **Política de privacidad**: Checkbox obligatorio para aceptar tratamiento de datos

### 🗳️ Sistema de Votación
- **Urna digital**: Interfaz intuitiva para emitir votos
- **Voto nulo**: Opción explícita para votos en blanco
- **Countdown en tiempo real**: Muestra tiempo restante para votar
- **Auto-cierre**: Desactiva votación al vencer el plazo

### 📢 Gestión de Convocatorias
- **Creación de convocatorias**: Tema, fecha, horario, lugar
- **Countdown automático**: Temporizador visible en todos lados
- **Estados**: Próxima, Finalizada
- **Notificaciones automáticas**: Correos a vecinos cuando faltan 2 días

### 👥 Paneles de Usuario
- **Panel Vecino**: Resumen de convocatorias próximas, participación
- **Panel Administrador**: Gestión completa de colonias y convocatorias
- **Panel Moderador**: Supervisión de participaciones

### 📊 Reportes y Resultados
- **Resultados de elecciones**: Conteo de votos, votos nulos, distribución por planilla
- **Priorización de problemas**: Ranking ponderado de problemas
- **Actas y bitácora**: Registro completo de eventos
- **Seguimiento de acuerdos**: Control de implementación

### 📧 Notificaciones por Correo
- **Automáticas**: Se envían cada día a las 08:00 AM
- **A todos los vecinos**: Cada miembro de la colonia recibe notificación
- **Cuando faltan 2 días**: Convocatorias próximas a vencer
- **HTML responsivo**: Correos con diseño profesional

## 🚀 Inicio Rápido

### Requisitos Previos
- **Node.js** 16.0 o superior
- **npm** o **yarn**
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Instalación

1. **Clonar repositorio**
```bash
git clone <tu-repositorio>
cd hackatec
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar plantilla
cp .env.local.example .env.local

# Editar con tus credenciales SMTP
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=tu_usuario
SMTP_PASS=tu_contraseña
SMTP_FROM=noreply@tucolonia.local
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en navegador**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
hackatec/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Home page
│   ├── login/page.tsx           # Página de login
│   ├── register/page.tsx        # Página de registro
│   ├── dashboard/page.tsx       # Dashboard principal
│   ├── privacy/page.tsx         # Política de privacidad
│   └── api/
│       └── notifications/
│           └── send/route.ts    # API de notificaciones
│
├── components/                   # Componentes React
│   ├── Header.tsx               # Encabezado
│   ├── Footer.tsx               # Pie de página
│   ├── VecinoPanel.tsx          # Panel del vecino
│   ├── AdminPanel.tsx           # Panel del administrador
│   ├── ModeradorPanel.tsx       # Panel del moderador
│   ├── Votacion.tsx             # Interfaz de votación
│   ├── Convocatorias.tsx        # Listado de convocatorias
│   ├── VecinoConvocatorias.tsx  # Convocatorias para vecino
│   ├── Resultados.tsx           # Resultados de elecciones
│   ├── Actas.tsx                # Actas de sesiones
│   ├── Bitacoras.tsx            # Registro de eventos
│   ├── Seguimiento.tsx          # Seguimiento de acuerdos
│   ├── GestionAdmins.tsx        # Gestión de administradores
│   ├── RenovacionAdmin.tsx      # Renovación de admin
│   ├── Padron.tsx               # Padrón de vecinos
│   ├── CrearConvocatoria.tsx    # Creación de convocatoria
│   ├── Deliberacion.tsx         # Espacio de deliberación
│   ├── Comentarios.tsx          # Sistema de comentarios
│   └── Utilidades/
│       ├── InputModal.tsx       # Modal de entrada
│       ├── ComentarioCard.tsx   # Card de comentario
│       ├── PlanillaCard.tsx     # Card de planilla
│
├── context/                      # React Context
│   └── ColonyContext.tsx        # Estado global de la aplicación
│
├── lib/                         # Utilidades y funciones
│   ├── db.ts                    # Base de datos inicial
│   ├── notifications.ts         # Funciones de notificación
│   ├── cronJobs.ts              # Servicio de cron automático
│   ├── simpleToast.ts           # Utilidad de notificaciones toast
│
├── styles/                      # Estilos CSS
│   ├── globals.css              # Estilos globales
│   └── styles.css               # Estilos generales
│
├── public/                      # Archivos estáticos
│   ├── robots.txt               # SEO robots
│   └── imagenes/                # Imágenes
│
├── next.config.js               # Configuración de Next.js
├── tailwind.config.js           # Configuración de Tailwind CSS
├── postcss.config.js            # Configuración de PostCSS
├── tsconfig.json                # Configuración de TypeScript
├── package.json                 # Dependencias del proyecto
├── .env.local.example           # Plantilla de variables de entorno
├── NOTIFICATIONS.md             # Documentación de notificaciones
└── README.md                    # Este archivo
```

## 🔑 Uso

### Para Vecinos

1. **Registro**
   - Acceder a `/register`
   - Rellenar formulario con datos personales
   - Validar CURP (18 dígitos, edad +18)
   - Aceptar política de privacidad
   - Confirmar registro

2. **Login**
   - Acceder a `/login`
   - Ingresar usuario y contraseña
   - Acceder al dashboard

3. **Participar en Convocatoria**
   - Ver convocatorias en "Próximas convocatorias"
   - Seleccionar planilla o voto nulo
   - Emitir voto (antes de vencer el tiempo)
   - Confirmar participación

4. **Recibir Notificaciones**
   - Automáticamente recibirás correos cuando falten 2 días para una convocatoria
   - Correos HTML con detalles y enlace al dashboard

### Para Administradores

1. **Acceder a Panel**
   - Login con credenciales de admin
   - Dashboard muestra resumen de colonia

2. **Crear Convocatoria**
   - Botón "➕ Nueva Convocatoria"
   - Ingresar: tema, tipo, fecha, horario, lugar, modalidad
   - Método de votación y priorización
   - Guardar y publicar

3. **Enviar Notificaciones Manuales**
   - Botón "📧 Notificar" en panel
   - Notifica a todos los vecinos de inmediato
   - (Las notificaciones automáticas se envían a las 08:00 AM)

4. **Gestionar Admins**
   - Ver lista de administradores activos
   - Renovación de administración
   - Cambio de roles

5. **Ver Resultados**
   - Resultados de elecciones (votos por planilla)
   - Priorización de problemas (ranking de acuerdos)
   - Exportar actas y reportes

### Para Moderadores

- Supervisar participaciones
- Revisar comentarios
- Moderar contenido (si aplica)
- Generar reportes

## 📧 Sistema de Notificaciones Automáticas

### Cómo Funciona
- Se ejecuta **automáticamente cada día a las 08:00 AM**
- Detecta convocatorias con estado `Próxima` y **exactamente 2 días** para vencer
- Envía correo a **TODOS los vecinos** y administradores de esa colonia
- Correo incluye: tema, fecha, horario, lugar y enlace a la plataforma

### Configuración

Ver archivo [NOTIFICATIONS.md](NOTIFICATIONS.md) para:
- Cambiar credenciales SMTP
- Ajustar horario de ejecución
- Usar diferente proveedor de email
- Testing con Mailtrap

### Cronograma (Editable)

Por defecto, las notificaciones se envían a las **08:00 AM**.

Para cambiar, edita `lib/cronJobs.ts`:
```typescript
// 09:00 AM
cron.schedule('0 9 * * *', async () => { ... })

// Cada 30 minutos
cron.schedule('*/30 * * * *', async () => { ... })

// Cada hora
cron.schedule('0 * * * *', async () => { ... })
```

## 🔐 Seguridad

- ✅ **Validación CURP**: 18 dígitos, fecha válida, edad mínima
- ✅ **Hash de contraseña**: Almacenadas de forma segura
- ✅ **Política de privacidad**: Consentimiento obligatorio
- ✅ **localStorage**: Datos locales, sin servidor central
- ✅ **HTTPS**: Recomendado en producción
- ⚠️ **Nota**: Para producción, implementar base de datos real

## 🛠️ Desarrollo

### Scripts Disponibles

```bash
# Desarrollo (hot reload)
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

### Tecnologías Usadas

| Tech | Versión | Propósito |
|------|---------|-----------|
| **Next.js** | 13.4.10 | Framework React con SSR |
| **React** | 18.2.0 | Interfaz de usuario |
| **TypeScript** | 5.9.3 | Type safety |
| **Tailwind CSS** | 3.4.7 | Estilos utility-first |
| **Sonner** | 2.0.7 | Notificaciones toast |
| **Lucide React** | 1.14.0 | Iconografía |
| **Nodemailer** | 8.0.7 | Envío de emails |
| **node-cron** | 4.2.1 | Tareas programadas |

### Estructura de Datos

#### Colonia
```typescript
{
  nombre: string
  cp: string
  municipio: string
  viviendas: number
  padronCerrado: boolean
  admins: Admin[]
  vecinos: Vecino[]
  convocatorias: Convocatoria[]
  planillas: Planilla[]
  resultadosEleccion: ResultadosEleccion
  // ... más campos
}
```

#### Vecino
```typescript
{
  id: string
  nombre: string
  usuario: string
  correo: string
  telefono: string
}
```

#### Convocatoria
```typescript
{
  id: string
  tema: string
  tipo: string
  fecha: string (YYYY-MM-DD)
  horario: string (HH:MM - HH:MM)
  lugar: string
  modalidad: string
  estado: 'Próxima' | 'Finalizada'
  metodoVotacion: string
  metodoPriorizacion?: string
}
```

## 🌐 Despliegue

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t mi-colonia-participa .
docker run -p 3000:3000 mi-colonia-participa
```

### Variables de Entorno en Producción

Configura en tu plataforma:
```
SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=...
```

## 📝 Licencia

Este proyecto es de código abierto bajo licencia MIT.

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar problemas o sugerencias:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo

## 🎯 Roadmap

- [ ] Base de datos real (PostgreSQL, MongoDB)
- [ ] Autenticación OAuth (Google, Microsoft)
- [ ] App móvil (React Native)
- [ ] Notificaciones push (PWA)
- [ ] Dashboard de analytics
- [ ] Sistema de firma digital
- [ ] Integración con sistemas municipales
- [ ] Soporte multiidioma
- [ ] Accesibilidad WCAG 2.1

## 📚 Documentación Adicional

- [NOTIFICATIONS.md](NOTIFICATIONS.md) - Sistema de notificaciones por correo

---

**Mi Colonia Participa** - Empoderando comunidades a través de la democracia digital 🏘️✨

Última actualización: May 13, 2026
