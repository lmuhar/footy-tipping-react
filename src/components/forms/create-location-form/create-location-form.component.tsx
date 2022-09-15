import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface CreateLocationInputs {
  name: string;
}

const LoginPage: NextPage = () => {
  const [submitError, setSubmitError] = useState<boolean>(false);
  const toast = useToast();

  const updateMutation = useMutation(async (input: CreateLocationInputs) => {
    return await axios.post(`/api/locations`, input);
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateLocationInputs>();

  const onSubmit = (input: CreateLocationInputs) => {
    setSubmitError(false);
    updateMutation.mutateAsync(input, {
      onSuccess: () => {
        reset();
        toast({
          title: 'Location created.',
          description: "We've created a new location.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left'
        });
      },
      onError: () => setSubmitError(true),
    });
  };

  return (
    <Stack spacing="8">
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing="5">
        <Heading size="md">Create Location</Heading>
        <Divider />
        {/* Date End */}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="email">Name</FormLabel>
          <Input
            id="username"
            type="string"
            {...register('name', {
              required: 'This is required',
              minLength: { value: 5, message: 'Name must be no shorter than 5 characters'}
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>

        {/* Submit */}
        <Stack spacing="4">
          <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
            Create Location
          </Button>
          {submitError && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              Oops! Something went wrong. Try again shortly.
            </Text>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
