import {jest} from '@jest/globals';
import { DateTime } from 'luxon';

const francMock = jest.fn().mockImplementation(() => 'foo')

jest.unstable_mockModule('franc', () => ({
  franc: francMock,
}));


// Resolver
const { Language } = await import('./language.js');

describe('Language resolvers', () => {
  it.only('should resolve speak query as expected', () => {
    const text = 'This is my message';
    const output = Language.query.speak(null, { text })
    expect(francMock).toHaveBeenCalledTimes(1);
    expect(output).toEqual({
      message: text,
      language: 'foo'
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
