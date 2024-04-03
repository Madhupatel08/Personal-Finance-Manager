import {CREATE_ACC} from "../constants/projectConstants"
export const createNewAccAction = (acc)=>{
return {
    type: CREATE_ACC,
    payload:acc,
  }
}