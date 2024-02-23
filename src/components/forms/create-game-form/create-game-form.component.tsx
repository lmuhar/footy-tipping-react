import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { trpc } from 'utils/trpc';

interface CreateGameInputs {
  round: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  startDate: string;
  startTime: string;
}

const CreateGameForm = () => {
  const utils = trpc.useUtils();

  const { data: rounds } = trpc.getRounds.useQuery();

  const { data: teams } = trpc.getTeams.useQuery();

  const { data: locations } = trpc.getLocations.useQuery();

  const [submitError, setSubmitError] = useState<boolean>(false);
  const toast = useToast();

  const updateMutation = trpc.createGame.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateGameInputs>();

  const onSubmit = (input: CreateGameInputs) => {
    const { startDate, startTime, ...rest } = input;
    const startDateTime = `${startDate}T${startTime}:00`;
    setSubmitError(false);
    updateMutation.mutateAsync(
      { ...rest, startDateTime },
      {
        onSuccess: () => {
          reset();
          toast({
            title: 'Game created.',
            description: "We've created a new game.",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
          });
          utils.getGames.invalidate();
        },
        onError: () => setSubmitError(true),
      },
    );
  };

  return (
    <Stack spacing="8">
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing="5">
        {/* Round */}
        <FormControl isInvalid={!!errors.round}>
          <FormLabel htmlFor="round-number">Round</FormLabel>
          <Select
            placeholder="Select Round"
            {...register('round', { value: '', required: { value: true, message: 'Please select a round' } })}
          >
            {rounds &&
              rounds.map((round) => (
                <option key={round.id} value={round.id}>
                  {round.roundNumber}
                </option>
              ))}
          </Select>
          <FormErrorMessage>{errors.round && errors.round.message}</FormErrorMessage>
        </FormControl>

        {/* Home Team */}
        <FormControl isInvalid={!!errors.homeTeam}>
          <FormLabel htmlFor="home-team">Home Team</FormLabel>
          <Select
            placeholder="Select Team"
            {...register('homeTeam', { value: '', required: { value: true, message: 'Please select a team' } })}
          >
            {teams &&
              teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
          </Select>
          <FormErrorMessage>{errors.homeTeam && errors.homeTeam.message}</FormErrorMessage>
        </FormControl>

        {/* Away Team */}
        <FormControl isInvalid={!!errors.awayTeam}>
          <FormLabel htmlFor="away-team">Away Team</FormLabel>
          <Select
            placeholder="Select Team"
            {...register('awayTeam', { value: '', required: { value: true, message: 'Please select a team' } })}
          >
            {teams &&
              teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
          </Select>
          <FormErrorMessage>{errors.awayTeam && errors.awayTeam.message}</FormErrorMessage>
        </FormControl>

        {/* Locations */}
        <FormControl isInvalid={!!errors.location}>
          <FormLabel htmlFor="away-team">Location</FormLabel>
          <Select
            placeholder="Select Location"
            {...register('location', { value: '', required: { value: true, message: 'Please select a team' } })}
          >
            {locations &&
              locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
          </Select>
          <FormErrorMessage>{errors.location && errors.location.message}</FormErrorMessage>
        </FormControl>

        {/* Date Start */}
        <FormControl isInvalid={!!errors.startDate || !!errors.startTime}>
          <FormLabel htmlFor="date-start">Start Date/Time</FormLabel>
          <Stack direction={['column', 'row']} w="full">
            <VStack flex="1">
              <Input
                id="start-date"
                type="date"
                {...register('startDate', {
                  required: 'A date is required',
                })}
              />
              <FormErrorMessage>{errors.startDate && errors.startDate.message}</FormErrorMessage>
            </VStack>
            <VStack flex="1">
              <Input
                id="startTime"
                type="time"
                {...register('startTime', {
                  required: 'A time is required',
                })}
              />
              <FormErrorMessage>{errors.startTime && errors.startTime.message}</FormErrorMessage>
            </VStack>
          </Stack>
        </FormControl>

        {/* Submit */}
        <Stack spacing="4">
          <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
            Create Game
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

export default CreateGameForm;
