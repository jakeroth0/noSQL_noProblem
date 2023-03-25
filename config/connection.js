const { connect, connection } = require('mongoose');
// mongoose is being connected
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nosql_noproblem';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;