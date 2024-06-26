const guessArrayToNumber = (guesses: number[]): number => {
  let guessNumber = 0;

  for (let i = 0; i < 13; i++) {
    if (guesses.includes(i)) {
      guessNumber += 1 << i;
    }
  }

  return guessNumber;
};

export default guessArrayToNumber;
