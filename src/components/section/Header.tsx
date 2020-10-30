import * as React from 'react';
import { Flex, Text, Box, Link as PrettyLink } from '@chakra-ui/core';
import { Link } from "react-router-dom";

const NavLink = ({ ...props }) => <PrettyLink as={Link} pr={5} color="white" {...props} />;

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
            Footy Tipping 2021
          </Text>
        </Flex>
        <Box>
          <NavLink>Login</NavLink>
          <NavLink>Register</NavLink>
        </Box>
      </Flex>
  );
};


export default Header;