const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let nomeJogador = '';
let todasPerguntasFeitas = [];
let premioAtual = 2000;
let premioMaximo = 1000000; // Limite máximo de premiação
let totalAcumulado = 0; // Adicionando uma variável para acumular o prêmio total

const perguntas = [
  // ... (suas perguntas aqui)
  {
    pergunta: 'Qual é a capital do Japão?',
    alternativas: ['A) Pequim', 'B) Seul', 'C) Tóquio'],
    resposta: 'C'
  },
  {
    pergunta: 'Quem escreveu "Romeu e Julieta"?',
    alternativas: ['A) Charles Dickens', 'B) William Shakespeare', 'C) Jane Austen'],
    resposta: 'B'
  },
  {
    pergunta: 'Quantos lados tem um triângulo?',
    alternativas: ['A) 3', 'B) 4', 'C) 5'],
    resposta: 'A'
  },
  {
    pergunta: 'Qual é o maior planeta do nosso sistema solar?',
    alternativas: ['A) Terra', 'B) Júpiter', 'C) Marte'],
    resposta: 'B'
  },
  {
    pergunta: 'Quem pintou a Mona Lisa?',
    alternativas: ['A) Vincent van Gogh', 'B) Leonardo da Vinci', 'C) Pablo Picasso'],
    resposta: 'B'
  },
  {
    pergunta: 'Qual é o rio mais longo do mundo?',
    alternativas: ['A) Nilo', 'B) Amazonas', 'C) Yangtzé'],
    resposta: 'A'
  },
  {
    pergunta: 'Quem foi o primeiro presidente dos Estados Unidos?',
    alternativas: ['A) Abraham Lincoln', 'B) George Washington', 'C) Thomas Jefferson'],
    resposta: 'B'
  },
  {
    pergunta: 'Em que ano ocorreu a Revolução Francesa?',
    alternativas: ['A) 1776', 'B) 1789', 'C) 1804'],
    resposta: 'B'
  },
  {
    pergunta: 'Qual é o elemento químico mais abundante na crosta terrestre?',
    alternativas: ['A) Oxigênio', 'B) Silício', 'C) Alumínio'],
    resposta: 'B'
  },
  {
    pergunta: 'Quem escreveu "A Metamorfose"?',
    alternativas: ['A) Franz Kafka', 'B) Fyodor Dostoevsky', 'C) George Orwell'],
    resposta: 'A'
  },
  {
    pergunta: 'Qual é a montanha mais alta do mundo?',
    alternativas: ['A) Everest', 'B) K2', 'C) Annapurna'],
    resposta: 'A'
  },
  {
    pergunta: 'Quantos continentes existem?',
    alternativas: ['A) 5', 'B) 6', 'C) 7'],
    resposta: 'C'
  },
  {
    pergunta: 'Quem pintou "Guernica"?',
    alternativas: ['A) Pablo Picasso', 'B) Salvador Dalí', 'C) Vincent van Gogh'],
    resposta: 'A'
  },
  {
    pergunta: 'Qual é o maior mamífero terrestre?',
    alternativas: ['A) Elefante africano', 'B) Baleia azul', 'C) Gorila'],
    resposta: 'A'
  },
  {
    pergunta: 'Em que ano a independência do Brasil foi proclamada?',
    alternativas: ['A) 1808', 'B) 1822', 'C) 1889'],
    resposta: 'B'
  },
  {
    pergunta: 'Qual é o maior deserto do mundo?',
    alternativas: ['A) Saara', 'B) Antártida', 'C) Gobi'],
    resposta: 'B'
  },
  {
    pergunta: 'Quem foi o inventor da lâmpada elétrica?',
    alternativas: ['A) Thomas Edison', 'B) Nikola Tesla', 'C) Alexander Graham Bell'],
    resposta: 'A'
  },
  {
    pergunta: 'Em que ano ocorreu a Primeira Guerra Mundial?',
    alternativas: ['A) 1914', 'B) 1920', 'C) 1939'],
    resposta: 'A'
  },
  {
    pergunta: 'Qual é a maior ilha do mundo?',
    alternativas: ['A) Groenlândia', 'B) Austrália', 'C) Java'],
    resposta: 'A'
  },
  {
    pergunta: 'Quem escreveu "Dom Quixote"?',
    alternativas: ['A) William Shakespeare', 'B) Miguel de Cervantes', 'C) Fyodor Dostoevsky'],
    resposta: 'B'
  },
  {
    pergunta: 'Quantos elementos químicos a tabela periódica possui?',
    alternativas: ['A) 92', 'B) 118', 'C) 104'],
    resposta: 'B'
  },
  {
    pergunta: 'Qual é o menor planeta do nosso sistema solar?',
    alternativas: ['A) Marte', 'B) Mercúrio', 'C) Plutão'],
    resposta: 'B'
  },
  {
    pergunta: 'Quem foi o primeiro homem a pisar na Lua?',
    alternativas: ['A) Neil Armstrong', 'B) Buzz Aldrin', 'C) Yuri Gagarin'],
    resposta: 'A'
  },
  {
    pergunta: 'Qual é a obra mais conhecida de Van Gogh?',
    alternativas: ['A) Noite Estrelada', 'B) Girassóis', 'C) Os comedores de batata'],
    resposta: 'A'
  },
  {
    pergunta: 'Quem foi o fundador da Microsoft?',
    alternativas: ['A) Jeff Bezos', 'B) Bill Gates', 'C) Mark Zuckerberg'],
    resposta: 'B'
  }
];

