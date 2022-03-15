import { useAuth } from '../hooks/useAuth';

const LoginButton = () => {
  const { signInGoogle } = useAuth();

  function handleSingInGoogle() {
    signInGoogle();
  }

  return (
    <button type="button" className="login-with-google-btn" onClick={handleSingInGoogle}>
      Sign in with Google
    </button>
  );
};

export default LoginButton;
