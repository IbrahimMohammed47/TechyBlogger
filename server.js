require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const dataloaders = require('./graphql/dataloaders')
  ; (async () => {
    try {
      await mongoose
        .connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        })
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err))
      const app = express()
      app.disable('x-powered-by')
      const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => {
          let token
          if (req.body.operationName !== 'IntrospectionQuery') {
            token = req.headers.authorization
          }
          return {
            req,
            res,
            token,
            dataloaders
          }
        }
      })
      server.applyMiddleware({ app, cors: false })
      const port = process.env.PORT || 4000
      app.listen({ port }, () => console.log(`http://localhost:${port}${server.graphqlPath}`))
    } catch (e) {
      console.error(e)
    }
  })()
