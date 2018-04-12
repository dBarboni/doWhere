var helper = require('../helpers/helpers.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
  //Get all tasks
  app.get('/tasks', (req, res) => {
    db.collection("tasks").find().toArray(function(err, result) {
      if(err){
        res.send({'error': err});
      }
      else{
        res.send(result);
      }
    });
  });

  //Get task by id
  app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('tasks').findOne(details, (err, item) => {
      if(err){
        res.send({'error': err});
      }
      else{
        res.send(item);
      }
    });
  });

  //Create task
  app.post('/tasks', (req, res) => {
    var reqProps = ['room', 'task', 'user'];
    if(helper.reqPropsDefined(reqProps, req)){
      const item = {room: req.body.room, task: req.body.task, user: req.body.user};
      db.collection('tasks').insert(item, (err, result) => {
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

  //Delete task by id
  app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('tasks').remove(details, (err, item) => {
      if(err){
        res.send({'error': err});
      }
      else{
        res.send('Task ' + id + ' deleted!');
      }
    });
  });

  //Update task by id
  app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    const item = {room: req.body.room, task: req.body.task, user: req.body.user};
    db.collection('tasks').update(details, item, (err, result) => {
      if(err){
          res.send({'error': err});
      }
      else{
          res.send(item);
      }
    });
  });
};
