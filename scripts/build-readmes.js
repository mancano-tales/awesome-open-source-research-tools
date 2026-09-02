#!/usr/bin/env node

/**
 * scripts/build-readmes.js
 * Generates README.md and README.pt-BR.md deterministically from data/tools.json,
 * guaranteeing strict alphabetical sorting within categories, canonical formatting,
 * and 100% compliance with awesome-lint.
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'tools.json');
const README_EN_PATH = path.join(__dirname, '..', 'README.md');
const README_PT_PATH = path.join(__dirname, '..', 'README.pt-BR.md');

function loadData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function ensureTrailingPeriod(str) {
  const trimmed = str.trim();
  if (trimmed.endsWith('.')) return trimmed;
  return trimmed + '.';
}

function generateReadmeEn(data) {
  const lines = [
    '# Awesome Open Source Research Tools [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)',
    '',
    'A curated list of open source software for every stage of a rigorous research project. Covering data collection, management, quantitative and qualitative analysis, reproducibility, writing, and literature synthesis across disciplines.',
    '',
    '## Contents',
    ''
  ];

  // Table of Contents (strictly categories only)
  data.categories.forEach(cat => {
    const slug = cat.nameEn.toLowerCase()
      .replace(/&/g, '')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    lines.push(`- [${cat.nameEn}](#${slug})`);
  });

  lines.push('');

  // Categories and Tools
  data.categories.forEach(cat => {
    lines.push(`## ${cat.nameEn}`);
    lines.push('');

    const categoryTools = data.tools
      .filter(t => t.categoryId === cat.id)
      .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

    categoryTools.forEach(tool => {
      const desc = ensureTrailingPeriod(tool.description.en);
      lines.push(`- [${tool.name}](${tool.url}) - ${desc}`);
    });

    lines.push('');
  });

  // Inspiring Organizations
  lines.push('## Inspiring Organizations');
  lines.push('');
  lines.push('Beyond individual tools, these organizations actively build, maintain, or fund open research infrastructure:');
  lines.push('');
  lines.push('- [Center for Open Science](https://github.com/CenterForOpenScience) - Non-profit developing the Open Science Framework (OSF) and promoting preregistration, open data, and badges.');
  lines.push('- [Corporation for Digital Scholarship](https://github.com/DigitalScholar) - Non-profit behind Zotero, dedicated to open infrastructure for researchers and cultural heritage institutions.');
  lines.push('- [Ipea (Instituto de Pesquisa Econômica Aplicada)](https://github.com/ipea) - Brazilian public research foundation developing open source statistical software, geospatial packages, and socioeconomic data access tools.');
  lines.push('- [Posit](https://github.com/posit-dev) - PBC building open source data science tools (RStudio, Quarto, tidyverse, renv) committed to scientific computing.');
  lines.push('- [Social Science Data Lab](https://github.com/socialsciencedatalab) - Mannheim-based initiative sharing open tutorials, teaching materials, and reproducible research workflows.');
  lines.push('- [The Carpentries](https://github.com/carpentries) - Global community teaching foundational coding and data science skills to researchers under open licenses.');
  lines.push('');

  // Related Lists
  lines.push('## Related Lists');
  lines.push('');
  lines.push('Domain-specific and regional collections that complement this general list:');
  lines.push('');
  lines.push('- [brverse (Ipea)](https://github.com/ipea/brverse) - Curated directory and ecosystem of open source R packages maintained by the Institute for Applied Economic Research (Ipea) for programmatic, reproducible access to official Brazilian socioeconomic, census, and spatial data, strengthening national data sovereignty.');
  lines.push('');

  // Contributing
  lines.push('## Contributing');
  lines.push('');
  lines.push('See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to suggest new tools.');
  lines.push('');

  return lines.join('\n');
}

function generateReadmePt(data) {
  const lines = [
    '# Awesome Open Source Research Tools (pt-BR) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)',
    '',
    'Uma lista curada de software de código aberto para cada etapa de um projeto de pesquisa rigoroso. Cobre coleta de dados, gestão, análise quantitativa e qualitativa, reprodutibilidade, escrita e síntese de literatura em diversas disciplinas.',
    '',
    'Para a versão em inglês, consulte o [README.md](README.md).',
    '',
    '## Sumário',
    ''
  ];

  // Table of Contents
  data.categories.forEach(cat => {
    const slug = cat.namePt.toLowerCase()
      .replace(/&/g, '')
      .replace(/[áàãâä]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòõôö]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    lines.push(`- [${cat.namePt}](#${slug})`);
  });

  lines.push('');

  // Categories and Tools
  data.categories.forEach(cat => {
    lines.push(`## ${cat.namePt}`);
    lines.push('');

    const categoryTools = data.tools
      .filter(t => t.categoryId === cat.id)
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));

    categoryTools.forEach(tool => {
      const desc = ensureTrailingPeriod(tool.description.pt);
      lines.push(`- [${tool.name}](${tool.url}) - ${desc}`);
    });

    lines.push('');
  });

  // Organizações Inspiradoras
  lines.push('## Organizações Inspiradoras');
  lines.push('');
  lines.push('Além de ferramentas individuais, estas organizações constroem, mantêm ou financiam ativamente a infraestrutura aberta de pesquisa:');
  lines.push('');
  lines.push('- [Center for Open Science](https://github.com/CenterForOpenScience) - Organização sem fins lucrativos que desenvolve o Open Science Framework (OSF) e promove pré-registro, dados abertos e selos de reprodutibilidade.');
  lines.push('- [Corporation for Digital Scholarship](https://github.com/DigitalScholar) - Entidade sem fins lucrativos por trás do Zotero, dedicada à infraestrutura aberta para pesquisadores e acervos culturais.');
  lines.push('- [Ipea (Instituto de Pesquisa Econômica Aplicada)](https://github.com/ipea) - Fundação pública brasileira dedicada à pesquisa aplicada, desenvolvimento de software estatístico e geoespacial de código aberto, e fomento ao acesso público e reprodutível a dados oficiais.');
  lines.push('- [Posit](https://github.com/posit-dev) - Empresa pública de interesse geral (PBC) que cria ferramentas de ciência de dados de código aberto (RStudio, Quarto, tidyverse, renv), comprometida com a computação científica.');
  lines.push('- [Social Science Data Lab](https://github.com/socialsciencedatalab) - Iniciativa da Universidade de Mannheim focada em tutoriais abertos, materiais didáticos e fluxos de pesquisa reproduzíveis.');
  lines.push('- [The Carpentries](https://github.com/carpentries) - Comunidade global que ensina habilidades essenciais de programação e ciência de dados para pesquisadores sob licenças abertas.');
  lines.push('');

  // Listas Relacionadas
  lines.push('## Listas Relacionadas');
  lines.push('');
  lines.push('Coleções temáticas e ecossistemas regionais que complementam esta lista geral:');
  lines.push('');
  lines.push('- [brverse (Ipea)](https://github.com/ipea/brverse) - Diretório e ecossistema de pacotes em R mantidos pelo Instituto de Pesquisa Econômica Aplicada (Ipea) para acesso facilitado e reprodutível a bases de dados públicas e geoespaciais brasileiras, promovendo a soberania de dados.');
  lines.push('');

  // Contribuição
  lines.push('## Como Contribuir');
  lines.push('');
  lines.push('Consulte o [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes sobre como sugerir novas ferramentas.');
  lines.push('');

  return lines.join('\n');
}

function buildReadmes() {
  console.log('[BUILD-READMES] Generating README.md and README.pt-BR.md from data/tools.json...');
  const data = loadData();

  const enContent = generateReadmeEn(data);
  fs.writeFileSync(README_EN_PATH, enContent, 'utf-8');
  console.log(`[OK] Generated ${README_EN_PATH}`);

  const ptContent = generateReadmePt(data);
  fs.writeFileSync(README_PT_PATH, ptContent, 'utf-8');
  console.log(`[OK] Generated ${README_PT_PATH}`);

  console.log('[SUCESSO] READMEs gerados com sucesso e em perfeita sincronia com data/tools.json.');
}

if (require.main === module) {
  buildReadmes();
}

module.exports = {
  generateReadmeEn,
  generateReadmePt
};
