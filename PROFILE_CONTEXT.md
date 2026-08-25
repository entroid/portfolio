# Contexto de perfil — Hernán Ainsa

> Documento de contexto para acompañar el CV. Describe el portfolio personal
> (concepto, objetivo, secciones, contenido y UX) y lo que ese proyecto dice
> sobre el perfil profesional de Hernán Ainsa.
> Portfolio personal en Next.js · Repo: github.com/entroid ·
> LinkedIn: linkedin.com/in/hainsa · Base: Rosario, Argentina.

---

## 1. Quién es (resumen del perfil)

Perfil **híbrido diseño + desarrollo**: Product Designer / Design Technologist.
Diseña interfaces centradas en el usuario en Figma y después las construye él
mismo con workflows de desarrollo asistidos por IA (React, Next.js).

- **15+ años** en la industria IT.
- **8+ años** liderando UX/UI y product design end-to-end, más decenas de
  proyectos menores.
- **6+ empresas reales** con producto entregado.
- Actualmente abierto a roles full-time o colaboraciones part-time
  seleccionadas.
- Bilingüe ES/EN (todo el sitio y el CV existen en ambos idiomas).

Áreas declaradas: Product Design · UX/UI Design · User Research · Design
Systems · AI-Assisted Development · Prototyping · Cross-functional
Collaboration.

**Lo diferencial:** no es "un diseñador que además toca código" ni "un
front-end con sensibilidad visual". Trabaja el ciclo completo —
research → definición de producto → design system → UI → código funcionando —
y tiene un proceso explícito y documentado de cómo la IA se integra en ese
ciclo sin reemplazar el criterio.

---

## 2. Qué es el proyecto portfolio

Rediseño y reconstrucción del portfolio personal: de un sitio estático en
Webflow a un proyecto propio en **Next.js**, diseñado y desarrollado
íntegramente por él.

**Doble objetivo, deliberado:**

1. **Portfolio efectivo** para una búsqueda laboral de UX/UI Designer,
   Front-End o Design Engineer: que un reclutador entienda rápido quién es,
   qué hizo y cómo contactarlo.
2. **Showcase técnico público en GitHub**: el repositorio en sí es una pieza
   de portfolio — prácticas actuales de React/Next.js, código legible antes
   que código ingenioso, documentación de arquitectura y decisiones,
   Conventional Commits, tests y CI.

**Usuario objetivo del sitio:** reclutadores, hiring managers y equipos de
producto/diseño evaluando el perfil. Visita corta, orientada a evaluar rápido.
Toda la UX está calibrada para eso.

**Restricciones autoimpuestas y sostenidas:** sin backend propio, sin base de
datos, sin CMS, sin auth. El contenido es "contenido como código" (archivos
MDX + metadata validada, leídos en build time) y el formulario de contacto usa
un servicio externo (FormSubmit) con validación en el front. Todo estático,
todo versionado.

---

## 3. Concepto visual y de marca

**Concepto:** minimalismo con acento tech-retrofuturista. Lenguaje visual de
**instrumento / panel de control**: telemetría, coordenadas, escaneo. La
premisa explícita es que _el contenido (los case studies) es siempre el
protagonista — la estética es marco, no relleno_.

- **Paleta:** fondo negro carbón (no negro puro), blanco hueso para titulares,
  gris medio para texto secundario, y un verde lima/ácido saturado (`#9EFF3D`)
  como acento puntual — CTAs, hover, datos técnicos. Nunca como fondo grande.
- **Tipografía:** mono (JetBrains Mono) para eyebrows, labels, datos técnicos
  y titulares; sans (Inter) para prosa. La regla es
  _mono-para-lo-técnico / sans-para-lo-narrativo_.
- **Border-radius cero** en todo el sistema.
- **Cero fotografía decorativa**: el sitio es 100% gráfico y tipográfico. Las
  únicas imágenes reales son las capturas y mockups de producto dentro de los
  case studies.
