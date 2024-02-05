import { sayCountry } from ".";

describe('say country', () => {
  it('can say foo', () => {
    expect(sayCountry('foo')).toBe('FOO')
  })
  it('can handle not found', () => {
    expect(sayCountry('red')).toBeUndefined()
  })
})