import {CREATE_BILL} from "../constants/projectConstants"

export const createBillReducer = (state=[], action) => {
    switch (action.type) {
        case CREATE_BILL:
          return [...state,action.payload];    
        default:
          return state;
      }
}