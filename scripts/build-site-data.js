#!/usr/bin/env node

/**
 * Keeps the offline fallback embedded in index.html identical to data/tools.json.
 * GitHub Pages loads the JSON directly; the embedded copy is for file:// previews.
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const sitePath = path.join(__dirname, '..', 'index.html');
const startMarker = 'window.AOSRT_DATA = ';
const endMarker = '\n;\n</script>';

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const site = fs.readFileSync(sitePath, 'utf8');
const start = site.indexOf(startMarker);
const end = start === -1 ? -1 : site.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  throw new Error('Could not find the embedded AOSRT_DATA block in index.html.');
}

const updated = site.slice(0, start) + startMarker + JSON.stringify(data, null, 2) + site.slice(end);
fs.writeFileSync(sitePath, updated, 'utf8');
console.log('[BUILD-SITE-DATA] Embedded fallback data synchronized with data/tools.json.');
