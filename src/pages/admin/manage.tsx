import type { NextPage } from 'next';
import { Box, Button, Card, Divider, HStack, Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import { format, parseISO } from 'date-fns';

const LoginPage: NextPage = () => {
  const utils = api.useUtils();
  const { data } = useSession();
  const { push } = useRouter();

  const { data: seasons } = api.fetchSeasons.useQuery();

  useEffect(() => {
    if (data?.user.role !== 'admin') void push('/');
  }, [push, data?.user.role]);

  const createSeasonMutation = api.createSeason.useMutation();

  const handleCreateSeason = () => {
    createSeasonMutation.mutate({
      year: '2024',
      roundsCount: 24,
      startWeek: '2024-04-07T00:00:00Z',
    });
    void utils.fetchSeasons.invalidate();
  };

  return (
    <Box color="black">
      <Heading size="lg">Manage</Heading>

      <Box>{JSON.stringify(seasons)}</Box>

      <VStack p="12" alignItems="flex-start">
        <Heading size="lg">Seasons</Heading>
        {seasons?.map((season) => (
          <Box key={season.id}>
            <HStack>
              <Heading size="md">{season.year} Season</Heading>
              <Button colorScheme="blue" onClick={handleCreateSeason}>
                Create new
              </Button>
            </HStack>
            <Divider />
            <VStack alignItems="flex-start">
              {season.rounds.map((round) => (
                <Card key={round.id} w="full" py="8" px="6">
                  <Heading size="sm">Round {round.roundNumber}</Heading>
                  <HStack>
                    <Box>{format(parseISO(round.dateStart), 'PPP')}</Box>
                    <Box>{format(parseISO(round.dateEnd), 'PPP')}</Box>
                    <Box>{round._count.games} Games</Box>
                  </HStack>
                </Card>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default LoginPage;
