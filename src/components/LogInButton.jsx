import React from 'react';
import { useAuth } from '../hooks/useAuth';

function LoginButton() {
  const { signInGoogle } = useAuth();

  function handleSingInGoogle() {
    signInGoogle();
  }

  return (
    <button type="button" className="login-with-google-btn" onClick={handleSingInGoogle}>
      Sign in with Google
    </button>
  );
}

export default LoginButton;
