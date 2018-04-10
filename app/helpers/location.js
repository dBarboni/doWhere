const axios          = require('axios');

module.exports = {
  //Get user position
  getPos: function(serverAddress, family, user){
    axios.get(serverAddress + '/view/location/' + family + "/" + user)
      .then(function(response){
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      });
  }
};
