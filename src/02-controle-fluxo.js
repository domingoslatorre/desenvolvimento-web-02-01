// Declaração de bloco

{
  const nome = 'Pedro';
}

// if
// Valores avaliados como false:
// false, undefined, null, 0, NaN, string vazia ('')
// Valores avaliados como true: todos os outros valores, inclusive objetos

const idade = 20;

if (idade < 18) {
  console.log('Não pode entrar');
}

if (idade < 18) {
  console.log('Não pode entrar');
} else {
  console.log('Entra ...');
}

if (idade >= 18) {
  console.log('Adulto');
} else if (idade < 18 && idade >= 14) {
  console.log('Adolescente');
} else {
  console.log('Criança');
}

// switch

const tipoFruta = 'Laranja';

switch (tipoFruta) {
  case 'Maçã':
    console.log('O quilo da maçã é R$5.50.');
    break;
  case 'Laranja':
    console.log('O quilo da maçã é R$5.50.');
    break;
  default:
    console.log('Fruta não encontrada');
}
