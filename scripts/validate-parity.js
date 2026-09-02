#!/usr/bin/env node

/**
 * scripts/validate-parity.js
 * Validates that README.md and README.pt-BR.md on disk strictly match the
 * exact content generated in memory from data/tools.json.
 * Exits with 0 if identical, exits with 1 if there is any manual drift.
 */

const fs = require('fs');
const path = require('path');
const { generateReadmeEn, generateReadmePt } = require('./build-readmes');

const DATA_PATH = path.join(__dirname, '..', 'data', 'tools.json');
const README_EN_PATH = path.join(__dirname, '..', 'README.md');
const README_PT_PATH = path.join(__dirname, '..', 'README.pt-BR.md');

function normalizeLineEndings(str) {
  return str.replace(/\r\n/g, '\n').trim();
}

function runParityCheck() {
  console.log('[VALIDATE-PARITY] Checking parity between data/tools.json and disk READMEs...');

  if (!fs.existsSync(DATA_PATH)) {
    console.error('[ERRO] data/tools.json nao encontrado.');
    process.exit(1);
  }

  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error('[ERRO] data/tools.json invalido: ' + err.message);
    process.exit(1);
  }

  let hasError = false;

  // Check README.md
  if (!fs.existsSync(README_EN_PATH)) {
    console.error('[FALHA] README.md nao existe no disco.');
    hasError = true;
  } else {
    const diskEn = normalizeLineEndings(fs.readFileSync(README_EN_PATH, 'utf-8'));
    const expectedEn = normalizeLineEndings(generateReadmeEn(data));
    if (diskEn !== expectedEn) {
      console.error('[FALHA DE PARIDADE] README.md no disco diverge do gerado por data/tools.json!');
      hasError = true;
    } else {
      console.log('[OK] README.md perfeitamente sincronizado com data/tools.json.');
    }
  }

  // Check README.pt-BR.md
  if (!fs.existsSync(README_PT_PATH)) {
    console.error('[FALHA] README.pt-BR.md nao existe no disco.');
    hasError = true;
  } else {
    const diskPt = normalizeLineEndings(fs.readFileSync(README_PT_PATH, 'utf-8'));
    const expectedPt = normalizeLineEndings(generateReadmePt(data));
    if (diskPt !== expectedPt) {
      console.error('[FALHA DE PARIDADE] README.pt-BR.md no disco diverge do gerado por data/tools.json!');
      hasError = true;
    } else {
      console.log('[OK] README.pt-BR.md perfeitamente sincronizado com data/tools.json.');
    }
  }

  if (hasError) {
    console.error('\n[ACAO NECESSARIA] Execute `node scripts/build-readmes.js`, adicione as mudancas ao git e tente novamente.');
    process.exit(1);
  }

  console.log('[SUCESSO] Todos os READMEs estao em 100% de paridade com o SSOT data/tools.json.');
  process.exit(0);
}

runParityCheck();
