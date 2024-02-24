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
import { api} from '~/utils/api';

interface CreateLocationInputs {
  name: string;
}

const CreateLocationForm = () => {
  const utils = api.useUtils();
  const [submitError, setSubmitError] = useState<boolean>(false);
  const toast = useToast();

  const updateMutation = api.addLocation.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateLocationInputs>();

  const onSubmit = (input: CreateLocationInputs) => {
    setSubmitError(false);
    void updateMutation.mutateAsync(input.name, {
      onSuccess: () => {
        reset();
        toast({
          title: 'Location created.',
          description: "We've created a new location.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
        void utils.getLocations.invalidate();
      },
      onError: () => setSubmitError(true),
    });
  };

  return (
    <Stack spacing="8">
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing="5">
        <Heading size="md">Create Location</Heading>
        <Divider />
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="location">Location Name</FormLabel>
          <Input
            id="location"
            type="text"
            placeholder="MCG"
            {...register('name', {
              required: 'This is required',
              minLength: { value: 3, message: 'Name must be no shorter than 3 characters' },
            })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
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

export default CreateLocationForm;
