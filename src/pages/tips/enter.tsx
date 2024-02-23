import { NextPage } from 'next';
import { Button, Divider, Flex, Heading, HStack, Select, Stack, Text, useToast, VStack } from '@chakra-ui/react';
import { ApplicationShell } from 'layouts/application-shell';
import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import useTokenData from 'custom-hooks/useTokenData.hook';
import { Card } from 'components/card';
import { format, parseISO } from 'date-fns';
import { AFLLadder } from 'components/afl-ladder';
import { trpc } from 'utils/trpc';

const LoginPage: NextPage = () => {
  const utils = trpc.useUtils();
  const toast = useToast();
  const { user } = useTokenData();

  const { data: rounds, refetch } = trpc.roundForUser.useQuery(user?.id || '', { enabled: !!user });

  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  const roundList = useMemo(() => {
    if (!rounds) return [];
    return rounds.map(({ id, roundNumber }) => ({ id, roundNumber }));
  }, [rounds]);

  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);

  const round = useMemo(() => {
    if (!rounds || !selectedRoundId) return null;
    return rounds.find((round) => round.id === selectedRoundId);
  }, [rounds, selectedRoundId]);

  const enterTipMutation = trpc.upsertTip.useMutation();

  const handleSetTipOnClick = (round: string, game: string, selectedTip: string) => async () => {
    if (!user) return;

    enterTipMutation.mutateAsync(
      { roundId: round, gameId: game, selectedTipId: selectedTip, userId: user.id },
      {
        onSuccess: () => {
          toast({
            title: 'Tip Entered!',
            description: "We've entered your tip for this game.",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
          });
          utils.roundForUser.invalidate(user?.id);
          refetch();
        },
        onError: () => {
          toast({
            title: 'Whoops!',
            description: 'Something went wrong setting the winner',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
          });
        },
      },
    );
  };

  const handleRoundSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    setSelectedRoundId(e.target.value);
  };

  return (
    <ApplicationShell>
      <Stack spacing={12}>
        <Card>
          <Heading size="md" mb="2">
            Enter Tips
          </Heading>
          <Select placeholder="Select Round" mb="6" onChange={handleRoundSelect}>
            {roundList &&
              roundList.map((round) => (
                <option key={round.id} value={round.id}>
                  {round.roundNumber}
                </option>
              ))}
          </Select>
          {round && (
            <VStack alignItems="flex-start" w="full">
              <HStack>
                <Text>Round {round.roundNumber}:</Text>
                <Text>
                  {format(parseISO(round.dateStart), 'dd/MM/yyyy')} - {format(parseISO(round.dateEnd), 'dd/MM/yyyy')}
                </Text>
              </HStack>
              <Divider />
              <VStack w="full" spacing="4">
                {round.games &&
                  round.games.map((game) => (
                    <HStack key={game.id} w="full" bg="gray.100" px="2" py="4" rounded="md">
                      {/*  HOME  */}
                      <Flex flex="1" alignItems="center" justifyContent="center">
                        {game.result && game.result.id === game.homeTeam.id && (
                          <Text fontSize="2xl" mr="2">
                            👑
                          </Text>
                        )}
                        <VStack>
                          <Heading size="md">{game.homeTeam.name}</Heading>
                          <Button
                            size="xs"
                            variant="solid"
                            colorScheme="blue"
                            isDisabled={game.tip.length}
                            onClick={handleSetTipOnClick(round.id, game.id, game.homeTeam.id)}
                          >
                            Place Tip
                          </Button>
                        </VStack>
                        {!!game.tip.length && game.tip[0].selectedTipId === game.homeTeam.id && (
                          <Text fontSize="2xl" mr="2">
                            👈
                          </Text>
                        )}
                      </Flex>

                      <Flex flex="1" alignItems="center" justifyContent="center">
                        <VStack>
                          <Heading size="sm">{game.location.name}</Heading>
                          <Heading size="sm">{format(parseISO(game.startDateTime), 'dd/MM hh:mm aa')}</Heading>
                        </VStack>
                      </Flex>

                      {/* AWAY */}
                      <Flex flex="1" alignItems="center" justifyContent="center">
                        {game.result && game.result.id === game.awayTeam.id && (
                          <Text fontSize="2xl" mr="2">
                            👑
                          </Text>
                        )}
                        <VStack>
                          <Heading size="md">{game.awayTeam.name}</Heading>
                          <Button
                            size="xs"
                            variant="solid"
                            colorScheme="blue"
                            isDisabled={game.tip.length}
                            onClick={handleSetTipOnClick(round.id, game.id, game.awayTeam.id)}
                          >
                            Place Tip
                          </Button>
                        </VStack>
                        {!!game.tip.length && game.tip[0].selectedTipId === game.awayTeam.id && (
                          <Text fontSize="2xl" mr="2">
                            👈
                          </Text>
                        )}
                      </Flex>
                    </HStack>
                  ))}
              </VStack>
            </VStack>
          )}
        </Card>
        <Card>
          <AFLLadder />
        </Card>
      </Stack>
    </ApplicationShell>
  );
};

export default LoginPage;
