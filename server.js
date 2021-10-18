const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
cors = require('cors');

// import relative stuff
const schema = require('./schema');

const app = express();
const port = 9000;
const mongodb = {
  username: '',
  password: '',
  host: 'localhost',
  port: 27017,
  db: 'local_db',
  isEnabled: true
};
// mongo config options
const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const dbUrl = `mongodb://${mongodb.host}/${mongodb.db}?retryWrites=true&w=majority`
const env = process.env.APP_ENV

app.use(cors());
// define graph ql middleware
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// connect to db and app server
mongoose.connect(dbUrl, configOptions)
.then(() => {
  console.info(`${env} env connected to mongodb successfully`);
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})
.catch((error) => {
  console.log(error)
  console.error(`Unable to connect to the mongo of ${env} , ${JSON.stringify(error)}`);
});