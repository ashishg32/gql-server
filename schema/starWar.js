const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql');
const axios = require('axios');

const fetchMovie = (_, {id}) => {
  return axios.get(`https://swapi.dev/api/films/${id}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.log(err);
    return []
  })
}

const fetchActorMovies = (urls) => {
  const promises = urls.map(url => axios.get(url))
  return axios.all(promises).then(responseArr => {
    let movies = responseArr.map(res => res.data);
    movies = [].concat.apply([], movies)
    return movies
  }).catch(() => [])
}

const fetchActor = (_, {id}) => {
  return axios.get(`https://swapi.dev/api/people/${id}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.log(err);
    return []
  })
}

const movieType = new GraphQLObjectType({
  name: 'movie',
  description: 'returns a single movie',
  fields: () => ({
    title: { type: GraphQLString },
    opening_crawl: { type: GraphQLString },
    director: { type: GraphQLString },
    producer: { type: GraphQLString },
    release_date: { type: GraphQLString }
  })
});

const actorType = new GraphQLObjectType({
  name: 'actor',
  description: 'actor of the star war',
  fields: () => ({
    name: { type: GraphQLString },
    height: { type: GraphQLString },
    hair_color: { type: GraphQLString },
    eye_color: { type: GraphQLString },
    gender: { type: GraphQLString },
    films: { type: new GraphQLList(GraphQLString) },
    movies: {
      type: new GraphQLList(movieType),
      resolve: (actor) => fetchActorMovies(actor.films)
    }
  })
});

const starWarSQueryObject = {
  actor: {
    type: actorType,
    args: {
      id: { type: GraphQLInt }
    },
    resolve: fetchActor
  },
  movie: {
    type: movieType,
    args: {
      id: { type: GraphQLInt }
    },
    resolve: fetchMovie
  },
}

module.exports = starWarSQueryObject