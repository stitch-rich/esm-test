import { DocumentNode } from 'graphql';

export class Resolver {
  mutation: { [key: string]: any | Promise<any> } | void = {};

  query: { [key: string]: any | Promise<any> } | void = {};

  resolver: { [key: string]: any | Promise<any> } | void = {};

  type: DocumentNode | void = undefined;
}
