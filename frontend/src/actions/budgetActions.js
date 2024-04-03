import {CREATE_BUDGET} from "../constants/projectConstants"
import {CREATE_BUDGET_DATE_RANGE} from "../constants/projectConstants"

export const createNewBudgetAction = (budget)=>{
return {
    type: CREATE_BUDGET,
    payload:budget,
  }
}

export const createNewBudgetDateRangeAction = (date)=>{
  return {
      type: CREATE_BUDGET_DATE_RANGE,
      payload:date,
    }
  }
