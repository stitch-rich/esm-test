import { find } from 'lodash-es';

const countries = [{ id: 'foo', name: 'FOO'}, { id: 'bar', name: 'BAR'}, { id: 'baz', name: 'BAZ'}]

export function sayCountry(id: string) {
  return find(countries, { id })?.name
} 