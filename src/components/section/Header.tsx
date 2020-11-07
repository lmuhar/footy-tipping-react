import { default as React, FunctionComponent } from 'react';
import { Flex, Text, Box, Link as PrettyLink } from '@chakra-ui/core';
import Link from "next/link";

//const NavLink: FunctionComponent<{ to: string; text: string; }> = ({ to, text }) => <Link as={Link} pr={5} color="white" href={to}>{text}</PrettyLink>;

const Header: React.FunctionComponent = (_props) => {
  return (
    <Flex
        bg="brand.500"
        w="100%"
        px={5}
        py={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Text pl={3} color="white">
            Footy Tipping {new Date().getFullYear()} 🏉
          </Text>
        </Flex>
        <Box>
        </Box>
      </Flex>
  );
};

/*<NavLink to="/login" text="Login" />
<NavLink to="/register" text="Register" />
<NavLink to="/luke-was-here" text="Butt's McGee 🤑" />*/

export default Header;