var helper = require('../helpers/helpers.js');

module.exports = function(app, db){
  //Get unique users
  app.get('/users', (req, res) => {
    db.collection("tasks").distinct("user", (function(err, result) {
      if(err){
        res.send({'error': err});
      }
      else{
        res.send(result);
      }
    }));
  });
  //Create user
  app.post('/users', (req, res) => {
    var reqProps = ['name'];
    if(helper.reqPropsDefined(reqProps, req)){
      const item = {name: req.body.name, apikey: req.body.apikey};
      db.collection('users').insert(item, (err, result) => {
        if(err){
          res.send({'error': err});
        }
        else{
          res.send(result.ops[0]);
        }
      });
    }
    else{
      res.send({'error': 'Required properties not defined.'});
    }
  });
};
