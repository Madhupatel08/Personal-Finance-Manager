import {CREATE_BUDGET} from "../constants/projectConstants"

export const createBudgetReducer = (state=[], action) => {
    switch (action.type) {
        case CREATE_BUDGET:
          return [...state,action.payload];    
        default:
          return state;
      }
}
