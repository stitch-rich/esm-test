import {gql} from 'graphql-tag';

export const query = gql`
  type Query {
    speak(text: String!): Speak
    speak_date: String
    speak_country(country: String!): String
  }
`;
