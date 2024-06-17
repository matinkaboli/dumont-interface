const convertDecimalToNumber = (bigInt: any): number => {
  // Convert BigInt to string
  let bigIntStr = bigInt.toString();
  // Extract the first character
  let leadingChar = bigIntStr[0];
  // Convert the character back to number
  return Number(leadingChar);
};

export default convertDecimalToNumber;
