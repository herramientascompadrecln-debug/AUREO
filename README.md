# AUREO — Arquitectura del Proyecto

Invitaciones digitales premium · Versión modular

---

## Estructura de archivos

```
aureo/
│
├── index.html                    ← Shell HTML (solo importa, nunca lógica)
│
├── styles/
│   ├── tokens.css                ← Variables CSS (:root) + reset global
│   ├── animations.css            ← @keyframes del generador UI
│   ├── sidebar.css               ← App shell, logo, steps, form scroll
│   ├── fields.css                ← Inputs, chips, toggles, plan cards, botones
│   └── preview.css               ← Panel de vista previa, device frame, upload, toast
│
├── scripts/
│   ├── state.js                  ← Estado global (S) — incluye S.template
│   ├── helpers.js                ← Funciones puras: g(), pad(), getData(), buildTargetDate()
│   ├── toast.js                  ← Sistema de notificaciones (showT)
│   ├── formNav.js                ← Navegación de pasos, chips, toggles, setTemplate()
│   ├── mediaHandlers.js          ← Upload de imágenes y audio → base64
│   ├── preview.js                ← setDev(), showInv(), dlInv()
│   └── generator.js             ← gen() → callAI() → buildFromTemplate() → showInv()
│
├── templates/
│   ├── registry.js               ← TEMPLATE_REGISTRY · getTemplate() · buildFromTemplate()
│   ├── tipoConfig.js             ← Paleta de colores por tipo de evento
│   ├── aiPrompt.js               ← buildAIPrompt(d, secs) → string del prompt
│   ├── localBuilder.js           ← buildHTML(d) → DarkLuxuryWedding (original, intacto)
│   ├── invitationStyles.js       ← buildInvitationCSS({tc,ch,chlt}) → CSS string
│   ├── invitationScripts.js      ← buildInvitationScripts({...}) → JS string
│   │
│   └── themes/                   ← Un archivo por template
│       ├── EditorialMinimal.js   ← buildEditorialMinimal(d) → HTML
│       ├── XVPrincess.js         ← buildXVPrincess(d)        → HTML
│       ├── KidsFantasy.js        ← buildKidsFantasy(d)        → HTML
│       └── CorporateLuxury.js    ← buildCorporateLuxury(d)    → HTML
│
└── components/
    ├── sections-a.js             ← HeroSection · IntroSection · GallerySection · MomentSection
    └── sections-b.js             ← DetailsSection · LocationSection · GiftsSection ·
                                     RSVPSection · ClosingSection · BrandSection · FinalSection
```

---

## Orden de carga de scripts (index.html)

```
state.js          ← S (estado global)
helpers.js        ← g, pad, getData, buildTargetDate
toast.js          ← showT
tipoConfig.js     ← getTipoConfig, TIPO_CONFIG
aiPrompt.js       ← buildAIPrompt
invitationStyles.js ← buildInvitationCSS
invitationScripts.js ← buildInvitationScripts
sections-a.js     ← HeroSection, IntroSection, GallerySection, MomentSection
sections-b.js     ← DetailsSection, LocationSection, GiftsSection, RSVPSection,
                     ClosingSection, BrandSection, FinalSection
localBuilder.js   ← buildHTML  (usa todo lo anterior)
mediaHandlers.js  ← upImg, rThumbs, rmPhoto, audio listener
formNav.js        ← goS, nx, pv, setS, v1, buildSum, tog, selP, setMT
preview.js        ← setDev, showInv, dlInv
generator.js      ← gen, callAI
```

---

## Dónde modificar cada cosa

| Quiero cambiar...                  | Archivo                          |
|------------------------------------|----------------------------------|
| Colores / variables CSS            | `styles/tokens.css`              |
| Animaciones del UI                 | `styles/animations.css`          |
| Paleta por tipo de evento          | `templates/tipoConfig.js`        |
| Prompt enviado a Claude            | `templates/aiPrompt.js`          |
| Diseño de una sección (Hero, etc.) | `components/sections-a/b.js`     |
| CSS de la invitación generada      | `templates/invitationStyles.js`  |
| JS de la invitación generada       | `templates/invitationScripts.js` |
| Lógica de subida de fotos/audio    | `scripts/mediaHandlers.js`       |
| Navegación entre pasos             | `scripts/formNav.js`             |
| Vista previa / descarga            | `scripts/preview.js`             |
| Estado global                      | `scripts/state.js`               |

---

## Despliegue en Netlify

1. Comprime la carpeta `aureo/` completa en un ZIP.
2. Ve a **netlify.com/drop**.
3. Arrastra el ZIP.
4. El sitio queda en línea en segundos.

Para actualizar: vuelve a arrastrar el ZIP.

---

## Notas técnicas

- **Sin frameworks** — vanilla JS + CSS. Sin bundler requerido.
- **Sin servidor** — el generador corre 100% en el navegador.
- **Audio embebido** — el MP3 se convierte a base64 y queda dentro del HTML generado.
- **API key** — la llamada a Claude requiere que el archivo se sirva desde un dominio autorizado en el dashboard de Anthropic.
- **Fallback local** — si la API falla, `buildHTML()` genera la invitación sin red.
