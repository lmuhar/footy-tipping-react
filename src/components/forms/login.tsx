import * as React from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  FormLabel
} from '@chakra-ui/core';
// import { useDispatch } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import { userLogin } from '../../redux/user/user.types';

const LoginForm: React.FunctionComponent = () => {
    // const { handleSubmit, register } = useForm();
    // const dispatch = useDispatch();
    const onSubmit = (e: any) => {
      console.log(e);
      // dispatch(userLogin(e));
    }

    return (
      <Flex direction="column" align="center" justify= "center">
        <Flex justify="center" align="center" w="100%" h="93vh">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
            <form onSubmit={onSubmit}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" type="email" placeholder="Email" />
                </FormControl>
                <FormControl mt={6} isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input name="username" type="username" placeholder="Username"/>
                </FormControl>
                <FormControl mt={6} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input name="password" type="password" placeholder="Password" />
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
}

// <form onSubmit={handleSubmit(onSubmit)}>

export default LoginForm;