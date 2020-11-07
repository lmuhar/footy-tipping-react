import {
  Flex,
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  FormLabel
} from '@chakra-ui/core';
import { NextPage } from "next";
import React from "react";

const IndexPage: NextPage = () => {
  return (
    <Flex direction="column" margin="auto">
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
            <form>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input id="email" name="email" type="email" placeholder="Email" />
                </FormControl>
                <FormControl mt={6} isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input id="username" name="username" type="username" placeholder="Username"/>
                </FormControl>
                <FormControl mt={6} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input id="password" name="password" type="password" placeholder="Password" />
                </FormControl>
                <Button type="submit" width="full" mt={4}>
                  Sign In
                </Button>
            </form>
        </Box>
      </Box>
      </Flex>
    </Flex>
  );
};

export default IndexPage;