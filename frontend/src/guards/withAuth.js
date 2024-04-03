// auth/withAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }, [isAuthenticated]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
