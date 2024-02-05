import {DateTime} from 'luxon'

export function sayDate() {
  return DateTime.now().toISO()
}