interface FormatDecimalProps {
  amount: number;
  decimalPlaces: number;
}

const formatDecimal = ({ amount, decimalPlaces }: FormatDecimalProps): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.floor(amount * factor) / factor;
};

export default formatDecimal;
