const delayedPromise = <T>(callback: () => T, delay: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
};

export default delayedPromise;
