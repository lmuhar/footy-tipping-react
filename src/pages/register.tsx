import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ApplicationShell } from 'layouts/application-shell';
import NextLink from 'next/link';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTokenData from 'custom-hooks/useTokenData.hook';

interface RegisterFormInputs {
  email: string;
  username: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const { user } = useTokenData();
  const { push } = useRouter();

  const [registerError, setRegisterError] = useState<boolean>(false);

  const registerMutation = useMutation(async (input: RegisterFormInputs) => {
    return await axios.post('/api/users/register', input);
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const onSubmit = (input: RegisterFormInputs) => {
    setRegisterError(false);
    registerMutation.mutateAsync(input, {
      onSuccess: (res) => {
        localStorage.setItem('token', res.data.token);
        push('/');
      },
      onError: () => setRegisterError(true),
    });
  };

  useEffect(() => {
    if (user) push('/');
  }, [user, push]);

  return (
    <ApplicationShell>
      <Stack spacing="8">
        {/*  Hero */}
        <Stack spacing="6">
          <Stack spacing="3" textAlign="center">
            <Heading size="md">Register for an account</Heading>
            <Text color="muted">Start tipping with friends today</Text>
          </Stack>
        </Stack>

        {/*  Form */}
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing="5">
          {/* Email */}
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'This is required',

                minLength: { value: 5, message: 'Minimum length should be 5' },
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>

          {/* Username */}
          <FormControl isInvalid={!!errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="username"
              placeholder="Choose a memorable username"
              {...register('username', {
                required: 'This is required',

                minLength: { value: 5, message: 'Minimum length should be 5' },
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>

          {/* Password */}
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...register('password', {
                required: 'This is required',
                minLength: { value: 8, message: 'Minimum length should be 8' },
              })}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <Stack spacing="4">
            <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
              Sign in
            </Button>
            {registerError && (
              <Text color="red.500" fontSize="sm" textAlign="center">
                Oops! Something went wrong trying to register your account. Try again shortly.
              </Text>
            )}
          </Stack>
        </Stack>

        {/* Register */}
        <HStack spacing="1" justify="center">
          <Text fontSize="sm" color="muted">
            Already have an account?
          </Text>
          <NextLink href="/login" passHref>
            <Button as="a" variant="link" colorScheme="blue" size="sm">
              Log in
            </Button>
          </NextLink>
        </HStack>
      </Stack>
    </ApplicationShell>
  );
};

export default LoginPage;
