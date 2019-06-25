'use strict'

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const sqlite = require('sqlite')
const getQueryObject = require("../dist/index").getQueryObject;

const dbPromise = sqlite.open('./database.sqlite', { promise: Promise })
  .then(db => db.migrate({ force: 'last' })).catch((err) => {
    console.log(err)
  })

const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    subtitle: String
    content: String
    category: Category
  }

  type Category {
    id: ID!
    name: String!
  }

  type Query {
    posts(limit: Int): [Post]
  }
`);

const resolvers = {

  posts: async (_, params, info) => {
    const queryData = getQueryObject(info)
    const db = await dbPromise
    let posts
    let relation = 'category'

    if (queryData.hasRelation(relation)) {
      // Select with relation
      posts = await db.all(
        `SELECT  ${queryData.getRootFields()}, ${queryData.getRelationFields(relation)} 
          FROM Post INNER JOIN Category ON Category.id = Post.categoryId`)
      // Transform from flatten structure to graph
      posts = queryData.expandToGraph(posts, [relation])
    } else {
      // Can cause SQL injection
      posts = await db.all(`SELECT ${queryData.getRootFields()} FROM Post`)
    }
    return posts
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
