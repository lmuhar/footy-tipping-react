import * as React from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  Input,
  Button
} from '@chakra-ui/core';

const LoginForm: React.FunctionComponent = () => {
    return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
            <form>
                <FormControl>
                    <Input type="email" placeholder="Email" />
                </FormControl>
                <FormControl mt={6}>
                  <Input type="Password" placeholder="Password" />
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