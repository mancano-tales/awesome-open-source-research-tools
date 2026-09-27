#!/usr/bin/env node

/** Verifies that index.html's offline fallback matches the canonical dataset. */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const sitePath = path.join(__dirname, '..', 'index.html');
const startMarker = 'window.AOSRT_DATA = ';
const endMarker = '\n;\n</script>';

const canonical = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const site = fs.readFileSync(sitePath, 'utf8');
const start = site.indexOf(startMarker);
const end = start === -1 ? -1 : site.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  console.error('[FALHA] Bloco AOSRT_DATA não encontrado em index.html.');
  process.exit(1);
}

let embedded;
try {
  embedded = JSON.parse(site.slice(start + startMarker.length, end));
} catch (error) {
  console.error('[FALHA] Bloco AOSRT_DATA inválido: ' + error.message);
  process.exit(1);
}

if (JSON.stringify(embedded) !== JSON.stringify(canonical)) {
  console.error('[FALHA DE PARIDADE] index.html diverge de data/tools.json. Execute npm run build-site-data.');
  process.exit(1);
}

console.log('[OK] index.html e data/tools.json estão perfeitamente sincronizados.');
