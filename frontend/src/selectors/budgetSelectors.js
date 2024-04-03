export const getBudgetsData = (state) => {
  const budgets = state.budgets;
  return !budgets ? [] : budgets;
};
