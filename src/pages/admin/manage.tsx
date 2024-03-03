import type { NextPage } from 'next';
import { Box, Button, Card, Divider, HStack, Heading, Input, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import { format, parseISO } from 'date-fns';
import { ApplicationShell } from '~/layouts/application-shell';

const LoginPage: NextPage = () => {
  const utils = api.useUtils();
  const { data } = useSession();
  const { push } = useRouter();

  const { data: seasons } = api.fetchSeasons.useQuery();

  useEffect(() => {
    if (data?.user.role !== 'admin') void push('/');
  }, [push, data?.user.role]);

  const createSeasonMutation = api.createSeason.useMutation();

  const handleCreateSeason = async () => {
    const today = new Date();
    await createSeasonMutation.mutateAsync({
      year: format(today, 'yyyy'),
      roundsCount: 1,
      startWeek: today.toISOString(),
    });
    await utils.fetchSeasons.invalidate();
  };

  return (
    <ApplicationShell>
      <Card px="6" py="3">
        <Heading size="lg" mb="2">
          Manage
        </Heading>
        <VStack alignItems="flex-start" w="full">
          <HStack w="full">
            <Heading size="lg">Seasons</Heading>
            <Button colorScheme="blue" size="sm" ml="auto" onClick={handleCreateSeason}>
              Create new
            </Button>
          </HStack>
          <Divider />
          {seasons?.map((season) => (
            <Box key={season.id} w="full">
              <HStack>
                <Heading size="md" mb="2">
                  {season.year} Season
                </Heading>
              </HStack>
              <VStack alignItems="flex-start">
                {season.rounds.map((round) => (
                  <Box px="2" py="2" key={round.id} w="full" borderColor="gray.600" borderWidth="1px" rounded="md">
                    <Heading size="sm">Round {round.roundNumber}</Heading>
                    <VStack alignItems="flex-start">
                      <HStack w="full">
                        <HStack w="full">
                          <Box>Start:</Box>
                          <Input id="date-start" type="date" value={format(parseISO(round.dateStart), 'yyyy-MM-dd')} />
                        </HStack>
                        <HStack w="full">
                          <Box>End:</Box>
                          <Input id="date-start" type="date" value={format(parseISO(round.dateEnd), 'yyyy-MM-dd')} />
                        </HStack>
                      </HStack>
                      <Box>{round._count.games} Games</Box>
                      <Button>Add Game</Button>
                    </VStack>
                  </Box>
                ))}
                <Box w="full" py="8" px="6">
                  <HStack>
                    <Button>Add Round</Button>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          ))}
        </VStack>
      </Card>
    </ApplicationShell>
  );
};

export default LoginPage;
