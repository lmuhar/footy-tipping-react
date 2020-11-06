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
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/user';
import { useForm } from 'react-hook-form';

const LoginForm: React.FunctionComponent = () => {
    const { handleSubmit, register } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (e: any) => {
      console.log(e);
      dispatch(userLogin(e));
    }

    return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" type="email" placeholder="Email" ref={register} />
                </FormControl>
                <FormControl mt={6} isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input name="username" type="username" placeholder="Username" ref={register}/>
                </FormControl>
                <FormControl mt={6} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input name="password" type="password" placeholder="Password" ref={register} />
                </FormControl>
                <Button type="submit" width="full" mt={4}>
                  Sign In
                </Button>
            </form>
        </Box>
      </Box>
    </Flex>
    );
}

export default LoginForm;