- **Motivos recurrentes** (2-3 por sección, nunca todos juntos): grid fino,
  crosshairs, etiquetas de datos en mono, reglas de medición, barcode
  decorativo, esfera wireframe como ícono de "espacio / exploración".
- **Jerarquía deliberada:** el lenguaje retrofuturista se concentra en hero,
  navegación y remates de sección. **Dentro de cada case study la interfaz se
  aquieta** — el trabajo real no compite con grids ni crosshairs encima.

El design system fue generado y tokenizado primero (color, tipografía,
espaciado, estados de botón/link) y después implementado como tokens de
Tailwind v4 + CSS variables. Es decir: el mismo método que aplica en trabajo
de cliente, aplicado a su propio sitio.

---

## 4. Secciones del sitio y contenido

Estructura multi-ruta, toda bajo un segmento de idioma (`/en`, `/es`).

### Navegación persistente

Start · Work · AI Workflow · Contact — más foto de perfil, LinkedIn, GitHub,
descarga directa de CV (ES/EN) y selector de idioma. Footer persistente con
email, LinkedIn y WhatsApp en todas las rutas: contactarlo nunca requiere
llegar a una página específica.

### `/` — Home (Hero + About)

- **Hero:** esfera wireframe 3D animada (WebGL) con rotación lenta y parallax
  suave al mouse, estética "señal detectada".
  - Eyebrow: `PRODUCT DESIGNER · DESIGN TECHNOLOGIST`
  - Headline: `DESIGN & BUILD`
  - Subtexto: "From research to shipped product, powered by AI-assisted workflows."
  - CTA: `[ Case Studies & Work ]`
- **About:** breve y directo — "Hey, I'm Hernán." + bio de un párrafo, lista
  de skills clave, y una fila de tres stats (15+ años, 8+ productos end-to-end,
  6+ empresas).

### `/work` — Case Studies & Work

Índice dividido en dos niveles de profundidad, algo que es en sí una decisión
de UX honesta:

- **Featured Case Studies** — proyectos con narrativa completa.
- **Other Work** — formato liviano: imagen ampliada + descripción extendida,
  sin inflar proceso ni resultados.

### `/work/[slug]` — Case study individual

Cada proyecto tiene ruta propia. Estructura de los featured: contexto/problema,
rol, responsabilidades, approach/proceso, decisiones clave de producto, notas
de implementación técnica cuando corresponde, resultados y galería.

Regla de contenido explícita y sostenida: **no se inventan métricas**. Donde
hay números, van marcados como impacto estimado comparando el proceso previo
con el nuevo; donde no hay medición real, los resultados se expresan en
términos cualitativos honestos. Varios case studies aclaran explícitamente
que el alcance fue acotado y se presentan así, sin agregar fases de discovery
que no ocurrieron.

**Proyectos actualmente en el sitio:**

