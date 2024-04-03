import { createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';
import data from '../database.json';
import { configureStore } from '@reduxjs/toolkit'

// @reduxjs/toolkit

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;
    console.log(user);
    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state = initialState, action) => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

export const initializeAction = (user) => ({
  type: HANDLERS.INITIALIZE,
  payload: user,
});

export const signInAction = (user) => ({
  type: HANDLERS.SIGN_IN,
  payload: user,
});

export const signOutAction = () => ({
  type: HANDLERS.SIGN_OUT,
});

export const initialize = () => async (dispatch) => {
  let isAuthenticated = false;

  try {
    isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
  } catch (err) {
    console.error(err);
  }

  if (isAuthenticated) {
    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      username: 'Anika Ji',
      email: 'anika.visser@devias.io',
    };

    dispatch(initializeAction(user));
  } else {
    dispatch(initializeAction());
  }
};

export const skip = () => async (dispatch) => {
  try {
    window.sessionStorage.setItem('authenticated', 'true');
  } catch (err) {
    console.error(err);
  }

  const user = {
    id: authUser.user_id,
    avatar: '/assets/avatars/avatar-anika-visser.png',
    username: authUser.username,
    email: authUser.email,
  };

  dispatch(signInAction(user));
};

export const signIn = (email, password) => async (dispatch) => {
  const authUser = data.users.find((user) => user.email === email && user.password === password);
  if (authUser === undefined) {
    throw new Error('Please check your email and password');
  }

  try {
    window.sessionStorage.setItem('authenticated', 'true');
  } catch (err) {
    console.error(err);
  }

  const user = {
    id: authUser.user_id,
    avatar: '/assets/avatars/avatar-anika-visser.png',
    username: authUser.username,
    email: authUser.email,
  };

  dispatch(signInAction(user));
};

export const signUp = (email, name, username, password) => async (dispatch) => {
  const authUser = data.users.find((user) => user.email === email || user.username === username);
  if (authUser !== undefined) {
    throw new Error('Email or username already exists');
  }

  try {
    const newUser = {
      user_id: data.users.length + 1,
      username: username,
      password: password,
      email: email,
    };

    // console.log(newUser);
    // data.users.push(newUser);
    // console.log(data.users);
  } catch (err) {
    console.error(err);
  }
};

export const signOut = () => (dispatch) => {
  dispatch(signOutAction());
};

// Redux store

// const store = createStore(reducer, applyMiddleware(thunk));

const store = configureStore({reducer})

// AuthProvider component
export const AuthProvider = (props) => {
  const { children } = props;

  return <Provider store={store}>{children}</Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

// Custom hooks for accessing state and dispatch
export const useAuthState = () => useSelector((state) => state);
export const useAuthDispatch = () => useDispatch();
