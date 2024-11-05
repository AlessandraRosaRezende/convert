# md-to-html

**md-to-html** é uma ferramenta de linha de comando para converter arquivos Markdown (`.md`) em HTML. É ideal para quem deseja uma maneira rápida e simples de transformar arquivos Markdown em páginas HTML, seja para documentações, blogs ou projetos estáticos.

## Instalação

Siga os passos abaixo para instalar o projeto e começar a usá-lo.

### Pré-requisitos

- **Node.js**: Certifique-se de que o Node.js está instalado em sua máquina (versão 12 ou superior).

### Passos de Instalação

1. Clone o repositório:

   ```bash
   git clone <URL-do-repositorio>
   cd <nome-da-pasta>
   ```

2. Instale o pacote globalmente para que o comando `convert` esteja disponível em qualquer diretório:

   ```bash
   npm install -g .
   ```

> **Nota**: Se o comando acima retornar um erro de permissão, use `sudo npm install -g .` (para Unix/macOS) ou execute o terminal como Administrador (para Windows).

## Uso

Após a instalação, você pode converter arquivos `.md` para `.html` usando o comando `convert`.

### Sintaxe

```bash
convert <caminho-do-arquivo-ou-diretorio>
```

### Exemplos

1. **Converter um único arquivo**:

   ```bash
   convert meu-arquivo.md
   ```

   Esse comando cria um arquivo `meu-arquivo.html` no mesmo diretório.

2. **Converter todos os arquivos `.md` em um diretório**:

   ```bash
   convert ./meu-diretorio
   ```

   Este comando busca todos os arquivos `.md` no diretório `meu-diretorio` e converte cada um deles para `.html`, mantendo-os no mesmo local.

## Funcionamento do Script

O script utiliza o pacote `marked` para fazer a conversão de Markdown para HTML e salva o HTML gerado com o mesmo nome do arquivo original, mas com a extensão `.html`. Além disso, o script é recursivo, então ele consegue processar todos os arquivos `.md` dentro de subdiretórios também.

## Exemplo de Código

Aqui está um trecho de como o script principal funciona:

```javascript
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configurações do marked para evitar warnings e colisão de IDs
marked.setOptions({
  mangle: false,
  headerIds: false,
});

// Função para converter o conteúdo Markdown para HTML
function convertMdToHtml(filePath) {
  try {
    const markdown = fs.readFileSync(filePath, 'utf-8');
    let html = marked(markdown);
    html = html.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
    const outputFilePath = filePath.replace(/\.md$/, '.html');
    fs.writeFileSync(outputFilePath, html);
    console.log(`Converted: ${filePath} -> ${outputFilePath}`);
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err);
  }
}
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.


## Licença

Este projeto é distribuído sob a licença MIT.

---

**Nota**: Este projeto é uma ferramenta simples para aprender e praticar conversão de Markdown em HTML com Node.js. Explore, personalize e adapte conforme suas necessidades!
