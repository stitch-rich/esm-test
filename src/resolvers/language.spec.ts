// Resolver
import { Language } from './language';

describe('Language resolvers', () => {
  it('should resolve speak query as expected', () => {
    const text = 'Say this string';
    const output = Language.query.speak(null, { text })
    expect(output).toEqual({
      message: text,
      language: 'en-GB'
    });
  });
});
