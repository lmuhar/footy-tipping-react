import { Box, Button, FormControl, Heading, Input } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';
import DefaultLayout from '../layouts/default.layout';
import { useForm } from 'react-hook-form';
import to from 'await-to-js';
import Axios from 'axios';

const IndexPage: NextPage = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = async (data) => {
    const [err, res] = await to(Axios.post(`http://localhost:${process.env.PORT || 3000}/api/user/register`, data));
    if (err) {
      // console.log(err);
    }

    if (res) {
      // console.log('Success');
    }
  };
  return (
    <DefaultLayout>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
              <Input name="email" id="email" type="email" placeholder="Email" ref={register} />
            </FormControl>
            <FormControl mt={6} isRequired>
              <Input name="username" id="username" type="text" placeholder="Username" ref={register} />
            </FormControl>
            <FormControl mt={6} isRequired>
              <Input name="password" id="password" type="password" placeholder="Password" ref={register} />
            </FormControl>
            <Button type="submit" width="full" mt={4}>
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default IndexPage;
