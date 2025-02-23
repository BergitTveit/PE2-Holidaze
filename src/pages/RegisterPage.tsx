import { Helmet } from 'react-helmet-async';
import { RegisterForm } from '../components/auth/RegisterForm';
import { AuthLayout } from '../components/auth/AuthLayout';

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Register - Holidaze</title>
        <meta name="description" content="Create your Holidaze account and start booking venues" />
      </Helmet>
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </>
  );
};

export default RegisterPage;
