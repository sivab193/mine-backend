const express = require("express");
const path = require('path');

import { ApolloServer, gql } from "apollo-server-express";
import { readFileSync } from "fs";
import { join } from "path";
import getRegNo from "./graphql/auth/getRegNo";
import resolvers from "./graphql/index";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: gql(readFileSync(join(__dirname, "../schema.graphql"), "utf8")),
  resolvers,
  context: async ({ req }) => ({
    prisma: prisma,
    auth: getRegNo,
    req
  }),
});

const app = express();

server.applyMiddleware({ app });

app.use(express.static(__dirname));

app.listen({ port: process.env.PORT || 1903 }, () =>
  console.log(`🚀 Server ready at http://localhost:1903${server.graphqlPath}`)
);

//
