const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} = require('graphql');

const userType = require('./user');
const todoType = require('./todo');

const usersList = require('../mocks/users.json')
const todos = require('../mocks/todos.json');
const starWarSQueryObject = require('./starWar');

const rootQuery = new GraphQLObjectType({
  name: 'query',
  description: 'Root query of the application',
  fields: () => ({
    users: {
      type:  new GraphQLList(userType),
      description: 'List all users',
      resolve: () => usersList
    },
    user: {
      type: userType,
      description: 'A single user',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        const user = usersList.find(user => user.id === args.id)
        return user;
      }
    },
    todos: {
      type:  new GraphQLList(todoType),
      description: 'List all todos',
      resolve: () => todos
    },
    actor: starWarSQueryObject.actor,
    movie: starWarSQueryObject.movie
  })
});

const staticDataSchema = new GraphQLSchema({
  query: rootQuery
});

module.exports = staticDataSchema;