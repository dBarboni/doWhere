const todoRoutes = require('./todo_routes');
const userRoutes = require('./user_routes');
const roomRoutes = require('./room_routes');
module.exports = function(app, db){
  todoRoutes(app, db);
  userRoutes(app, db);
  roomRoutes(app, db);
};
