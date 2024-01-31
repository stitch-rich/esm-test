import { ApolloServer } from '@apollo/server';

import { Language } from '../resolvers/language.js';

// Schema definitions for queries and mutations
import { mutation as mutationSchema } from '../schema/mutation.js';
import { query as querySchema } from '../schema/query.js';

const allResolvers = [
  Language
];

// Generate schema/type definitions
export function generateSchema() {
  const types = allResolvers.map(resolver => {
    return resolver.types;
  }).filter(i => i);

  // Concat query, mutations and types
  return [
    querySchema,
    mutationSchema,
    ...types,
  ];
}

export function generateResolvers() {
  let mutation = {};
  let query = {};
  let resolver = {};

  allResolvers.forEach((item) => {
    mutation = {
      ...mutation, ...item.mutation,
    };
    query = {
      ...query, ...item.query,
    };
    resolver = {
      ...resolver, ...item.resolver,
    };
  });

  return {
    Mutation: mutation,
    Query: query,
    ...resolver,
  };
}

// Handle tokens
export const handleTokens = (req?: any) => {
  // If we have verified in middleware then return
  if (req?.user_id) {
    return {
      user_id: req.user_id,
      scope: 'scope' in req ? req.scope : undefined,
      issuer: req.issuer,
    };
  }

  return {};
};
// Set up Apollo Server
export const Apollo = new ApolloServer({
  cache: 'bounded',
  resolvers: generateResolvers(),
  typeDefs: generateSchema(),
  allowBatchedHttpRequests: true,
  introspection: true,
});
