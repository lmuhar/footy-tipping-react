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
import { Card } from 'components/card';

interface UpdateProfileInputs {
  username: string;
}

const LoginPage: NextPage = () => {
  const { user } = useTokenData();
  const { push } = useRouter();

  const [updateError, setUpdateError] = useState<boolean>(false);

  const updateMutation = useMutation(async (input: UpdateProfileInputs) => {
    if (!user) throw new Error('No user stored');
    return await axios.put(`/api/users/${user.id}`, input);
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInputs>();

  const onSubmit = (input: UpdateProfileInputs) => {
    setUpdateError(false);
    updateMutation.mutateAsync(input, {
      onSuccess: (res) => {
        localStorage.setItem('token', res.data.token);
        push('/');
      },
      onError: () => setUpdateError(true),
    });
  };

  useEffect(() => {
    if (user && user?.role !== 'admin') push('/');
  }, [user, push]);

  return (
    <ApplicationShell>
      <Card>
        <Stack spacing="8">
          {/*  Hero */}
          <Stack spacing="6">
            <Stack spacing="3" textAlign="center">
              <Heading size="md">Hey, {user?.username}</Heading>
              <Text color="muted">Did you want to change your username?</Text>
            </Stack>
          </Stack>

          {/*  Form */}
          <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing="5">
            {/* Username */}
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor="email">Username</FormLabel>
              <Input
                id="username"
                placeholder="Enter a new username"
                {...register('username', {
                  required: 'This is required',

                  minLength: { value: 5, message: 'Minimum length should be 5' },
                })}
              />
              <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
            </FormControl>

            <Stack spacing="4">
              <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
                Update
              </Button>
              {updateError && (
                <Text color="red.500" fontSize="sm" textAlign="center">
                  Oops! Something went wrong. Try again shortly.
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
