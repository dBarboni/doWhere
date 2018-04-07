var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
  //Get task
  app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('tasks').findOne(details, (err, item) => {
      if(err){
        res.send({'error':'An error has occurred'});
      }
      else{
        res.send(item);
      }
    });
  });

  //Get tasks by room
  app.get('/rooms/:room', (req, res) => {
    const room = req.params.room;
    db.collection("tasks").find({room: room}).toArray(function(err, result) {
      if(err){
        res.send({'error':'An error has occurred'});
      }
      else{
        res.send(result);
      }
    });
  });

  //Create task
  app.post('/tasks', (req, res) => {
    const item = {room: req.body.room, task: req.body.task};
    db.collection('tasks').insert(item, (err, result) => {
      if(err){
        res.send({ 'error': 'An error has occurred'});
      }
      else{
        res.send(result.ops[0]);
      }
    });
  });

  //Delete task
  app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('tasks').remove(details, (err, item) => {
      if(err){
        res.send({'error':'An error has occurred'});
      }
      else{
        res.send('Task ' + id + ' deleted!');
      }
    });
  });

  //Update task
  app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    const item = {room: req.body.room, task: req.body.task};
    db.collection('tasks').update(details, item, (err, result) => {
      if(err){
          res.send({'error':'An error has occurred'});
      }
      else{
          res.send(task);
      }
    });
  });
};
