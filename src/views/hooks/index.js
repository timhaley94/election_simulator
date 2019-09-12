import { useState, useEffect } from 'react';

export function useOnMount(fn) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(
    () => {
      if (!isMounted) {
        fn();
        setIsMounted(true);
      }
    }
  );
}

export function useTicker(initialLength) {
  if (initialLength < 1) {
    throw Error(`useTicker requires length argument > 1, not ${initialLength}`);
  }

  const [length, setLength] = useState(initialLength);
  const [tick, setTick] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [, setTimer] = useState(null);

  const stop = () => {
    setIsRunning(false);
    setTimer(
      t => {
        if (t) {
          clearInterval(t);
        }

        return null;
      }
    );
  };

  const step = () => {
    setTick(
      t => {
        if (t + 1 < length) {
          return t + 1;
        }

        stop();
        return t;
      }
    )
  };

  const start = () => {
    setIsRunning(true);
    setTimer(
      t => {
        if (t) {
          return t;
        }

        step();
        return setInterval(
          step,
          1500
        );
      }
    );
  };

  const reset = (nextLength) => {
    stop();
    setLength(nextLength);
    setTick(0);
    start();
  };

  return {
    isRunning,
    tick,
    start,
    stop,
    step,
    reset
  };
}
