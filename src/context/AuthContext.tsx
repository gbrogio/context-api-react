import { User } from 'firebase/auth';
import Cookie from 'js-cookie';
import React, { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersistedState } from '../hooks/usePersistedState';
import { IAuthContext } from '../interface/IAuthContext';
import { UserService } from '../interface/IUser';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut as signOutFirebase
} from '../lib/firebase';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const formatUser = (user: User) => ({
  name: user.displayName,
  email: user.email,
  photo: user.photoURL,
  uid: user.uid
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const { state: isUser, setState: setUser } = usePersistedState(
    'USER_CREDENTIALS',
    localStorage.getItem('USER_CREDENTIALS'),
    null
  );

  const navigate = useNavigate();

  function setSession(session: string | null) {
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

  function handleUser(currentUser: UserService) {
    if (currentUser) {
      const formattedUser = formatUser(currentUser);
      setUser(formattedUser);
      setSession(currentUser.refreshToken);

      return currentUser.displayName;
    }
    setUser(null);
    setSession(null);

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
};

export default AuthContext;
