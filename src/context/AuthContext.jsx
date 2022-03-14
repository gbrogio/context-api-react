import Cookie from 'js-cookie';
import PropTypes from 'prop-types';
import React, { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersistedState } from '../hooks/usePersistedState';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut as signOutFirebase
} from '../lib/firebase';

const AuthContext = createContext();

const formatUser = (user) => ({
  name: user.displayName,
  email: user.email,
  photo: user.photoURL,
  uid: user.uid
});

export function AuthContextProvider({ children }) {
  const { state: isUser, setState: setUser } = usePersistedState(
    'USER_CREDENTIALS',
    localStorage.getItem('USER_CREDENTIALS'),
    null
  );

  const navigate = useNavigate();

  function setSession(session) {
    if (session) {
      Cookie.set('AUTH_COOKIE', session, {
        path: '/',
        expires: 60 * 60 * 24 * 30 // 30 days in seconds
      });
    } else {
      Cookie.remove('AUTH_COOKIE');
      localStorage.removeItem('USER_CREDENTIALS');
    }
  }

  function handleUser(currentUser) {
    if (currentUser) {
      const formattedUser = formatUser(currentUser);
      setUser(formattedUser);
      setSession(currentUser.refreshToken);

      return currentUser.displayName;
    }
    setUser(null);
    setSession(false);

    return false;
  }

  async function signInGoogle() {
    try {
      await signInWithPopup(auth, googleProvider)
        .then((result) => {
          const { user } = result;
          handleUser(user);
        });
    } finally {
      navigate('/dashboard');
    }
  }
  async function signOut() {
    try {
      await signOutFirebase(auth)
        .then(() => {
          Cookie.remove('AUTH_COOKIE');
          localStorage.removeItem('USER_CREDENTIALS');
        });
    } finally {
      navigate('/');
    }
  }

  const authContextValue = useMemo(() => ({
    signInGoogle,
    isUser,
    signOut
  }), [isUser]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AuthContext;
