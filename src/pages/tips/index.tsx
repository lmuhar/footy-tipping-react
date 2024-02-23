import { NextPage } from 'next';
import { ApplicationShell } from 'layouts/application-shell';
import useTokenData from 'custom-hooks/useTokenData.hook';
import {
  Avatar,
  Heading,
  HStack,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Card } from 'components/card';
import { format, parseISO } from 'date-fns';
import { trpc } from 'utils/trpc';

const ViewTips: NextPage = () => {
  const { user: _user } = useTokenData();
  const { data } = trpc.fetchLatestRound.useQuery();

  return (
    <ApplicationShell>
      <Stack>
        {data && (
          <Card>
            <Heading size="md" mb="2">
              Tips for Round {data.roundNumber}
            </Heading>
            <Text mb={2}>
              {format(parseISO(data.dateStart), 'dd/MM/yyyy')} - {format(parseISO(data.dateEnd), 'dd/MM/yyyy')}
            </Text>
            <TableContainer>
              <Table size="sm" variant="simple">
                <TableCaption>Round {data.roundNumber} Tips</TableCaption>
                <Thead>
                  <Tr>
                    <Th>User</Th>
                    <Th>Tip</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.tips &&
                    data.tips.map((tip) => (
                      <Tr key={tip.id}>
                        <Td>
                          <HStack>
                            <Avatar size="sm" name={tip.user.username} />
                            <Text>{tip.user.username}</Text>
                          </HStack>
                        </Td>
                        {tip.selectedTip.id === tip.game.homeTeam.id && (
                          <Td>
                            <HStack>
                              <Text>{tip.game.homeTeam.name}</Text>
                              {tip.game?.result?.id && tip.selectedTip.id === tip.game?.result?.id && <Text>✔️</Text>}
                              {''}
                            </HStack>
                          </Td>
                        )}
                        {tip.selectedTip.id === tip.game.awayTeam.id && (
                          <Td>
                            <HStack>
                              <Text>{tip.game.awayTeam.name}</Text>
                              {tip.game?.result?.id && tip.selectedTip.id === tip.game?.result?.id && <Text>✔️</Text>}
                              {''}
                            </HStack>
                          </Td>
                        )}
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Card>
        )}
      </Stack>
    </ApplicationShell>
  );
};

export default ViewTips;
