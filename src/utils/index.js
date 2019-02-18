import { Repeat, Range } from 'immutable';

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

export function weightedMovingAverage(getValue, n = 10) {
  const range = Range(1, n + 1);
  const sum = range.reduce((acc, val) => acc + val);

  return (
    range
      .reverse()
      .map(raw => raw/sum)
      .map((weight, i) => weight * getValue(i))
      .reduce((acc, val) => acc + val)
  );
}
