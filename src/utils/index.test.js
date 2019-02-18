import {
  listOf,
  randomFloat,
  weightedMovingAverage
} from './index';

describe('randomFloat', () => {
  it('works with -1 and 1', () => {
    const x = randomFloat(-1, 1);

    expect(x).toBeWithinRange(-1, 1);
  });

  it('works with 43 and 79', () => {
    const x = randomFloat(43, 79);

    expect(x).toBeWithinRange(43, 79);
  });
});

describe('listOf', () => {
  it('returns list of appropriate length', () => {
    expect(
      listOf(() => 'test', 5).count()
    ).toBe(5);
  });

  it('repeatedly calls the function', () => {
    let val = 0;

    const fn = () => {
      val = val + 1;
      return { val };
    };

    listOf(fn, 7).forEach(
      ({ val }, i) => {
        expect(val).toBe(i + 1);
      }
    );
  });
});

describe('weightedMovingAverage', () => {
  it('ignores values outside the last n entries', () => {
    const values = [1, 1, 1, 1, 1000000];

    expect(
      weightedMovingAverage(i => values[i], 4)
    ).toBeWithinRange(0.999, 1.001);
  });

  it('includes values inside the last n entries', () => {
    const values = [1, 1000000, 1, 1, 1];

    expect(
      weightedMovingAverage(i => values[i], 4)
    ).toBeGreaterThan(1);
  });

  it('weights earlier values more than later values', () => {
    const values = [2, 1, 2, 1, 2, 1];
    expect(
      weightedMovingAverage(i => values[i], 6)
    ).toBeGreaterThan(1.5)
  });
});
