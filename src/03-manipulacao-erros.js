// throw: lançar exceção
// qualquer tipo/literal
// throw 'Errooo';
// throw 32;

function MinhaExcecao(mensagem) {
  this.nome = 'Minha Exceção';
  this.mensagem = mensagem;
}

MinhaExcecao.prototype.toString = function() {
  return this.nome + ': ' + this.mensagem;
};

// throw new MinhaExcecao('Testando throwwww!');


// try...catch

function dividir(n1, n2) {
  if (n2 === 0) {
    throw 'ErroDivisaoPorZero';
    // throw new MinhaExcecao('ErroDivisaoPorZero');
  }
  return n1 / n2;
}

try {
  console.log(dividir(10, 0));
} catch (e) {
  console.log(e);
} finally {
  // liberar recursos, fechar arquivos, etc
}
