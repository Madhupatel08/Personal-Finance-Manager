import {CREATE_ACC} from "../constants/projectConstants"

export const createAccReducer = (state=[], action) => {
    switch (action.type) {
        case CREATE_ACC:
          return [...state,action.payload];    
        default:
          return state;
      }
}