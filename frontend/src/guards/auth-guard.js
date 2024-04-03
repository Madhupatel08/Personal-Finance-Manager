import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  
  let token = null;
  // try {
  //    token = localStorage.getItem('token');
  // } catch (error) {
  //   token=null
  // }
  
  const user = useSelector(state => state.auth.user?.email);
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  if (typeof window !== 'undefined') {
    // Perform localStorage action

     token = localStorage.getItem('token')
  }
  useEffect(() => {
    // const token = localStorage.getItem('token');
    if (!router.isReady) {
      return;
    }

    // if (ignore.current) {
    //   return;
    // }

    // ignore.current = true;

    if (!token) {
      console.log('Not authenticated, redirecting');
      // router
      //   .replace({
      //     pathname: '/auth/login',
      //     query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
      //   })

        // .catch(console.error);
      router.push('/auth/login')
    } else {
      if(router.asPath === '/auth/login'){
        router.push('/')
      }
      // setChecked(true);

    }
  }, [token]);

  // if (!checked) {
  //   return null;
  // }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
