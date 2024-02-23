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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTokenData from 'custom-hooks/useTokenData.hook';
import { Card } from 'components/card';
import { trpc } from 'utils/trpc';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const { user } = useTokenData();
  const { push } = useRouter();

  const [loginError, setLoginError] = useState<boolean>(false);

  const loginMutation = trpc.login.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = (input: LoginFormInputs) => {
    setLoginError(false);
    loginMutation.mutateAsync(input, {
      onSuccess: (res) => {
        localStorage.setItem('token', res.token);
        push('/');
      },
      onError: () => setLoginError(true),
    });
  };

  useEffect(() => {
    if (user) push('/');
  }, [user, push]);

  return (
    <ApplicationShell>
      <Card>
        <Stack spacing="8">
          {/*  Hero */}
          <Stack spacing="6">
            <Stack spacing="3" textAlign="center">
              <Heading size="md">Log in to your account</Heading>
              <Text color="muted">There are tips to be made</Text>
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
              {loginError && (
                <Text color="red.500" fontSize="sm" textAlign="center">
                  Oops! Something went wrong trying to log in. Try again shortly.
                </Text>
              )}
            </Stack>
          </Stack>

          {/* Register */}
          <HStack spacing="1" justify="center">
            <Text fontSize="sm" color="muted">
              Don&apos;t have an account?
            </Text>
            <NextLink href="/register" passHref>
              <Button as="a" variant="link" colorScheme="blue" size="sm">
                Sign up
              </Button>
            </NextLink>
          </HStack>
        </Stack>
      </Card>
    </ApplicationShell>
  );
};

export default LoginPage;
