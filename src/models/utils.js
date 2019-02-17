import { Repeat } from 'immutable';

export function listOf(fn, length) {
  return (
    Repeat(null, length)
      .toList()
      .map(fn)
  )
}

export function randomFloat(min, max) {
  return (Math.random() * (max - min)) + min
}
