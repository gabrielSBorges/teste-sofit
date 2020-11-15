const { buscaPrecos, buscaAbastecimentos, buscaKmPercorridos, enviaDados } = require('./utils/requisicoes');
const { defineDias, defineValor, formataValor } = require('./utils/geral');

Promise.all([buscaPrecos(), buscaAbastecimentos(), buscaKmPercorridos()])
.then(async values => {
  const consumoEstimado = 11;
  
  const precos = values[0];
  const abastecimentos = values[1];
  const quilometrosPercorridos = values[2];

  const dias = defineDias([precos, abastecimentos, quilometrosPercorridos]);

  let valorAtualCombustivel = 0;
  let saldo = 0;

  const saldos = dias.map(dia => {
    const precoDoCombustivel = precos.find(price => price.date == dia);
    
    if (precoDoCombustivel) {
      valorAtualCombustivel = formataValor(precoDoCombustivel.value);
    }
    
    const valorDoAbastecimento = formataValor(defineValor(abastecimentos, dia));
    const kmPercorrido = formataValor(defineValor(quilometrosPercorridos, dia));

    const totalAbastecido = formataValor(valorDoAbastecimento / valorAtualCombustivel);
    const totalGasto = formataValor(kmPercorrido / consumoEstimado);
    
    saldo = formataValor(saldo + totalAbastecido - totalGasto);

    return {
      date: dia,
      value: saldo
    }
  })

  const resultado = await enviaDados(saldos);

  console.log("---------------------");
  console.log(`${formataValor(resultado.hit * 100)}%`)
  console.log("---------------------");
})