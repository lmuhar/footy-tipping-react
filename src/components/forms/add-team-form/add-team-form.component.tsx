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
import { useState } from 'react';
import { trpc } from 'utils/trpc';

interface AddTeamInputs {
  name: string;
}

const AddTeamForm = () => {
  const utils = trpc.useUtils();
  const [submitError, setSubmitError] = useState<boolean>(false);
  const toast = useToast();

  const updateMutation = trpc.addTeam.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddTeamInputs>();

  const onSubmit = (input: AddTeamInputs) => {
    setSubmitError(false);
    updateMutation.mutateAsync(input.name, {
      onSuccess: () => {
        reset();
        toast({
          title: 'Team Name created.',
          description: "We've created a new team name.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
        utils.getTeams.invalidate();
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
            placeholder="Richmond Tigers"
            {...register('name', {
              required: 'This is required',
              minLength: { value: 5, message: 'Name must be no shorter than 5 characters' },
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
