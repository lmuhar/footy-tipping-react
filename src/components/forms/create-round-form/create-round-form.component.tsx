import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface CreateRoundInputs {
  roundNumber: number;
  dateStart: Date;
  dateEnd: Date;
}

const CreateRoundForm = () => {
  const queryClient = useQueryClient();

  const [submitError, setSubmitError] = useState<boolean>(false);
  const toast = useToast();

  const updateMutation = useMutation(async (input: CreateRoundInputs) => {
    return await axios.post(`/api/rounds`, input);
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateRoundInputs>();

  const onSubmit = (input: CreateRoundInputs) => {
    setSubmitError(false);
    updateMutation.mutateAsync(input, {
      onSuccess: () => {
        reset();
        toast({
          title: 'Round created.',
          description: "We've created a new round.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
        queryClient.invalidateQueries(['rounds']);
      },
      onError: () => setSubmitError(true),
    });
  };

  return (
    <Stack spacing="8">
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing="5">
        {/* Round Number */}
        <FormControl isInvalid={!!errors.roundNumber}>
          <FormLabel htmlFor="round-number">Round Number</FormLabel>
          <NumberInput>
            <NumberInputField
              id="round-number"
              {...register('roundNumber', {
                valueAsNumber: true,
                value: 0,
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors.roundNumber && errors.roundNumber.message}</FormErrorMessage>
        </FormControl>

        {/* Date Start */}
        <FormControl isInvalid={!!errors.dateStart}>
          <FormLabel htmlFor="date-start">Date Start</FormLabel>
          <Input
            id="date-start"
            type="date"
            {...register('dateStart', {
              required: 'This is required',
            })}
          />
          <FormErrorMessage>{errors.dateStart && errors.dateStart.message}</FormErrorMessage>
        </FormControl>

        {/* Date End */}
        <FormControl isInvalid={!!errors.dateEnd}>
          <FormLabel htmlFor="end-start">Date End</FormLabel>
          <Input
            id="end-start"
            type="date"
            {...register('dateEnd', {
              required: 'This is required',
            })}
          />
          <FormErrorMessage>{errors.dateEnd && errors.dateEnd.message}</FormErrorMessage>
        </FormControl>

        {/* Submit */}
        <Stack spacing="4">
          <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
            Create Round
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

export default CreateRoundForm;
