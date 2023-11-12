import { useEffect, useCallback, useState } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.login,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const authenticated = true;

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      // If authentication is false...
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
