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

function slugifyEn(text) {
  // github-slugger algorithm: remove non-alphanumeric except whitespace/hyphens, then replace spaces with hyphens
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s/g, '-');
}

function slugifyPt(text) {
  return text
    .toLowerCase()
    .replace(/[áàãâä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòõôö]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s/g, '-');
}

function generateReadmeEn(data) {
  const lines = [
    '# Awesome Open Source Research Tools [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)',
    '',
    '> A curated list of open source software for any stage of a rigorous, systematic research project — not limited to any single discipline or method.',
    '',
    'This list is method- and discipline-agnostic. If a tool is open source and supports some part of the research lifecycle — collecting data, managing it, analyzing it, making the work reproducible, writing it up, or reviewing existing literature — it belongs here. Social sciences, natural sciences, health sciences, digital humanities: all welcome, as long as the software itself is open source.',
    '',
    'Read this in [Português (Brasil)](README.pt-BR.md). Prefer a browsable, bilingual page? See the [project site](https://mancano-tales.github.io/awesome-open-source-research-tools/).',
    '',
    '## Contents',
    ''
  ];

  // Table of Contents (strictly categories only)
  data.categories.forEach(cat => {
    const slug = slugifyEn(cat.nameEn);
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
  lines.push('Organizations (not single tools) whose sustained investment in open source research infrastructure is worth pointing to.');
  lines.push('');
  lines.push('- [Center for Open Science](https://github.com/CenterForOpenScience) - Nonprofit behind the Open Science Framework (OSF), building infrastructure and running initiatives for open, reproducible research.');
  lines.push('- [Corporation for Digital Scholarship](https://github.com/DigitalScholar) - Nonprofit behind Zotero and Tropy, building free and open source tools for scholarly research.');
  lines.push('- [Ipea (Instituto de Pesquisa Econômica Aplicada)](https://github.com/ipea) - Brazilian federal public foundation producing open source tooling and reproducible research infrastructure for official data, including the `brverse` ecosystem.');
  lines.push('- [Posit](https://github.com/posit-dev) - Public benefit corporation (formerly RStudio) behind RStudio, Quarto, Shiny, renv and other widely-used open source research tooling.');
  lines.push('- [Social Science Data Lab](https://github.com/socialsciencedatalab) - Research lab at the Mannheim Centre for European Social Research (MZES) publishing open source tools and resources for social science data work.');
  lines.push('- [The Carpentries](https://github.com/carpentries) - Nonprofit teaching foundational open source data and computational skills to researchers (Software Carpentry, Data Carpentry, Library Carpentry).');
  lines.push('');

  // Related Lists
  lines.push('## Related Lists');
  lines.push('');
  lines.push('- [brverse (Ipea)](https://github.com/ipea/brverse) - Curated directory and ecosystem of open source R packages maintained by the Institute for Applied Economic Research (Ipea) for reproducible access to official Brazilian socioeconomic, census, and spatial data, strengthening national data sovereignty.');
  lines.push('');

  // Contributing
  lines.push('## Contributing');
  lines.push('');
  lines.push('Contributions are welcome! Please read the [contribution guidelines](CONTRIBUTING.md) before opening a pull request — additions are evaluated against an objective checklist (open source license, active maintenance, minimal documentation, non-redundancy), not personal preference.');
  lines.push('');

  return lines.join('\n');
}

function generateReadmePt(data) {
  const lines = [
    '# Awesome Open Source Research Tools (pt-BR) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)',
    '',
    '> Uma lista curada de software de código aberto para qualquer etapa de um projeto de pesquisa rigoroso e sistemático — sem se limitar a uma única disciplina ou método.',
    '',
    'Esta lista é agnóstica quanto a métodos e disciplinas. Se uma ferramenta é de código aberto e apoia alguma etapa do ciclo de pesquisa — coleta de dados, gestão, análise (qualitativa ou quantitativa), reprodutibilidade, escrita ou síntese de literatura —, ela tem lugar aqui. Ciências sociais, ciências naturais, ciências da saúde, humanidades digitais: todas bem-vindas, desde que o software em si seja de código aberto.',
    '',
    'Leia a versão em [Inglês](README.md). Prefere uma página interativa e bilíngue? Acesse o [site do projeto](https://mancano-tales.github.io/awesome-open-source-research-tools/).',
    '',
    '## Sumário',
    ''
  ];

  // Table of Contents
  data.categories.forEach(cat => {
    const slug = slugifyPt(cat.namePt);
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
  lines.push('Organizações (e não ferramentas isoladas) cujo investimento sustentado em infraestrutura aberta de pesquisa merece destaque:');
  lines.push('');
  lines.push('- [Center for Open Science](https://github.com/CenterForOpenScience) - Entidade sem fins lucrativos responsável pelo Open Science Framework (OSF), construindo infraestrutura e liderando iniciativas para pesquisa aberta e reproduzível.');
  lines.push('- [Corporation for Digital Scholarship](https://github.com/DigitalScholar) - Entidade sem fins lucrativos por trás do Zotero e Tropy, desenvolvendo ferramentas livres e de código aberto para pesquisa acadêmica.');
  lines.push('- [Ipea (Instituto de Pesquisa Econômica Aplicada)](https://github.com/ipea) - Fundação pública federal brasileira que desenvolve ferramentas de código aberto e infraestrutura de pesquisa reproduzível para dados públicos oficiais, incluindo o ecossistema `brverse`.');
  lines.push('- [Posit](https://github.com/posit-dev) - Empresa de benefício público (anteriormente RStudio) responsável por RStudio, Quarto, Shiny, renv e outras ferramentas fundamentais de código aberto para computação científica.');
  lines.push('- [Social Science Data Lab](https://github.com/socialsciencedatalab) - Laboratório de pesquisa no Centro de Pesquisa Social Europeia de Mannheim (MZES), publicando ferramentas e recursos abertos para trabalho com dados em ciências sociais.');
  lines.push('- [The Carpentries](https://github.com/carpentries) - Organização sem fins lucrativos que ensina habilidades fundamentais de programação e ciência de dados abertas para pesquisadores (Software Carpentry, Data Carpentry, Library Carpentry).');
  lines.push('');

  // Listas Relacionadas
  lines.push('## Listas Relacionadas');
  lines.push('');
  lines.push('- [brverse (Ipea)](https://github.com/ipea/brverse) - Diretório e ecossistema de pacotes em R mantidos pelo Instituto de Pesquisa Econômica Aplicada (Ipea) para acesso facilitado e reprodutível a bases de dados públicas e geoespaciais brasileiras, promovendo a soberania de dados.');
  lines.push('');

  // Contribuição
  lines.push('## Como Contribuir');
  lines.push('');
  lines.push('Contribuições são bem-vindas! Leia as [diretrizes de contribuição](CONTRIBUTING.md) antes de abrir um pull request — adições são avaliadas por um checklist objetivo (licença de código aberto, manutenção ativa, documentação mínima, não redundância), não por preferência pessoal.');
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
