import React from 'react';
import { useAuth } from '../hooks/useAuth';

function LogOutButton() {
  const { signOut } = useAuth();
  function handleLogOut() {
    signOut();
  }

  return (
    <button type="button" className="logout-btn" onClick={handleLogOut}>
      Logout your account
    </button>
  );
}

export default LogOutButton;
