// Comentário de uma linha

/*
  Comentários de
  multiplas linhas
*/

// Declarações var, let e const

// var: declara uma variável
const x = 10;

// let: declara uma variável com escopo do bloco
const y = 20.0;

if (true) {
  const z = 30;
}

// console.log(z); escopo de z é o bloco if

// const: declara uma constante (apenas leitura) com escopo do bloco
const a = 'Olá';

// Identificadores Variaveis
// começar com letra, _, $, caracteres subsequentes podem ser números (0-9)
// case-sentitive

const _minhaVariavel = 'nao faça isso'; // ESLint vai reclamar
const nome_completo = 'Maria do Santos'; // ESLint vai reclamar

const nomeCompleto = 'João da Silva'; // ESLint feliz =)

// variáveis (var ou let) sem atribuição de valor tem valor inicial undefined

let peso; // peso === undefined

// Escopo de Variável

// Variável global: variável declarada fora de uma função e está disponível para qualquer
// outro bloco do documento atual
// Antes do ECMAScript 6 (ES6) não existia declaração de bloco (let e const)

// Estrutura de dados e tipos

// Seis primitivos: Boolean, null, undefined, Number, String, Symbol (ES6)
// Object

// Literais

// Boolean
const ligado = true;
const dormindo = false;

// null
const casa = null;

// undefined
const teste = undefined;

// Number
const numero1 = 25;
const numeroPositivo = +35;
const numeroNegativo = -25;
const velocidadeMedia = 30.4;
const juros = 0.0001;

// String
const mensagem = 'Seja bem vindo';
const mensagem2 = 'Boa tarde'; // ESLint triste


// arrays
const palavras = ['Olá', 'mundo', '!'];
const nomes = ['pedro', , 'maria']; // nomes[1] === undefined