| Proyecto                                          | Rol                                   | De qué se trata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hard Rock — Marketing Planner** (featured)      | Design Technologist                   | App web interna que reemplazó un proceso de campañas basado en Excel + scripts SQL, mantenido por un puñado de "expertos en Excel", por un planner estructurado y automatizado. Ingeniería inversa de la lógica legacy hacia una jerarquía de datos (Plan → Jobs → Campaigns → Offers/Tiers), design system sobre Ant Design con tokens compartidos Figma↔código, y handoff asistido por IA (Figma MCP → Claude Code → React) hacia una branch que los devs revisan y mergean. Impacto estimado: −70% tiempo de creación de campañas, +65% ofertas lanzadas el primer mes, −82% errores reportados. |
| **TopBuild — License Tracker** (featured)         | Lead UX/UI Designer                   | Sistema para centralizar cientos de licencias de construcción en múltiples estados de EE.UU., reemplazando planillas dispersas, sistemas legacy y llamados telefónicos de operaciones de campo. Research con stakeholders y usuarios, personas y journey mapping, benchmark competitivo (Fizzera, Snow License Manager, ServiceNow SAM), priorización de MVP alrededor de visibilidad en tiempo real. Impacto estimado: −70% tiempo de gestión, menos demoras en renovaciones, más acceso para field ops.                                                                                           |
| **OZ — SVM: Strategic Value Model** (featured)    | Lead UX/UI Designer                   | Herramienta de decisión estratégica que reemplazó Excel + PowerPoint desconectados por un modelo visual único para comparar impacto de proyectos (bubble chart por costo, esfuerzo e impacto). Research end-to-end, workshops de discovery, arquitectura de información, 4 roles de usuario definidos desde el inicio, POC acotado a 3 features core. Construido como herramienta interna de OZ y luego escalado como servicio para otros clientes.                                                                                                                                                 |
| **IssuTrax — by OnBoarD** (featured)              | 2nd Lead UX/UI Designer               | Sistema de reporte y seguimiento de incidencias técnicas (HVAC, plomería) a bordo de cruceros. Se sumó a mitad del proyecto para estabilizar el design system antes del lanzamiento del MVP y conducir la iteración post-launch. Auditoría de mockups, style guide y librería de componentes, y un proceso repetible de feedback con la tripulación priorizado por impacto real y no por quién pedía más fuerte.                                                                                                                                                                                    |
| **Groundworks — Property Inspection App** (other) | Lead UX/UI Designer                   | App móvil de inspección de propiedades en campo. Problemas de interacción concretos: funcionamiento 100% offline con sync posterior sin pérdida de datos, formularios dinámicos dependientes, captura de fotos integrada al flujo, y performance en dispositivos gama media/baja bajo restricciones de Xamarin.                                                                                                                                                                                                                                                                                     |
| **Muu — Livestock Marketplace** (other)           | UX/UI Designer                        | Rediseño UX/UI de una app de compraventa de ganado, pensada para gente usándola en el campo y no en un escritorio: flujos más rápidos para publicar lotes y gestionar ofertas, e identidad visual clara y legible en exteriores.                                                                                                                                                                                                                                                                                                                                                                    |
| **Signos Santafesinos** (other)                   | Diseñador y desarrollador (freelance) | Sitio para el gobierno de Santa Fe presentando una trilogía de libros históricos del Bicentenario. Diseñado y codeado a mano de punta a punta bajo restricciones reales: burocracia, reglas estrictas de uso de imágenes (resolución completa, sin retoque), deadline atado al lanzamiento, y un pedido explícito de diseño ultraminimalista para que las imágenes fueran protagonistas.                                                                                                                                                                                                            |
| **Lumen CRM** (other)                             | UX/UI Designer                        | Rediseño acotado de la vista de pipeline de un CRM, reduciendo los clicks necesarios para mover un deal.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

### `/ai-workflow` — AI-Assisted Workflow

La sección más distintiva del sitio, y probablemente la más relevante para
entender el perfil. No es una página de "uso IA": es su proceso de trabajo
documentado.

- **Premisa:** no incorpora IA solo para diseñar y entregar más eficiente —
  construyó un proceso alrededor de ella, y lo sigue refinando.
- **The Real Workflow:** el loop real —
  Prompt → Review → Critique → Iterate → Repeat — con la aclaración de que un
  solo loop puede llevar 15 minutos o varias horas según complejidad.
  Explícitamente honesto sobre **dónde la IA ayuda** (explorar y testear ideas
  rápido, cortar trabajo repetitivo, generar variantes, comprimir semanas en
  días) y **dónde no** (tomar la decisión por el diseñador, entender el gusto,
  ser creativa por sí sola).
- **Tab "Prototyping"** — 7 pasos: Discovery (la etapa más humana: stakeholders,
  usuarios, competencia, sin metodologías rígidas) → Brief funcional y dirección
  visual escritos → Design system y concepto (Claude Design / Figma Make) →
  Plan técnico (stack, arquitectura, build por etapas, en contacto fuerte con el
  equipo técnico para que sea realista y escalable) → Build por checkpoints
  hasta una primera versión funcional, no un mockup → Iterar con validación de
  usuarios o stakeholders → Sincronizar de vuelta a Figma vía MCP o extensión.
