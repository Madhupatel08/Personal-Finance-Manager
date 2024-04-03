export const getNetWorthData = (state) => {
  const netWorth = state.netWorth;
  return !netWorth ? [] : netWorth;
};

export const getIncomeData = (state) => {
  const income = state.income;
  return !income ? [] : income;
};

export const getExpenseData = (state) => {
  const expense = state.expense;
  return !expense ? [] : expense;
};

export const getREData = (state) => {
  const revExp = state.revExp;
  return !revExp ? [] : revExp;
};