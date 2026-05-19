/* ── AUREO · generator.js ───────────────────────────────────────
   Orchestrates AI call → fallback local build → preview render.
   Depends on: state.js · helpers.js · preview.js · toast.js
               templates/aiPrompt.js · templates/localBuilder.js
─────────────────────────────────────────────────────────────── */

async function gen() {
  const btn = g('gbtn');
  const ovl = g('genovl');
  const d   = getData();

  btn.disabled = true;
  ovl.classList.add('on');

  try {
    const html = await callAI(d);
    S.html = html;
    showInv(html);
    g('dlbtn').classList.add('on');
    showT('¡Invitación creada! ✦', 'ok');
  } catch (err) {
    console.error('[AUREO] AI generation failed, using local builder:', err);
    const html = buildFromTemplate(d);   // registry.js dispatches to active template
    S.html = html;
    showInv(html);
    g('dlbtn').classList.add('on');
    showT('Invitación generada ✦', 'ok');
  } finally {
    ovl.classList.remove('on');
    btn.disabled = false;
  }
}

/* ── Claude API call ── */
async function callAI(d) {
  const secs = Object.entries(d.sec).filter(([, v]) => v).map(([k]) => k).join(', ');
  const prompt = buildAIPrompt(d, secs);   // defined in templates/aiPrompt.js

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({
      model     : 'claude-sonnet-4-20250514',
      max_tokens: 9000,
      system    : 'Diseñador web de lujo. Solo HTML completo. Sin markdown ni texto extra.',
      messages  : [{ role: 'user', content: prompt }],
    }),
  });

  if (!resp.ok) throw new Error('API ' + resp.status);

  const json = await resp.json();
  let html = json.content.map(b => b.text || '').join('');
  html = html.replace(/^```html?\s*/i, '').replace(/```\s*$/i, '').trim();

  /* Inject real photos into AI-generated placeholders */
  if (d.photos.hero)    html = html.replace(/__HERO__/g,    d.photos.hero);
  if (d.photos.closing) html = html.replace(/__CLOSING__/g, d.photos.closing);
  d.photos.gallery.forEach((src, i) => {
    html = html.replace(new RegExp('__GAL' + i + '__', 'g'), src);
  });
  if (d.audioSrc) html = html.replace(/__AUDIO__/g, d.audioSrc);

  return html;
}
