# Project Brief (source of truth)

> Verbatim copy of the brief provided by Hernán on 2026-07-23. This is the
> canonical reference for design intent and functional scope. Every other
> document in `docs/` is a derived interpretation of this brief — if something
> here conflicts with another doc, **this file wins** unless a decision below
> explicitly supersedes it (see "Decisions layered on top of this brief").

Companion asset: Design System + hero concept generated in Claude Design —
`https://claude.ai/design/p/842ae89f-7108-4fa6-a9a9-84e15a5a92b3?file=Portfolio+Hero.dc.html`.
Exact tokens (color/spacing/typography/border-radius) were pulled directly
from that file on 2026-07-23 and are captured in
[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — that doc supersedes the
approximate values in the "Paleta"/"Tipografía" text below wherever they
differ (notably: accent is `#9EFF3D` not `#D4FF00`, and the system uses zero
border-radius throughout, which the text brief didn't mention at all).

---

## Parte 1 — Brief de Estilo

**Concepto:** Minimalista con acento tech-retrofuturista, lenguaje visual de
instrumento/panel de control (telemetría, coordenadas, escaneo), sin caer en
maximalismo. El contenido (case studies) es siempre el protagonista — la
estética es marco, no relleno.

**Paleta:**

- Fondo: negro carbón, no negro puro (`#0A0A0C` aprox.)
- Neutros: blanco hueso para titulares (`#F2F2F0`), gris medio para texto
  secundario/labels (`#8C8C88`)
- Grid: líneas blancas al 6-8% de opacidad
- Acento: verde lima/ácido saturado (rango `#C6FF3D`–`#D4FF00`), uso puntual —
  CTAs, hover states, datos técnicos destacados, nunca como color de fondo
  grande
- Ojo con contraste/accesibilidad al usar el verde lima sobre fondo oscuro en
  texto pequeño

**Tipografía:**

- Mono para eyebrows, labels, coordenadas, datos técnicos (JetBrains Mono o
  Space Mono)
- Titulares: misma mono en peso bold/heavy
- Cuerpo de texto: sans limpio (Inter) para descripciones de case studies

**Motivos recurrentes** (2-3 por sección, nunca todos juntos): grid fino,
crosshairs, etiquetas de datos en mono (coordenadas, timestamps, códigos
numéricos), reglas de medición, barcode decorativo, esfera wireframe como
ícono recurrente de "espacio/exploración".

**Fotografía:** ninguna — 100% gráfico/tipográfico. Las únicas imágenes reales
del sitio son las capturas/mockups de producto en los case studies.

**Grano/textura:** sutil, solo en hero, footer y títulos principales.

**Hero:** esfera wireframe animada (rotación lenta continua + parallax sutil
al mouse) con etiquetas de datos técnicos alrededor, estilo "señal detectada".

- Eyebrow: "UX/UI DESIGN · UI DEVELOPMENT"
- Headline: "DESIGN & BUILD"
- Subtexto: "Where design and code actually meet."
- CTA: "Case Studies & Work"

**Jerarquía:** el lenguaje retrofuturista se concentra en hero, navegación y
remates de sección. Dentro de cada case study, la interfaz se aquieta — el
trabajo real no compite con grids ni crosshairs encima.

**Microinteracciones** (pocas, con criterio):

- Hover en botones/nav: texto se envuelve en corchetes (`work` → `[ work ]`) o
  subrayado en verde lima que se dibuja de izquierda a derecha
- Esfera del hero: reacciona al mouse (parallax leve) además de su rotación
  idle
- Transiciones de sección al hacer scroll: fade + slide-up corto, sin rebote
- Aplicar también en hover/focus de tarjetas de proyecto y del formulario de
  contacto
- Evitar: animaciones en cada scroll-tick, múltiples efectos superpuestos,
  parallax pesado

**Referencias visuales usadas:**

1. "The Signal" (radio telescope) — grid, crosshairs, reglas de medición,
   barcode, mono espaciada
2. "Adaptive Construction Intelligence" — etiquetas de datos/bounding boxes
   como decoración
3. Menú terminal retro — botones entre corchetes, estética de terminal oscuro
4. "Outer" — ícono de esfera wireframe, tipografía condensada apilada
5. "Graphic Design Trends 2026" — bloques de color en intersecciones de grid
   (referencia menor)
6. "Marte É Aqui" — glow/orbe difuminado de fondo, marco geométrico fino

---

## Parte 2 — Documento de Funcionalidad

### 1. Resumen del proyecto

Rediseño y reconstrucción del portfolio personal, de un sitio estático en
Webflow a un proyecto propio en Next.js. Doble objetivo: (a) mostrar mejor el
perfil híbrido diseño+desarrollo, y (b) servir como proyecto de práctica real
de React/Next.js + librerías actuales para consolidar esa parte técnica.

### 2. Tipo y objetivo del producto

Portfolio personal / sitio de una sola persona. Objetivo: dar visibilidad al
perfil profesional y al trabajo realizado, y facilitar el contacto directo de
reclutadores o equipos interesados.

### 3. Usuario objetivo

Reclutadores, hiring managers y equipos de producto/diseño evaluando el
perfil para una posición de UX/UI Designer, Front-End o Design Engineer.
Visita corta, orientada a evaluar rápido: quién sos, qué hiciste, cómo
contactarte.

### 4. Principios de diseño

Ver Parte 1 de este documento y el Design System generado en Claude Design
(usarlo como base de tokens: color, tipografía, espaciado, estados de
botón/link).

### 5. Requisitos no funcionales

- Responsive: mobile-first, funcional y prolijo en mobile, tablet y desktop.
- Accesibilidad: contraste adecuado, navegación por teclado, atributos alt en
  imágenes, estructura semántica de encabezados.

### 6. Estructura de secciones

- **Navbar:** foto de perfil chica, links a LinkedIn, GitHub, CV (descarga
  directa), selector de idioma ES/EN.
- **Hero:** fuerte y directo — headline, subtexto, CTA a la sección de
  trabajo (ver Parte 1).
- **About:** breve, conciso.
  - Título: "Hey, I'm Hernán."
  - Párrafo: "Half designer, half developer. I design interfaces in Figma,
    then build them myself. Been doing this for 15+ years, based in Rosario,
    Argentina, and currently looking to join a full-time team."
  - Puede incluir mini-lista de skills clave.
- **Trabajo:**
  - Featured Case Studies (2-3 proyectos): tarjeta con imagen de portada tipo
    collage (2-4 pantallas clave, con o sin marco de dispositivo), título,
    una línea de resumen, link a página propia `/work/[slug]`.
  - Otros trabajos: también con página propia `/work/[slug]`, pero de menor
    profundidad — imagen ampliada + descripción extendida, sin proceso ni
    resultados detallados.
- **Contacto:** formulario simple (nombre, email, mensaje) vía FormSubmit a
  email personal, con validación en el front-end — sin backend propio. Más
  links directos (WhatsApp, email, LinkedIn) como alternativa sin formulario.

### 7. Detalle de proyectos — página dedicada

Cada Featured Case Study vive en su propia ruta. Contenido sugerido:

- Contexto/problema
- Rol
- Proceso (breve, sin inflar)
- Decisiones clave de diseño
- Notas de implementación técnica si corresponde
- Resultados obtenidos — solo en términos cualitativos honestos si no hay
  métricas reales medidas; no inventar números.

Estructura de imágenes: imagen de portada tipo collage al inicio (estilo hero
de la página); dentro del cuerpo, capturas individuales intercaladas junto al
texto que las explica, no agrupadas al final; galería final opcional solo
para estados/detalles sueltos que no encajen en la narrativa principal.

Los "Otros trabajos" usan formato liviano: imagen ampliada + descripción
extendida, sin secciones de proceso/resultados.

### 8. Funcionalidad de Backend

No hay backend propio en este proyecto. El formulario de contacto usa
FormSubmit (servicio externo) con validación en el front-end. La gestión de
contenido de proyectos es "contenido como código" — un archivo JSON o MDX por
proyecto, leído en build time, sin CMS ni panel de administración.

### 9. Selector de idioma

ES/EN con contenido estructurado por idioma (objeto de traducciones o
archivos separados por locale). `next-intl` como opción liviana si se
prefiere algo más estructurado desde el arranque.

### 10. Fuera de alcance para esta versión

- Panel de administración / CMS propio
- Blog o sección de contenido recurrente
- Analytics propio más allá de algo básico (Vercel Analytics o Plausible)
- Modo claro/oscuro alternable
- Autenticación de cualquier tipo
- Backend propio (cubierto por FormSubmit + contenido estático)

---

## Decisions layered on top of this brief

These were resolved with Hernán on 2026-07-23 and take precedence over the
open options mentioned in Parte 2 above (see [ARCHITECTURE.md](./ARCHITECTURE.md)
for full rationale):

| Open question in brief                                       | Decision                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------- |
| Styling approach (not specified)                             | Tailwind CSS v4 + CSS variables for tokens                    |
| Hero sphere implementation (not specified)                   | react-three-fiber (WebGL/Three.js)                            |
| JSON _or_ MDX per project (Sección 8 left both options open) | JSON metadata + MDX body, per locale                          |
| Testing/CI rigor (not specified)                             | Standard tier: unit/component tests + basic CI (no e2e in v1) |

### Structural revision — 2026-07-24

Hernán requested this change directly (not implied by the brief text above),
before any of Phase 1+ was built:

- **Site structure moves from single-page anchors to separate routes.**
  §6's section list ("Navbar, Hero, About, Trabajo, Contacto") was originally
  interpreted as one continuously-scrolling home page with in-page anchor
  navigation between them (that's what earlier drafts of ARCHITECTURE.md and
  IMPLEMENTATION_PLAN.md assumed, even though §6 itself never explicitly
  mandated single-page). This is now explicitly superseded: `/` carries only
  Hero + About; Work and Contact each get their own route. Full routing
  table is in [ARCHITECTURE.md](./ARCHITECTURE.md#routes).
- **New page added, beyond the brief's original scope: `/ai-workflow`.**
  A page describing Hernán's AI-assisted design/build process. Full content
  spec lives in [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md#phase-7--ai-workflow-page)
  Phase 7. Nav order across the whole site: **Start, Work, AI Workflow,
  Contact.**
- **`/ai-workflow` ships bilingual (EN/ES) like every other route** — both
  tabs ("Prototyping" and "Figma to Code") are fully translated via the
  `aiWorkflow.*` i18n message namespace. An earlier draft of this doc
  carved out `/ai-workflow` as English-only; that carve-out has been
  superseded now that both tabs are translated.
- **Footer contact links (email, LinkedIn, WhatsApp) are persistent across
  every route**, not gated behind `/contact` — the fastest way to reach out
  shouldn't require navigating to a specific page.
