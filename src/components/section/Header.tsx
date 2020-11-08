import { default as React } from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import Link from 'next/link';

const Header: React.FunctionComponent = (_props) => {
  return (
    <Flex bg="brand.500" w="100%" px={5} py={4} justifyContent="space-between" alignItems="center">
      <Flex bg="brand.500" flexDirection="row" justifyContent="center" alignItems="center">
        <Text pl={3}>Footy Tipping {new Date().getFullYear()} 🏉</Text>
      </Flex>
      <Box>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/registration">
          <a>Register</a>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
