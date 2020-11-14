const api = require('../services/api');

require('dotenv-safe').config();

const user_id = process.env.MY_ID;

module.exports = {
  buscaPrecos() {
    return api.get(`/data/${user_id}/prices`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  },
  
  buscaAbastecimentos() {
    return api.get(`/data/${user_id}/supplies`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  },

  buscaKmPercorridos() {
    return api.get(`/data/${user_id}/spents`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  },

  enviaDados(body) {
    return api.post(`/check?id=${user_id}`, body)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      })
  }
}