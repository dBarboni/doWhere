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
  //Create task
  app.post('/tasks', (req, res) => {
    const task = {text: req.body.body, title: req.body.title };
    db.collection('tasks').insert(task, (err, result) => {
      if(err){
        res.send({ 'error': 'An error has occurred' });
      }
      else{
        res.send(result.ops[0]);
      }
    });
  });
  //Delete task
  app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
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
    const details = {'_id': new ObjectID(id) };
    const task = {text: req.body.body, title: req.body.title};
    db.collection('tasks').update(details, task, (err, result) => {
      if(err){
          res.send({'error':'An error has occurred'});
      }
      else{
          res.send(task);
      }
    });
  });
};
