import Cookie from 'js-cookie';
import React from 'react';
import LogOutButton from '../components/LogOutButton';
import { useAuth } from '../hooks/useAuth';
import '../styles/styles.css';

function Dashboard() {
  const { isUser } = useAuth();
  if (!Cookie.get('AUTH_COOKIE')) {
    window.location.href = '/';
  }

  return (
    <div className="pageContainer" style={{ flexDirection: 'column' }}>
      <h1>
        Welcome!
      </h1>

      <div className="user">
        <img
          src={isUser.photo}
          alt="user avatar"
          className="userPhoto"
        />

        <section>
          <h2>{isUser.name}</h2>
          <h5>{isUser.email}</h5>
        </section>
      </div>
      <LogOutButton />
    </div>
  );
}

export default Dashboard;
