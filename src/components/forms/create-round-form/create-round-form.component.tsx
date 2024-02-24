import { useForm } from "react-hook-form";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "~/utils/api";

interface CreateRoundInputs {
  roundNumber: number;
  dateStart: Date;
  dateEnd: Date;
}

const CreateRoundForm = () => {
  const utils = api.useUtils();

  const [submitError, setSubmitError] = useState<boolean>(false);
  const toast = useToast();

  const updateMutation = api.addRound.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateRoundInputs>();

  const onSubmit = (input: CreateRoundInputs) => {
    setSubmitError(false);
    void updateMutation.mutateAsync(
      {
        roundNumber: input.roundNumber,
        dateStart: input.dateStart.toISOString(),
        dateEnd: input.dateEnd.toISOString(),
      },
      {
        onSuccess: () => {
          reset();
          toast({
            title: "Round created.",
            description: "We've created a new round.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          void utils.getRounds.invalidate();
        },
        onError: () => setSubmitError(true),
      }
    );
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
              {...register("roundNumber", {
                valueAsNumber: true,
                value: 0,
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors.roundNumber?.message}</FormErrorMessage>
        </FormControl>

        {/* Date Start */}
        <FormControl isInvalid={!!errors.dateStart}>
          <FormLabel htmlFor="date-start">Date Start</FormLabel>
          <Input
            id="date-start"
            type="date"
            {...register("dateStart", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>{errors.dateStart?.message}</FormErrorMessage>
        </FormControl>

        {/* Date End */}
        <FormControl isInvalid={!!errors.dateEnd}>
          <FormLabel htmlFor="end-start">Date End</FormLabel>
          <Input
            id="end-start"
            type="date"
            {...register("dateEnd", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>{errors.dateEnd?.message}</FormErrorMessage>
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
