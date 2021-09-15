const User = require('./User');
const Event = require('./Event');
const Date = require('./Date');

User.hasMany(Event, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// });

module.exports = { User, Event, Date };
