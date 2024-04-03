export const getPosTransData = (state) => {
  const posTrans = state.posTrans;
  return !posTrans ? [] : posTrans;
};
// + part of in & out

export const getNegTransData = (state) => {
  const negTrans = state.negTrans;
  return !negTrans ? [] : negTrans;
};
// - part of in & out

export const getSumofBillsData = (state) => {
  const sumofBills = state.sumofBills;
  return !sumofBills ? [] : sumofBills;
};
// bills to pay

export const getNetWorthData = (state) => {
  const netWorth = state.netWorth;
  return !netWorth ? [] : netWorth;
};
// net worth