import { Box, Heading, FormControl, Input, Button, FormLabel } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';
import DefaultLayout from '../layouts/default.layout';
import { useForm } from 'react-hook-form';
import to from 'await-to-js';
import Axios from 'axios';
import { useRouter } from 'next/dist/client/router';

interface UserToken {
  token: string;
}

const IndexPage: NextPage = (_props) => {
  const router = useRouter();
  const { handleSubmit, register } = useForm();
  const onSubmit = async (data) => {
    const [err, res] = await to(
      Axios.post<UserToken>(`http://localhost:${process.env.PORT || 3000}/api/user/login`, data),
    );
    if (err) {
      console.log(err);
    }

    if (res && res.data) {
      localStorage.setItem('token', res.data.token);
      router.push('/')
    }
  };
  return (
    <DefaultLayout>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input id="email" name="email" type="email" placeholder="Email" ref={register} />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input id="password" name="password" type="password" placeholder="Password" ref={register} />
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
