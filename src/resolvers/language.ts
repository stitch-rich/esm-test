import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

// HELPERS
import { Resolver } from './_baseResolver';


interface QueryInterface {
  speak: (_: any, params: {
    text: string
  })=> {
    message: string
    language:string
  }
}

// Resolver class
class LanguageResolver extends Resolver {
  mutation = {};

  query: QueryInterface = {
   speak: (_, { text }) => ({
      message: text,
      language: 'en-GB'
  })
  };

  resolver = {};

  types: DocumentNode = gql`
    type Speak {
      message: String
      language: String
    }

  `;
}

export const Language = new LanguageResolver();