- **Tab "Figma to Code"** — 7 pasos: auditoría del archivo de Figma para que
  sea _code-ready_ (tokens como variables, Auto Layout, estados, naming
  parseable) → contexto y convenciones reales del proyecto cargadas en el agente
  → tokens primero → componentes base 1:1 con Figma incluyendo todos los estados
  → ensamblado atómico hacia moléculas, organismos y pantallas → **todo el
  código generado por IA va a una branch aislada y se mergea por pull request
  revisado por el equipo, nunca directo a main** → sync continuo Figma↔código.
- **Cierre:** en cada paso él decide qué avanza y cómo; la IA hace el trabajo
  pesado, no la dirección. Y: quitá las herramientas específicas y lo que queda
  es simplemente buen proceso — brief escrito antes de construir, design system
  como fuente única de verdad, checkpoint de revisión entre etapas. _"Las
  herramientas cambian. La disciplina no."_

### `/contact`

Formulario simple (nombre, email, mensaje) con validación en el front vía
FormSubmit, más links directos a email, LinkedIn y WhatsApp como alternativa
sin formulario, y estados explícitos de éxito/error.

---

## 5. UX y decisiones de experiencia

Lo que el sitio hace, y por qué — más útil que la lista de features:

- **Optimizado para una visita corta y evaluativa.** El home no intenta contar
  todo: hero + about y un CTA claro hacia el trabajo. La estructura pasó
  deliberadamente de "una sola página con anclas" a rutas reales, porque un
  reclutador necesita poder linkear y volver a una sección concreta.
- **Dos niveles de profundidad en el trabajo.** Featured vs. Other Work evita
  el problema clásico de portfolio: inflar proyectos chicos hasta que parezcan
  grandes. Cada proyecto se presenta con el peso que realmente tuvo.
- **Honestidad como criterio de contenido.** Sin métricas inventadas; los
  números están etiquetados como estimados y comparados contra el proceso
  previo. Varios case studies aclaran explícitamente lo que _no_ incluyó el
  alcance.
- **Imágenes intercaladas, no apiladas al final.** Cada captura aparece junto
  al texto que la explica; la galería final es opcional y solo para estados o
  detalles sueltos que no encajan en la narrativa.
- **Microinteracciones pocas y con criterio.** Hover que envuelve el texto en
  corchetes (`work` → `[ work ]`) o subrayado lima que se dibuja de izquierda a
  derecha; transiciones de sección de fade + slide-up corto, sin rebote.
  Evitado explícitamente: animación en cada scroll-tick, efectos superpuestos,
  parallax pesado.
- **Accesibilidad tratada como requisito, no como pasada final.** Contraste
  adecuado (el acento lima se revisó específicamente para texto chico sobre
  fondo oscuro), navegación por teclado, jerarquía semántica de encabezados,
  `alt` real y descriptivo en cada imagen (los alts del repo describen la UI,
  no dicen "screenshot"), y aserciones automáticas de a11y en los tests.
- **`prefers-reduced-motion` respetado globalmente**, con fallback estático
  para la esfera 3D en reduced-motion y en entornos sin WebGL.
- **Mobile-first**, funcional y prolijo en mobile, tablet y desktop.
- **Bilingüe por construcción.** Cada ruta y cada línea de copy existe en ES y
  EN desde el commit que la introduce, no como agregado posterior. Los case
  studies tienen archivos MDX separados por idioma.

---

## 6. Resumen técnico

