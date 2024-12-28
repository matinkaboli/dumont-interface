interface Log {
  topics: string[];
}

const extractGameId = (logs: Log[]): number => {
  if (!logs || logs.length === 0) {
    throw new Error('Invalid logs format');
  }

  const lastLog = logs[logs.length - 2];
  const address = lastLog.topics[1];
  const id = Number(address);

  if (isNaN(id)) {
    throw new Error('Invalid address format');
  }

  return id;
};

export default extractGameId;
