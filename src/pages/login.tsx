import { Box, Heading, FormControl, Input, Button, FormLabel } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';
import DefaultLayout from '../layouts/default.layout';

const IndexPage: NextPage = (_props) => {
  return (
    <DefaultLayout>
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
              <Input id="username" name="username" type="username" placeholder="Username" />
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
    </DefaultLayout>
  );
};

export default IndexPage;
