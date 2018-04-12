module.exports = function(app, db){
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

};
