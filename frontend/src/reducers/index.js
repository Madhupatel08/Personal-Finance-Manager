import { authReducer } from "./authReducer"
import {transactionReducer} from "./transactionReducer"
import {createBudgetReducer}from "./budgetReducer"
import {createBillReducer} from "./billReducer"
import {createAccReducer} from "./accReducer"


export const allReducers = {budgets:createBudgetReducer ,
                            transaction:transactionReducer,
                            bills:createBillReducer,
                            auth:authReducer,
                            acc:createAccReducer}

