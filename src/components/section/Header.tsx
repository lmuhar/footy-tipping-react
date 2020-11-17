import { default as React } from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import Link from 'next/link';
import useTokenData from '../../custom-hooks/token.data';
import { useRouter } from 'next/dist/client/router';

const Header: React.FunctionComponent = (_props) => {
  const user = useTokenData();
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');

  }
  return (
    <Flex bg="brand.500" w="100%" px={5} py={4} justifyContent="space-between" alignItems="center">
      <Flex bg="brand.500" flexDirection="row" justifyContent="center" alignItems="center">
        <Text pl={3}>Footy Tipping {new Date().getFullYear()} 🏉</Text>
      </Flex>
      <Box>
        {!user ? (<Link href="/login">
          <a>Login</a>
        </Link>): ''}
        {!user ? (<Link href="/registration">
          <a>Register</a>
        </Link>): ''}
        {user ? <Text onClick={logout}>
          Logout
        </Text> : '' }
      </Box>
    </Flex>
  );
};

export default Header;