| Área                | Elección                                                                                                                                                          |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework           | Next.js 16 (App Router, Turbopack), React 19, React Compiler activado                                                                                             |
| Lenguaje            | TypeScript `strict`                                                                                                                                               |
| Estilos             | Tailwind CSS v4 + CSS variables mapeadas a los tokens del design system                                                                                           |
| 3D                  | react-three-fiber + drei + three (esfera wireframe del hero), cargada con `next/dynamic`, code-split, con fallback estático                                       |
| Motion              | Motion (`motion/react`) para transiciones de sección y hover states                                                                                               |
| i18n                | next-intl, routing por segmento `[locale]`, catálogos de mensajes tipados                                                                                         |
| Contenido           | MDX + metadata en TS por proyecto, leído en build time; validación de esquema con **Zod** (un case study malformado rompe el build en vez de shipear markup roto) |
| Formularios         | react-hook-form + resolver de Zod → FormSubmit                                                                                                                    |
| Fuentes             | `next/font/google` (JetBrains Mono + Inter), self-hosted, sin layout shift                                                                                        |
| Testing             | Vitest + React Testing Library + **jest-axe** (tests de composición por ruta y aserciones automáticas de accesibilidad)                                           |
| Calidad             | ESLint (`next/core-web-vitals` + `jsx-a11y`), Prettier, Stylelint, Husky + lint-staged + commitlint (Conventional Commits)                                        |
| CI                  | GitHub Actions: lint → typecheck → test → build en cada PR                                                                                                        |
| Analytics / Hosting | Vercel Analytics / Vercel                                                                                                                                         |
| Package manager     | pnpm                                                                                                                                                              |

**Prácticas visibles en el repo que importan tanto como el stack:**

- Documentación de decisiones antes del código: `docs/PROJECT_BRIEF.md`
  (brief original, fuente de verdad), `ARCHITECTURE.md` (stack **con el porqué
  de cada elección**, y qué se dejó afuera a propósito y por qué),
  `DESIGN_SYSTEM.md` (tokens concretos), `CONTENT_MODEL.md`,
  `IMPLEMENTATION_PLAN.md` (plan por fases con Definition of Done) y
  `CODING_STANDARDS.md`.
- Un `CLAUDE.md` / `AGENTS.md` que define cómo debe operar un agente de IA
  sobre este repo: qué leer, en qué orden, y qué restricciones no puede
  relitigar sin preguntar. Es decir: **el proyecto está diseñado para ser
  trabajado en colaboración con IA, con las barandas puestas.**
- Todo estático y generado en build (`generateStaticParams`), sin estado de
  servidor.
- Criterio declarado: código legible y convencional antes que código ingenioso;
  profundidad de pulido antes que amplitud de features.

---

## 7. Qué señala este proyecto sobre el perfil

Para quien esté evaluando el CV, esto es lo que el portfolio demuestra por
existir, más allá de lo que dice:

1. **El ciclo completo, real.** Brief, design system, arquitectura, contenido,
   código, tests, CI y deploy — hechos por la misma persona, documentados.
2. **Pensamiento de sistema, no de pantalla.** Tokens como fuente única de
   verdad entre Figma y código, tanto en su sitio como en el trabajo de cliente
   (Hard Rock, IssuTrax).
3. **IA integrada con criterio, no como novedad.** Un proceso explícito con
   revisión humana en cada checkpoint, código de IA aislado en branches y
   mergeado por PR revisado — que es exactamente lo que un equipo necesita para
   adoptar esto sin romper su calidad.
4. **Honestidad en la presentación del trabajo.** Sin métricas infladas, sin
   procesos inventados, con el alcance real de cada proyecto declarado.
5. **Trabajo en dominios complejos y poco glamorosos** — licencias de
   construcción, planificación de campañas de casino, inspecciones de
   propiedades offline, incidencias en cruceros, comercialización de ganado.
   Perfil de producto interno / B2B / enterprise, donde el valor está en
   entender reglas de negocio enredadas y ordenarlas.
6. **Comunicación bilingüe y con stakeholders**, en equipos cross-funcionales
   y ceremonias de Scrum, con handoff coordinado con desarrollo.
