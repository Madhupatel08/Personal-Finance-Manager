import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import data from '../database.json'

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;
    console.log(user);
    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

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
        email: 'anika.visser@devias.io'
      };
      // const user = {
      //   id: authUser.user_id,
      //   avatar: '/assets/avatars/avatar-anika-visser.png',
      //   name: authUser.username,
      //   email: authUser.email
      // };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: authUser.user_id,
      avatar: '/assets/avatars/avatar-anika-visser.png',
      username: authUser.username,
      email: authUser.email
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };


  // modify this for authentication
  // const user = users.find((user) => user.username === username && user.password === password);
  const signIn = async (email, password) => {
    
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
      email: authUser.email
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async (email, name, username, password) => {

    // this creates a databse in localstorage when we  re run it will vanish client side data should not be changed
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
    }
    catch (err) {
      console.error(err);
    }
  }

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
