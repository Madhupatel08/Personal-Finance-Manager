import { FETCH_TRANSACTIONS, ADD_TRANSACTION } from 'src/constants/projectConstants';


// Transaction reducer
export const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case ADD_TRANSACTION:
        return [...state,action.payload]; 
    default:
      return state;
  }
};

