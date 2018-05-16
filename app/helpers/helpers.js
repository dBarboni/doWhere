module.exports = {
  //Check if required properties have been defined in request
  reqPropsDefined: function(props, req){
    for(var p = 0; p < props.length; p++){
      if(!(props[p] in req.body) || (req.body[props[p]].length <= 0)){
        return false;
      }
    }
    return true;
  }
};
