const getStatusDetails = (isPlayerWinner?: boolean) => {
  let variant, text;

  if (isPlayerWinner === undefined) {
    variant = 'default';
    text = 'Revealed';
  } else if (isPlayerWinner) {
    variant = 'success';
    text = 'Won';
  } else {
    variant = 'error';
    text = 'Lost';
  }

  return { variant, text };
};

export default getStatusDetails;
