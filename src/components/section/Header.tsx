import { default as React } from 'react';
import { Box } from '@material-ui/core';
import Link from 'next/link';
import useTokenData from '../../custom-hooks/token.data';
import { useRouter } from 'next/dist/client/router';

const Header: React.FunctionComponent = (_props) => {
  const user = useTokenData();
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  return (
    <Box>
      <Box>
        <Box pl={3}>Footy Tipping {new Date().getFullYear()} 🏉</Box>
      </Box>
      <Box>
        {!user ? (
          <Link href="/login">
            <a>Login</a>
          </Link>
        ) : (
          ''
        )}
        {!user ? (
          <Link href="/registration">
            <a>Register</a>
          </Link>
        ) : (
          ''
        )}
        {user ? <Box onClick={logout}>Logout</Box> : ''}
      </Box>
    </Box>
  );
};

export default Header;
