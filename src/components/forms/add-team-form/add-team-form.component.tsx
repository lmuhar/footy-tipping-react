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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface AddTeamInputs {
  name: string;
}

const AddTeamForm = () => {
  const queryClient = useQueryClient()
  const [submitError, setSubmitError] = useState<boolean>(false);
  const toast = useToast();

  const updateMutation = useMutation(async (input: AddTeamInputs) => {
    return await axios.post(`/api/teams`, input);
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddTeamInputs>();

  const onSubmit = (input: AddTeamInputs) => {
    setSubmitError(false);
    updateMutation.mutateAsync(input, {
      onSuccess: () => {
        reset();
        toast({
          title: 'Team Name created.',
          description: "We've created a new team name.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left'
        });
        queryClient.invalidateQueries(['teams'])
      },
      onError: () => setSubmitError(true),
    });
  };

  return (
    <Stack spacing="8">
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing="5">
        <Heading size="md">Create Team</Heading>
        <Divider />
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="team-name">Team Name</FormLabel>
          <Input
            id="team-name"
            type="string"
            placeholder='Richmond Tigers'
            {...register('name', {
              required: 'This is required',
              minLength: { value: 5, message: 'Name must be no shorter than 5 characters'}
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <Stack spacing="4">
          <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
            Create Team
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

export default AddTeamForm;
