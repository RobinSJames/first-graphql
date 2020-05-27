const { gql } = require('apollo-server');

const typeDefs = gql`
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }
  
  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }
  
  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }
  
  enum PatchSize {
    SMALL
    LARGE
  }

  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    me: User
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): String # login token
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
`;

module.exports = typeDefs;

// const axios = require('axios')
// const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql')

// const LaunchType = new GraphQLObjectType({
//   name: 'Launch',
//   fields: () => ({
//     flight_number: { type: GraphQLInt },
//     mission_name: { type: GraphQLString },
//     launch_year: { type: GraphQLString },
//     launch_date_local: { type: GraphQLString },
//     launch_success: { type: GraphQLBoolean },
//     rocket: { type: RocketType }
//   })
// })

// const RocketType = new GraphQLObjectType({
//   name: 'Rocket',
//   fields: () => ({
//     rocket_id: { type: GraphQLString },
//     rocket_name: { type: GraphQLString },
//     rocket_type: { type: GraphQLString }
//   })
// })

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     launches: {
//       type: new GraphQLList(LaunchType),
//       async resolve(parent, args) {
//         return await axios.get('https://api.spacexdata.com/v3/launches')
//           .then(res => res.data)
//       }
//     },
//     launch: {
//       type: LaunchType,
//       args: {
//         flight_number: { type: GraphQLInt }
//       },
//       resolve(parent, args) {
//         return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
//           .then(res => res.data)
//       }
//     },
//     rockets: {
//       type: new GraphQLList(RocketType),
//       async resolve(parent, args) {
//         return await axios.get('https://api.spacexdata.com/v3/rockets')
//           .then(res => res.data)
//       }
//     },
//     rocket: {
//       type: RocketType,
//       args: {
//         id: { type: GraphQLInt }
//       },
//       resolve(parent, args) {
//         return axios.get(`https://api.spacexdata.com/v3/rockets/${args.flight_number}`)
//           .then(res => res.data)
//       }
//     }
//   }
// })

// module.exports = new GraphQLSchema({
//   query: RootQuery
// })