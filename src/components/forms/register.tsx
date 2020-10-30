import * as React from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  Input,
  Button
} from '@chakra-ui/core';

const RegisterForm: React.FunctionComponent = () => {
    return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
            <form>
                <FormControl>
                    <Input type="email" placeholder="Email" />
                </FormControl>
                <FormControl mt={6}>
                    <Input type="text" placeholder="Username" />
                </FormControl>
                <FormControl mt={6}>
                    <Input type="password" placeholder="Password" />
                </FormControl>
                <Button type="submit" width="full" mt={4}>
                    Register
                </Button>
            </form>
        </Box>
      </Box>
    </Flex>
    );
}

export default RegisterForm;