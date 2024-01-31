import gql from 'graphql-tag';

export const mutation = gql`
  type Mutation {
    test(text: String): String
  }
`;
