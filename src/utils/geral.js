const moment = require('moment');

module.exports = {
  defineDias(array) {
    let dias = [];
  
    array.forEach(items => {
      items.forEach(item => {
        let data = moment(item.date, "DD/MM/YYYY").format("YYYY-MM-DD");
        
        if (!dias.includes(data)) {
          dias.push(data);
        }
      });
    });

    dias = dias.sort();
    
    dias = dias.map(dia => moment(dia).format("DD/MM/YYYY"));
  
    return dias;
  },
  
  defineValor(array, diaAtual) {
    const item = array.find(item => item.date == diaAtual);
  
    if (item) {
      return item.value;
    }
    else {
      return 0;
    }
  },

  formataValor(valor) {
    return Number(parseFloat(valor).toFixed(2));
  }
}