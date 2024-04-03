import {CREATE_BILL} from "../constants/projectConstants"
export const createNewBillAction = (bills)=>{
return {
    type: CREATE_BILL,
    payload:bills,
  }
}