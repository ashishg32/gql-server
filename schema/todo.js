const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');

const userType = require('./user');
const usersList = require('../mocks/users.json');

const todoType = new GraphQLObjectType({
  name: 'todo',
  fields: () => ({
    id: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    user: {
      type: userType,
      resolve: (todo) => {
        return usersList.find(user => user.id === todo.userId)
      }
    }
  })
});

module.exports = todoType