export const getAccData = (state) => {
  const acc = state.acc;
  return !acc ? [] : acc;
};