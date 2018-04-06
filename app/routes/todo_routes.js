var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
  app.get('/tasks/:id', (req, res) => {
    // Get Task
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('tasks').findOne(details, (err, item) => {
      if (err){
        res.send({'error':'An error has occurred'});
      }
      else{
        res.send(item);
      }
    });
  });

  app.post('/tasks', (req, res) => {
    // Create task
    const task = { text: req.body.body, title: req.body.title };
    db.collection('tasks').insert(task, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
