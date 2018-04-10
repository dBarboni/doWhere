module.exports = {
  //Check if required properties have been defined in request
  reqPropsDefined: function(props, req){
    for(var p = 0; p < props.length; p++){
      if(!(props[p] in req.body) || (req.body[props[p]].length <= 0)){
        return false;
      }
    }
    return true;
  },
  notifyUser: function(apikey, deviceid, name, title, text){
    axios.post('https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?deviceId=' + deviceid + '&apikey=' + apikey + "&title=" + title + "&text=" + text, {})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
