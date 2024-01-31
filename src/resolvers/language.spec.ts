// Resolver
import { Language } from './language.js';

describe('Language resolvers', () => {
  it('should resolve speak query as expected', () => {
    const text = 'This is my message';
    const output = Language.query.speak(null, { text })
    expect(output).toEqual({
      message: text,
      language: 'eng'
    });
  });
});
