const axios          = require('axios');
var find3            = require('./config/find3');

module.exports = {
  //Get user position
  getPos: function(user){
    axios.get(find3.serverAddress + '/view/location/' + find3.family + "/" + user)
      .then(function(response){
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      });
  }
};
