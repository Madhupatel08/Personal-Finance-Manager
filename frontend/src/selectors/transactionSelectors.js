export const getTransactionData = (state) => {
    const transaction = state.transaction;
    return !transaction ? [] : transaction;
  };
  