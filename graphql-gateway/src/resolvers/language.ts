import { franc } from 'franc';
import { DocumentNode } from 'graphql';
import {gql} from 'graphql-tag';
import {sayDate, sayCountry} from "@elements/helpers";

// HELPERS
import { Resolver } from './_baseResolver';

interface QueryInterface {
  speak: (_: any, params: {
    text: string
  })=> {
    message: string
    language:string
  }
  speak_date: () => string 
  speak_country: (_: any, params: {
    country: string
  }) => string | undefined
}

// Resolver class
class LanguageResolver extends Resolver {
  mutation = {};

  query: QueryInterface = {
   speak: (_, { text }) => ({
      message: text,
      language: franc(text)
  }),
    speak_date: () => sayDate(),
    speak_country: (_, { country }) => sayCountry(country)
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
