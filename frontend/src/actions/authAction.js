import { SIGN_IN,SIGN_OUT,INITIALIZE,SIGN_UP } from "src/constants/projectConstants";
import axios from 'axios';

  

  
  

export const initialize = (user) => ({
    type: INITIALIZE,
    payload: user
  });
  
  export const signIn =  (email, password) => async (dispatch) => {


    // Perform the check here
    
    let data = JSON.stringify({
      "username": email,
      "password": password
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/auth/login',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    const response ={
      status:200
    }
    // const response = await axios.request(config)


    // console.log(response)
    // const token = response.data.jwtToken
    const token = "hbGciOiJIUzUxMiJ9"
    if(token){
    localStorage.setItem('token',token)
  }
    if(response.status === 200){
      return dispatch( {
        type: SIGN_IN,
        payload: {
          email,
          password
        }});
    }
    
    else {
      
    throw new Error('Please check your email and password');
    }
  };
  
  
  export const signOut = () => {
    localStorage.removeItem('token')
    return {
      type: SIGN_OUT
    };
  };
  
  export const signUp = (email, name, username, password) => async (dispatch) => {

    let data = JSON.stringify({
      "username": username,
      "password": password,
      "email": email
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/auth/create-user',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    const response = await axios.request(config)
    console.log(response);
    if (response.status === 200) {
      return dispatch({
        type: SIGN_UP,
        payload: {
          username
        }
      });
    }else{
      throw new Error('Something went wrong');  
    }
  

  }