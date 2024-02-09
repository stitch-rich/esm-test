import { DateTime } from 'luxon';
// Resolver
import { Language } from './language';

describe('Language resolvers', () => {
  it('should resolve speak query as expected', () => {
    const text = 'This is my message';
    const output = Language.query.speak(null, { text })
    expect(output).toEqual({
      message: text,
      language: 'eng'
    });
  });
  it('should resolve speak_date query as expected', () => {
    const output = Language.query.speak_date()
    expect(output).toContain(DateTime.now().toISO().split('T')[0]);
  });
  it('should resolve speak_country query as expected', () => {
    const country = 'foo';
    const output = Language.query.speak_country(null, { country })
    expect(output).toBe('FOO');
  });
});
