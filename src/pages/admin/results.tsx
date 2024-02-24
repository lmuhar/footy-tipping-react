import type { NextPage } from 'next';
import { Button, Divider, Flex, Heading, HStack, Stack, Text, useToast, VStack } from '@chakra-ui/react';
import { ApplicationShell } from '~/layouts/application-shell';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Card } from '~/components/card';
import { format, parseISO } from 'date-fns';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';

const LoginPage: NextPage = () => {
  const utils = api.useUtils();
  const toast = useToast();
  const { data: userData } = useSession();
  const { push } = useRouter();

  const { data } = api.getLatestRoundWithGames.useQuery();

  const updateMutation = api.updateGameResult.useMutation();

  useEffect(() => {
    if (userData?.user.role !== 'admin') void push('/');
  }, [push, userData?.user.role]);

  const handleSetWinnerOnClick = (gameId: string, teamId: string) => async () => {
    void updateMutation.mutateAsync(
      { gameId, teamId },
      {
        onSuccess: () => {
          toast({
            title: 'Set winner!',
            description: "We've set the winner for this game.",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
          });
          void utils.getLatestRoundWithGames.invalidate();
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

  return (
    <ApplicationShell>
      <Stack spacing={12}>
        <Card>
          <Heading size="md" mb="2">
            Record Results
          </Heading>
          {data && (
            <VStack alignItems="flex-start" w="full">
              <HStack>
                <Text>Round {data.roundNumber}:</Text>
                <Text>
                  {format(parseISO(data.dateStart), 'dd/MM/yyyy')} - {format(parseISO(data.dateEnd), 'dd/MM/yyyy')}
                </Text>
              </HStack>
              <Divider />
              <VStack w="full" spacing="4">
                {data.games?.map((game) => (
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
                            onClick={handleSetWinnerOnClick(game.id, game.homeTeam.id)}
                          >
                            Set Winner
                          </Button>
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
                            onClick={handleSetWinnerOnClick(game.id, game.awayTeam.id)}
                          >
                            Set Winner
                          </Button>
                        </VStack>
                      </Flex>
                    </HStack>
                  ))}
              </VStack>
            </VStack>
          )}
        </Card>
      </Stack>
    </ApplicationShell>
  );
};

export default LoginPage;