let rodadaAtual = 1;
let perguntasPorRodada = 5;
let perguntasRodadaAtual = [];

function iniciarJogo() {
  rl.question('Informe seu nome: ', (nome) => {
    nomeJogador = nome;
    console.log(`Bem-vindo ao Show do Milhão, ${nomeJogador}!`);
    console.log('Responda corretamente a 5 perguntas em cada rodada para ganhar o prêmio máximo de 1 milhão de reais.\n');
    proximaRodada();
  });
}

function proximaRodada() {
  console.log(`\n****************************** Rodada ${rodadaAtual} ******************************`);
  perguntasRodadaAtual = perguntas.filter(pergunta => !todasPerguntasFeitas.includes(pergunta));
  embaralharArray(perguntasRodadaAtual);
  perguntasRodadaAtual = perguntasRodadaAtual.slice(0, perguntasPorRodada);

  apresentarProximaPergunta();
}

function apresentarProximaPergunta() {
  if (perguntasRodadaAtual.length === 0) {
    finalizarRodada();
    return;
  }

  const pergunta = perguntasRodadaAtual.shift(); // Remover a próxima pergunta
  todasPerguntasFeitas.push(pergunta);

  console.log(`\nPergunta: ${pergunta.pergunta}`);
  pergunta.alternativas.forEach((alternativa) => console.log(alternativa));
  console.log(`****************** Premiação ****************** - R$${totalAcumulado}`); // Alterando para exibir o prêmio acumulado
  rl.question('Sua resposta: ', (resposta) => {
    verificarResposta(resposta.toUpperCase(), pergunta);
  });
}

function verificarResposta(resposta, pergunta) {
  if (totalAcumulado + premioAtual > premioMaximo) {
    // Se a premiação total ultrapassar o limite, ajustar o prêmio para não ultrapassar
    premioAtual = premioMaximo - totalAcumulado;
  }

  if (resposta === pergunta.resposta) {
    totalAcumulado += premioAtual;
    console.log('****************** Resultado ****************** - Acertou!');
    console.log(`Parabéns, ${nomeJogador}! Sua pontuação nesta pergunta é R$${premioAtual}.`);
    console.log(`Sua pontuação total é R$${totalAcumulado}.\n`);
  } else {
    console.log(`****************** Resultado ****************** - Errou! A resposta correta era ${pergunta.resposta}\n`);
    finalizarJogo();
    return;
  }

  premioAtual *= 3;  // Multiplicar o prêmio para a próxima pergunta
  apresentarProximaPergunta();
}

function finalizarRodada() {
  console.log(`\nParabéns! Você concluiu a Rodada ${rodadaAtual}.`);
  console.log(`Premiação Total nesta Rodada: R$${totalAcumulado}`);
  rodadaAtual++;

  if (rodadaAtual <= 5) {
    rl.question('Pressione Enter para iniciar a próxima rodada...', () => {
      premioAtual = 2000; // Resetar o prêmio para 2000 antes de cada rodada
      proximaRodada();
    });
  } else {
    finalizarJogo();
  }
}

function finalizarJogo() {
  console.log(`\nParabéns, ${nomeJogador}!`);

  if (rodadaAtual <= 5) {
    console.log(`Você parou na Rodada ${rodadaAtual}.`);
  } else {
    console.log(`Você concluiu todas as rodadas.`);
  }

  console.log(`Premiação Total: R$${totalAcumulado}`);
  rl.question('Deseja jogar novamente? (S/N): ', (resposta) => {
    if (resposta.toUpperCase() === 'S') {
      todasPerguntasFeitas = [];
      rodadaAtual = 1;
      totalAcumulado = 0;
      premioAtual = 2000;
      reiniciarJogo();
    } else {
      rl.close();
    }
  });
}


function reiniciarJogo() {
  iniciarJogo();
}

function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

iniciarJogo();
