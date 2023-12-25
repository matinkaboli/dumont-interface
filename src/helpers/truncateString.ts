interface TruncateOptions {
  leftChars?: number;
  rightChars?: number;
  numDots?: number;
}

const truncateString = (input: string, options: TruncateOptions = {}): string => {
  const { leftChars = 4, rightChars = 4, numDots = 3 } = options;

  if (leftChars + rightChars + numDots >= input.length) {
    return input;
  }

  const leftPart = input.slice(0, leftChars);
  const rightPart = input.slice(-rightChars);

  return `${leftPart}...${rightPart}`;
};

export default truncateString;
