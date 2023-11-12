import { Helmet } from 'react-helmet-async';
// sections
import { LoginView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Jwt: Login</title>
      </Helmet>

      <LoginView />
    </>
  );
}
