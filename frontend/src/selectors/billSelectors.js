export const getBillsData = (state) => {
    const bills = state.bills;
    return !bills ? [] : bills;
  };
  