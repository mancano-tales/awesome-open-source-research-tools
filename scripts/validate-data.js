#!/usr/bin/env node

/**
 * scripts/validate-data.js
 * Validates data/tools.json schema, data integrity, unique IDs, category foreign keys, and URL formatting.
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'tools.json');

const VALID_COUNTRIES = new Set([
  'BR', 'US', 'DE', 'NL', 'FR', 'ES', 'IE', 'AU', 'IN', 'IL', 'CN', 'GLOBAL'
]);

function isValidUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch (e) {
    return false;
  }
}

function runValidation() {
  console.log('[VALIDATE-DATA] Reading ' + DATA_PATH + '...');
  
  if (!fs.existsSync(DATA_PATH)) {
    console.error('[ERRO] data/tools.json nao encontrado.');
    process.exit(1);
  }

  let raw;
  try {
    raw = fs.readFileSync(DATA_PATH, 'utf-8');
  } catch (err) {
    console.error('[ERRO] Falha ao ler data/tools.json: ' + err.message);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error('[ERRO] Sintaxe JSON invalida em data/tools.json: ' + err.message);
    process.exit(1);
  }

  const errors = [];

  // Version check
  if (!data.version || typeof data.version !== 'string' || !/^\d+\.\d+\.\d+$/.test(data.version)) {
    errors.push("Campo 'version' deve ser uma versao semver valida (ex: '1.0.0').");
  }

  // Categories check
  if (!Array.isArray(data.categories) || data.categories.length !== 10) {
    errors.push("Campo 'categories' deve ser um array com exatamente 10 categorias.");
  }

  const categoryIds = new Set();
  if (Array.isArray(data.categories)) {
    data.categories.forEach((cat, index) => {
      if (!cat.id || typeof cat.id !== 'string') {
        errors.push(`Categoria no indice ${index} sem 'id' valido.`);
      } else {
        if (categoryIds.has(cat.id)) {
          errors.push(`Categoria duplicada id '${cat.id}'.`);
        }
        categoryIds.add(cat.id);
      }
      if (!cat.nameEn || typeof cat.nameEn !== 'string') errors.push(`Categoria '${cat.id}' sem 'nameEn'.`);
      if (!cat.namePt || typeof cat.namePt !== 'string') errors.push(`Categoria '${cat.id}' sem 'namePt'.`);
      if (typeof cat.order !== 'number' || cat.order < 1 || cat.order > 10) {
        errors.push(`Categoria '${cat.id}' com 'order' invalido.`);
      }
    });
  }

  // Tools check
  if (!Array.isArray(data.tools) || data.tools.length === 0) {
    errors.push("Campo 'tools' deve ser um array nao vazio.");
  }

  const toolIds = new Set();
  const toolUrls = new Set();

  if (Array.isArray(data.tools)) {
    data.tools.forEach((tool, index) => {
      const prefix = `Ferramenta #${index + 1} ('${tool.name || tool.id || 'desconhecida'}')`;

      // id
      if (!tool.id || typeof tool.id !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(tool.id)) {
        errors.push(`${prefix}: 'id' deve ser string kebab-case valida (ex: 'open-notebook').`);
      } else {
        if (toolIds.has(tool.id)) {
          errors.push(`${prefix}: 'id' duplicado '${tool.id}'.`);
        }
        toolIds.add(tool.id);
      }

      // name
      if (!tool.name || typeof tool.name !== 'string' || tool.name.trim().length === 0) {
        errors.push(`${prefix}: 'name' deve ser string nao vazia.`);
      }

      // url
      if (!tool.url || typeof tool.url !== 'string' || !isValidUrl(tool.url)) {
        errors.push(`${prefix}: 'url' invalida ('${tool.url}').`);
      } else {
        if (toolUrls.has(tool.url)) {
          errors.push(`${prefix}: 'url' duplicada ('${tool.url}').`);
        }
        toolUrls.add(tool.url);
      }

      // categoryId
      if (!tool.categoryId || typeof tool.categoryId !== 'string' || !categoryIds.has(tool.categoryId)) {
        errors.push(`${prefix}: 'categoryId' '${tool.categoryId}' nao existe na lista de categorias.`);
      }

      // country
      if (!tool.country || typeof tool.country !== 'string' || !VALID_COUNTRIES.has(tool.country)) {
        errors.push(`${prefix}: 'country' '${tool.country}' invalido. Valores aceitos: ${Array.from(VALID_COUNTRIES).join(', ')}.`);
      }

      // maintainer
      if (tool.maintainer !== null && tool.maintainer !== undefined) {
        if (typeof tool.maintainer !== 'object' || Array.isArray(tool.maintainer)) {
          errors.push(`${prefix}: 'maintainer' deve ser objeto ou null.`);
        } else {
          if (!tool.maintainer.name || typeof tool.maintainer.name !== 'string') {
            errors.push(`${prefix}: 'maintainer.name' deve ser string nao vazia.`);
          }
          if (tool.maintainer.url && (!isValidUrl(tool.maintainer.url) || typeof tool.maintainer.url !== 'string')) {
            errors.push(`${prefix}: 'maintainer.url' deve ser URL valida.`);
          }
        }
      }

      // institution
      if (tool.institution !== null && tool.institution !== undefined) {
        if (typeof tool.institution !== 'object' || Array.isArray(tool.institution)) {
          errors.push(`${prefix}: 'institution' deve ser objeto ou null.`);
        } else {
          if (!tool.institution.name || typeof tool.institution.name !== 'string') {
            errors.push(`${prefix}: 'institution.name' deve ser string nao vazia.`);
          }
          if (tool.institution.url && (!isValidUrl(tool.institution.url) || typeof tool.institution.url !== 'string')) {
            errors.push(`${prefix}: 'institution.url' deve ser URL valida.`);
          }
        }
      }

      // description
      if (!tool.description || typeof tool.description !== 'object') {
        errors.push(`${prefix}: 'description' deve ser objeto contendo 'en' e 'pt'.`);
      } else {
        if (!tool.description.en || typeof tool.description.en !== 'string' || tool.description.en.length < 15) {
          errors.push(`${prefix}: 'description.en' deve ter pelo menos 15 caracteres.`);
        }
        if (!tool.description.pt || typeof tool.description.pt !== 'string' || tool.description.pt.length < 15) {
          errors.push(`${prefix}: 'description.pt' deve ter pelo menos 15 caracteres.`);
        }
      }

      // tags
      if (!Array.isArray(tool.tags)) {
        errors.push(`${prefix}: 'tags' deve ser um array de strings.`);
      }
    });
  }

  // Related Lists check
  if (data.relatedLists !== undefined) {
    if (!Array.isArray(data.relatedLists)) {
      errors.push("Campo 'relatedLists' deve ser um array.");
    } else {
      const listIds = new Set();
      const listUrls = new Set();
      data.relatedLists.forEach((list, index) => {
        const prefix = `Lista Relacionada #${index + 1} ('${list.name || list.id || 'desconhecida'}')`;
        if (!list.id || typeof list.id !== 'string') errors.push(`${prefix}: 'id' deve ser string.`);
        else {
          if (listIds.has(list.id)) errors.push(`${prefix}: 'id' duplicado '${list.id}'.`);
          listIds.add(list.id);
        }
        if (!list.name || typeof list.name !== 'string') errors.push(`${prefix}: 'name' deve ser string.`);
        if (!list.url || typeof list.url !== 'string' || !isValidUrl(list.url)) {
          errors.push(`${prefix}: 'url' invalida ('${list.url}').`);
        } else {
          if (listUrls.has(list.url)) errors.push(`${prefix}: 'url' duplicada ('${list.url}').`);
          listUrls.add(list.url);
        }
        if (!list.country || typeof list.country !== 'string' || !VALID_COUNTRIES.has(list.country)) {
          errors.push(`${prefix}: 'country' '${list.country}' invalido.`);
        }
        if (!list.description || typeof list.description !== 'object') {
          errors.push(`${prefix}: 'description' deve ser objeto contendo 'en' e 'pt'.`);
        } else {
          if (!list.description.en || typeof list.description.en !== 'string' || list.description.en.length < 15) {
            errors.push(`${prefix}: 'description.en' deve ter pelo menos 15 caracteres.`);
          }
          if (!list.description.pt || typeof list.description.pt !== 'string' || list.description.pt.length < 15) {
            errors.push(`${prefix}: 'description.pt' deve ter pelo menos 15 caracteres.`);
          }
        }
      });
    }
  }

  if (errors.length > 0) {
    console.error(`\n[FALHA] Foram encontrados ${errors.length} erros de validacao em data/tools.json:`);
    errors.forEach((err, idx) => console.error(`  ${idx + 1}. ${err}`));
    process.exit(1);
  }

  console.log(`[SUCESSO] data/tools.json e 100% valido! (${data.tools.length} ferramentas em ${data.categories.length} categorias).`);
  process.exit(0);
}

runValidation();
