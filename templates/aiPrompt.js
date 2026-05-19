/* ── AUREO · templates/aiPrompt.js ─────────────────────────────
   Builds the prompt string sent to Claude.
   Isolated here so copy/design tweaks never touch generator.js.
─────────────────────────────────────────────────────────────── */

function buildAIPrompt(d, secs) {
  return `Eres el mejor diseñador de invitaciones web premium del mundo. Crea una invitación cinematográfica de lujo.

SISTEMA VISUAL OBLIGATORIO:
- PORTADA (HERO): foto fullscreen con overlay cinematográfico DOBLE. Los NOMBRES deben verse con MÁXIMO IMPACTO — tipografía Cinzel mayúsculas gigante, color champagne (#c8a96e) con glow. Tiene que impactar en el primer segundo. NO usar Cormorant italic pequeño — usar CINZEL GRANDE BOLD. Agrega un logo/marca "AUREO · Invitaciones Digitales" en la esquina superior central pequeño y elegante.
- COUNTDOWN en el hero: debajo de los nombres, formato visual con cajas: [DD] DÍAS [HH] HORAS [MM] MIN [SS] SEG en champagne dorado sobre fondo semitransparente.
- Fecha en el hero: formato "20 · NOVIEMBRE · 2026" elegante y grande.
- Colores: fondos oscuros ricos (#0c0a14, #14111f), highlights champagne potentes (#c8a96e, #e8d49a). Textos en crema (#f8f0e0). Contraste ALTO.
- Tipografías: Cinzel para nombres y títulos impactantes + Cormorant Garamond italic para subtítulos + Montserrat light para texto.
- MUCHO GLOW champagne difuso — halo detrás de los nombres, halo en countdown, halo en sección emocional.
- La foto hero DEBE verse de fondo completo, nombres SOBRE ella con máximo impacto visual.

DATOS:
- Tipo: ${d.tipo}
- Nombres: ${d.names}
- Fecha: ${d.dateLabel}
- Ceremonia: ${d.v1 || '—'} a las ${d.t1} hrs${d.m1 ? ' | Maps: ' + d.m1 : ''}
- Recepción: ${d.v2 || '—'} a las ${d.t2} hrs${d.m2 ? ' | Maps: ' + d.m2 : ''}
- Dress Code: ${d.dress || 'Formal'}
- WhatsApp RSVP: ${d.wa || '5500000000'}
- Mesa: ${d.gl} | Mensaje: ${d.gm}
${d.frase ? '- Frase: ' + d.frase : '- Usar frase emocional predeterminada para ' + d.tipo}
${d.audioName ? '- Canción: ' + d.audioName : ''}

SECCIONES: ${secs}

REGLAS:
1. Hero SIEMPRE fullscreen con foto de fondo + overlay oscuro + NOMBRES GIGANTES en Cinzel + glow champagne. Logo "AUREO" pequeño arriba al centro.
2. Countdown con formato de CAJAS: cada número en su propio box con borde champagne.
3. Galería: reel vertical con scroll-snap-type:y mandatory, cada foto ocupa toda la pantalla.
4. Ubicación: DOS tarjetas separadas — una para Ceremonia con hora y botón Maps, otra para Recepción con hora y botón Maps.
5. Hora de ceremonia y recepción deben aparecer claramente en la sección de detalles Y en la sección de ubicación.
6. Al final, antes del footer, agregar sección de marca: "Creado con ❤️ por AUREO · Invitaciones Digitales · aureo.mx" en estilo elegante con el logo.
7. Footer final: monograma iniciales grande.
8. Fotos: ${d.photos.hero ? 'Hero disponible → usa src exacto __HERO__' : 'placeholder cinematográfico'}. Galería: ${d.photos.gallery.length ? d.photos.gallery.length + ' fotos → __GAL0__ __GAL1__ etc' : 'placeholders oscuros'}. Cierre: ${d.photos.closing ? '→ __CLOSING__' : 'placeholder'}.
${d.audioSrc ? '9. AUDIO: embeber este base64 en tag <audio id="aud" loop preload="auto"><source src="__AUDIO__"></audio> y botón play fijo.' : ''}

Devuelve SOLO HTML completo autocontenido. Sin markdown.`;
}
