import gql from 'graphql-tag';

export const query = gql`
  type Query {
    speak(text: String): Speak
  }
`;
