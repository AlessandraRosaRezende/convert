#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Desabilita a opção 'mangle' para evitar o aviso
marked.setOptions({
  mangle: false,
  headerIds: false,
});

// Função para converter um arquivo .md para .html
function convertMdToHtml(filePath) {
  try {
    const markdown = fs.readFileSync(filePath, 'utf-8'); // Lê o arquivo .md
    let html = marked(markdown); // Converte o Markdown para HTML
    // Substitui { por &#123; e } por &#125; no HTML
    html = html.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
    const outputFilePath = filePath.replace(/\.md$/, '.html'); // Substitui a extensão .md por .html
    fs.writeFileSync(outputFilePath, html); // Escreve o HTML no arquivo de saída
    console.log(`Converted: ${filePath} -> ${outputFilePath}`);
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err);
  }
}

// Função para buscar arquivos .md em uma pasta e suas subpastas
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath); // Lê o conteúdo da pasta
  files.forEach(file => {
    const fullPath = path.join(dirPath, file); // Cria o caminho completo do arquivo/pasta
    const stat = fs.statSync(fullPath); // Verifica se é um arquivo ou pasta

    if (stat.isDirectory()) {
      processDirectory(fullPath); // Se for uma pasta, processa recursivamente
    } else if (file.endsWith('.md')) {
      convertMdToHtml(fullPath); // Se for um arquivo .md, converte para HTML
    }
  });
}

// Pega o diretório base da linha de comando, ou usa o diretório atual se não for fornecido
const baseDir = process.argv[2] || '.';

// Inicia o processo
processDirectory(baseDir);
