var ObjectID = require('mongodb').ObjectID;

//Check if required properties have been defined in request
function reqPropsDefined(props, req){
  for(var p = 0; p < props.length; p++){
    if(!(props[p] in req.body) || (req.body[props[p]].length <= 0)){
      return false;
    }
  }
  return true;
}

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

  //Get unique rooms
  app.get('/rooms', (req, res) => {
    db.collection("tasks").distinct("room", (function(err, result) {
      if(err){
        res.send({'error': err});
      }
      else{
        res.send(result);
      }
    }));
  });

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

  //Get tasks by room
  app.get('/rooms/:room', (req, res) => {
    const room = req.params.room;
    db.collection("tasks").find({room: room}).toArray(function(err, result) {
      if(err){
        res.send({'error': err});
      }
      else{
        res.send(result);
      }
    });
  });

  //Create task
  app.post('/tasks', (req, res) => {
    var reqProps = ['room', 'task', 'user'];
    if(reqPropsDefined(reqProps, req)){
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
