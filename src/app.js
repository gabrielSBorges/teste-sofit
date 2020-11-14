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
      valorAtualCombustivel = precoDoCombustivel.value;
    }
    
    const valorDoAbastecimento = defineValor(abastecimentos, dia);
    const kmPercorrido = defineValor(quilometrosPercorridos, dia);

    const totalAbastecido = valorDoAbastecimento / valorAtualCombustivel;
    const totalGasto = kmPercorrido / consumoEstimado;
    
    saldo = formataValor(saldo + totalAbastecido - totalGasto);

    return {
      date: dia,
      value: saldo
    }
  })

  console.log();

  const resultado = await enviaDados(saldos);

  console.log(resultado)
})