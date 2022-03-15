import Cookie from 'js-cookie';
import LoginButton from '../components/LogInButton';
import '../styles/styles.css';

const App = () => {
  if (Cookie.get('AUTH_COOKIE')) {
    window.location.href = '/dashboard';
  }

  return (
    <div className="pageContainer">
      <LoginButton />
    </div>
  );
};

export default App;
