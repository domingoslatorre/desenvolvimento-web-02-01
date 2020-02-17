# 01. Revisão JavaScript, Node.js e NPM

## 1. Objetivos
- Revisar os conceitos fundamentais da linguagem de programação JavaScript
- Utilizar npm para gerenciamento de dependências
- Instalar, configurar e utilizar o eslint para análise de código

## 2. Recursos necessários
- Computador com conexão com a internet
- Node.js 13.6.0
- Git
- Visual Studio Code 1.42
  - ESLint (Dirk Baeumer)
  - EditorConfig for VS Code
  - Todo Tree

## 3. Conceitos Abordados
### 3.1. Node.js

- Ambiente de execução javaScript fora do navegador
- JavaScript runtime
- Chrome's V8 JavaScript engine.
- [Site oficial](https://nodejs.org/en/)

### 3.2. NPM
- [**Node Package Manager**](https://docs.npmjs.com/about-npm/)
- Gerenciador de pacotes e registro
- Os desenvolvedores podem compartilhar códigosque eles escreveram (um pacote)
- Outros desenvolvedores podem usar esses pacotes em seus projetos (uma dependência)

**Pacote**: código reutilizável que geralmente resolve um problema comum

**Dependência**: um pacote que seu projeto depende para funcionar corretamente

Quando falamos "npm" podemos estar falando de três coisas distintas:
- npm CLI
  - ferramenta de linha de comando
  - interagir com npm
- Website
  - explorar pacotes
  - profiles
  - organizações (acesso público e privado aos pacotes)
- Registry
  - base de dados pública de pacotes JavaScript


## 4. Roteiro

### 4.1. Configurações dos softwares

#### 4.1.1 Proxy

Nos ambientes com proxy (laboratórios da faculdade, empresa, etc.), configurar o git, npm e vscode.

Exemplo (considerando o endereço do proxy `10.100.4.253` e porta `3128`):

git:

```bash
$ git config --global http.proxy http://10.100.4.253:3128
```

npm:

```bash
$ npm config set proxy "http://10.100.4.253:3128"
$ npm config set https-proxy "http://10.100.4.253:3128"
```

VS Code:

settings.json
```json
"http.proxy": "http://10.100.4.253:3128",
"http.proxySupport": "on",
"http.proxyAuthorization": null,
"http.proxyStrictSSL": true
```

#### 4.1.2 Configurar indentidade no git (nome e email)

Antes de iniciar, verifique as configurações já definidas:
```bash
$ git config -l
```

Configurar seu `user.name` e `user.email`:

```bash
$ git config --global user.name "Seu nome para exibição"
$ git config --global user.email "seuemail@email.com"
```

Opções --system, --global e --local

- **--system**: válido para todos os usuários no sistema e todos os seus repositórios.
- **--global**: somente para seu usuário no sistema e todos os seus repositórios.
- **--local**: específico para um repositório.

### 4.2. Projeto com Node.js e NPM

#### 4.2.1. Iniciar um projeto

```bash
$ npm init
```

Será criado um arquivo `package.json`
```json
{
  "name": "desenvolvimento-web-02-01",
  "version": "1.0.0",
  "description": "Revisão JavaScript, Node.js e NPM",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

#### 4.2.2. Instalar um pacote como dependência do projeto

```bash
$ npm install <package_name>
$ npm install <@scope/package_name>
$ npm install <@scope/private_package_name>
```

Instalar o `express`
```bash
npm install express
```
```bash
npm i express
```

`package.json` após a instalação do pacote
```json
{
  "name": "desenvolvimento-web-02-01",
  "version": "1.0.0",
  "description": "Revisão JavaScript, Node.js e NPM",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

**Nota**: Inferno das Dependências (_Dependency Hell_)

O pacote do express instalado é o `^4.17.1`. Versionamento semântico formato MAJOR.MINOR.PATCH

- **MAJOR**: versão maior, mudanças incompatíveis na API
- **MINOR**: versão menor, novas funcionalidades mantendo a compatibilidade
- **PATCH**: versão de correção, correções de falhas mantendo a compatibilidade

Ler mais informações em: https://semver.org/lang/pt-BR/

Após instalação o npm cria um diretório `node_modules`. Neste diretório são armazenados e binários das dependências.

```bash
$ ls node_modules
```

Não queremos o diretório `node_modules`  no nosso repositório git.
Para isso vamos criar uma arquivo `.gitignore` com o conteúdo:

```
node_modules/
```

Para remover um pacote (Não precisa remover neste momento, vamos utilizar o express):
```bash
$ npm uninstall express
```
```bash
$ npm un express
```

#### 4.2.3. Utilizar um pacote instalado

Criar o diretório `src` e o arquivo `src/index.js`

```js
const express = require('express')

const app = express()

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.listen(3000, function(){
  console.log('listening on port 3000')
})
```

```bash
$ node src/index.js
```

#### 4.2.4. Instalar um pacote como dependência de desenvolvimento

```bash
$ npm install <package_name> -D
$ npm install <package_name> --save-dev
$ npm i <package_name> -D
$ npm i <package_name> --save-dev
```
Um pacote de cada vez
```bash
$ npm i nodemon -D
$ npm i mocha -D
$ npm i chai -D
```
Vários pacotes no mesmo comando
```bash
$ npm i nodemon mocha chai -D
```

Arquivo `package.json` após a instalação das pacotes
```json
{
  "name": "desenvolvimento-web-02-01",
  "version": "1.0.0",
  "description": "Revisão JavaScript, Node.js e NPM",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^7.0.1",
    "nodemon": "^2.0.2"
  }
}
```
**nodemon**: Monitorar alterações no codigo e reinicie automaticamente o servidor - perfeito para desenvolvimento

**mocha**: framework de teste javascript  para node.js e o navegador

**chai**: Assertion library para uso em conjunto com o mocha

#### 4.2.5. Utilizando as dependências de desenvolvimento

Binários das dependências utilizadas no projeto no diretório: `node_modules/.bin/`

**Nodemon**

```bash
./node_modules/.bin/nodemon src/index.js
```

**Mocha**

Arquivo de teste `test/test.js`
```javascript
const chai = require('chai');
const expect = chai.expect;

describe('Array', function() { // describe define o nome da suite de teste

  describe('#indexOf()', function() { // agrupar testes com describe aninhados

    it('deve retornar -1 quando o valor não for encontrado', function() { // it define um teste
      const numbers = [1, 2, 3];
      expect(numbers.indexOf(4)).to.equal(-1)
    });

  });

});
```
```bash
./node_modules/.bin/mocha test/test.js
```

Durante as aulas usaremos o `mocha` como test framework running e o `chai` como assertion library.


#### 4.2.6. Instalar um pacote global
```
npm install <package_name> -g
npm install <package_name> --global
```

```
npm i md-to-pdf -g
```

```
md-to-pdf
md2pdf
```

#### 4.2.7. Sucrase

Sucrase gerar os builds do projeto (alternativa mais leve ao Babel)

```
npm i sucrase -D
```

```json
{
  "name": "desenvolvimento-web-02-01",
  "version": "1.0.0",
  "description": "Revisão JavaScript, Node.js e NPM",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^7.0.1",
    "nodemon": "^2.0.2",
    "sucrase": "^3.12.1"
  }
}
```

src/index.js
```javascript
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
```
Executar sem o sucrase
```bash
$ ./node_modules/.bin/nodemon src/index.js
```
> SyntaxError: Cannot use import statement outside a module

Executar usando o sucrase

```bash
$ ./node_modules/.bin/nodemon --exec sucrase-node src/index.js
```

test/test.js
```javascript
import { expect } from 'chai';
// import "chai/register-expect" (alternativa)

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      const numbers = [1, 2, 3];
      expect(numbers.indexOf(4)).to.equal(-1)
    });
  });
});
```

```bash
$ ./node_modules/.bin/mocha test/test.js
```
> SyntaxError: Cannot use import statement outside a module

```bash
./node_modules/.bin/mocha --require sucrase/register test/test.js
```

#### 4.2.8. NPM Scritps
Scripts para automatizar tarefas repetitivas

- rodar o projeto
- build
- test
- minifying CSS, JS


```json
{
  "name": "desenvolvimento-web-02-01",
  "version": "1.0.0",
  "description": "Revisão JavaScript, Node.js e NPM",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^7.0.1",
    "nodemon": "^2.0.2",
    "sucrase": "^3.12.1"
  }
}
```

```bash
$ npm test
```
```bash
$ npm run test
```
> Error: no test specified

```json
{
  "name": "desenvolvimento-web-02-01",
  "version": "1.0.0",
  "description": "Revisão JavaScript, Node.js e NPM",
  "main": "index.js",
  "scripts": {
    "test": "mocha --require sucrase/register test/**/*.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^7.0.1",
    "nodemon": "^2.0.2",
    "sucrase": "^3.12.1"
  }
}
```
```bash
$ npm run test
```

```json
{
  "name": "desenvolvimento-web-02-01",
  "version": "1.0.0",
  "description": "Revisão JavaScript, Node.js e NPM",
  "main": "index.js",
  "scripts": {
    "dev": "npm restart && nodemon --exec sucrase-node src/index.js",
    "restart": "touch src/index.js",
    "test": "mocha --require sucrase/register test/**/*.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^7.0.1",
    "nodemon": "^2.0.2",
    "sucrase": "^3.12.1"
  }
}
```
```bash
$ npm run dev
```

```bash
$ npm run test
```

#### 4.2.9. ESlint
Ferramenta de análise estática de código. Identifica quebras de estilização e erros.

Ajuda com a qualidade do código.

Instalar o `eslint` como dependências de desenvolvimento

```bash
$ npm i eslint -D
```
```json
{
  "name": "desenvolvimento-web-02-01",
  "version": "1.0.0",
  "description": "Revisão JavaScript, Node.js e NPM",
  "main": "index.js",
  "scripts": {
    "dev": "npm restart && nodemon --exec sucrase-node src/index.js",
    "restart": "touch src/index.js",
    "test": "mocha --require sucrase/register test/**/*.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "eslint": "^6.8.0",
    "mocha": "^7.0.1",
    "nodemon": "^2.0.2",
    "sucrase": "^3.12.1"
  }
}
```
Configurar o eslint
```bash
$ ./node_modules/.bin/eslint --init
```

Selecionar as opções
```
  ? How would you like to use ESLint?
  To check syntax only
  To check syntax and find problems
❯ To check syntax, find problems, and enforce code style
```

```
? What type of modules does your project use? (Use arrow keys)
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
```

```
? Which framework does your project use?
  React
  Vue.js
❯ None of these
```

```
? Does your project use TypeScript? (y/N) N
```

```
? Where does your code run?
 ◯ Browser
❯◉ Node
```

```
? How would you like to define a style for your project? (Use arrow keys)
❯ Use a popular style guide
  Answer questions about your style
  Inspect your JavaScript file(s)
```

```
? Which style guide do you want to follow? (Use arrow keys)
❯ Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
```

```
? What format do you want your config file to be in? (Use arrow keys)
❯ JavaScript
  YAML
  JSON
```

```
Checking peerDependencies of eslint-config-airbnb-base@latest
The config that you've selected requires the following dependencies:

eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.1.0 eslint-plugin-import@^2.18.2
? Would you like to install them now with npm? (Y/n) Y
```

O Arquivo .eslintrc.js criado automaticamente
```js
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
  },
};
```
Executar o eslint
```bash
$ ./node_modules/.bin/eslint src/index.js
```
```bash
$ ./node_modules/.bin/eslint src/**/*.js
```
Executar o eslint e corrigir automaticamente os erros
```bash
$ ./node_modules/.bin/eslint src/**/*.js --fix
```

Configurar NPM Script

```json
{
  "name": "desenvolvimento-web-02-01",
  "version": "1.0.0",
  "description": "Revisão JavaScript, Node.js e NPM",
  "main": "index.js",
  "scripts": {
    "dev": "npm restart && nodemon --exec sucrase-node src/index.js",
    "restart": "touch src/index.js",
    "test": "mocha --require sucrase/register test/**/*.js",
    "lint": "eslint src/**/*.js test/**/*.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "eslint": "^6.8.0",
    "eslint-config-airbnb-base": "^14.0.0",
    "eslint-plugin-import": "^2.20.1",
    "mocha": "^7.0.1",
    "nodemon": "^2.0.2",
    "sucrase": "^3.12.1"
  }
}
```

```bash
$ npm run lint
```


Podemos desligar algumas regras do eslint `rules`:
```js
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": "off"
  },
};
```

Configurar o eslint para reconhecer as definições do mocha na propriedade `env`:
```js
module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": "off"
  },
};
```
Instalar a Extension [ESLint](https://github.com/Microsoft/vscode-eslint) no VSCode e configurar o fix na ação de salvar (Ctrl+S).

settings.json
```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

#### 4.2.10. editor.config
....



### 4.3. Revisão Javascript

#### 4.3.1 Sintaxe e tipos

```javascript

// Comentário de uma linha

/*
  Comentários de
  multiplas linhas
*/

// Declarações var, let e const

// var: declara uma variável
var x = 10;

// let: declara uma variável com escopo do bloco
let y = 20.0;

if (true) {
  let z = 30;
}

// console.log(z); escopo de z é o bloco if

// const: declara uma constante (apenas leitura) com escopo do bloco
const a = 'Olá';

// Identificadores Variaveis
// começar com letra, _, $, caracteres subsequentes podem ser números (0-9)
// case-sentitive

let _minhaVariavel = 'nao faça isso'; // ESLint vai reclamar
let nome_completo = 'Maria do Santos'; // ESLint vai reclamar

const nomeCompleto = 'João da Silva'; // ESLint feliz =)

// variáveis com declaradas com var ou let sem atribuição de valor tem valor inicial undefined

let peso; // peso === undefined

// Escopo de Variável

// Variável global: variável declarada fora de uma função e está disponível para qualquer
// outro bloco do documento atual
// Antes do ECMAScript 6 (ES6) não existia declaração de bloco (let e const)


```

#### 4.3.2 Estruturas de controle

Lorem, lorem, lorem

#### 4.3.3 Arrays

Lorem, lorem, lorem

## Referências

- https://git-scm.com/docs/git-config
- https://docs.npmjs.com/cli-documentation/cli
