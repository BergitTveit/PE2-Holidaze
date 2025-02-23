import { Helmet } from 'react-helmet-async';
import { LoginForm } from '../components/auth/LoginForm';
import { AuthLayout } from '../components/auth/AuthLayout';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login - Holidaze</title>
        <meta name="description" content="Sign in to your Holidaze account" />
      </Helmet>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default LoginPage;
