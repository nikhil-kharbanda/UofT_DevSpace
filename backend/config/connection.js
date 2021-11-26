const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://nikhilkharbanda-admin:1593578462nk@cluster0.zvogn.mongodb.net/discorddb?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
);

module.exports = mongoose.connection;
