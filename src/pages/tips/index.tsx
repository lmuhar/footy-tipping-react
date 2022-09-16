import { NextPage } from 'next';
import { ApplicationShell } from 'layouts/application-shell';
import useTokenData from 'custom-hooks/useTokenData.hook';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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

const ViewTips: NextPage = () => {
  const { user: _user } = useTokenData();
  const { data } = useQuery(['latestRoundWithGames'], async () => (await axios.get('/api/rounds/latest')).data);

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
              <Table variant="simple">
                <TableCaption>Round {data.roundNumber} Tips</TableCaption>
                <Thead>
                  <Tr>
                    <Th>User</Th>
                    <Th>Home</Th>
                    <Th>Away</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.tips &&
                    data.tips.map((tip: any) => (
                      <Tr key={tip.id}>
                        <Td>
                          <HStack>
                            <Avatar size="sm" name={tip.user.username} />
                            <Text>{tip.user.username}</Text>
                          </HStack>
                        </Td>
                        <Td>
                          <HStack>
                            <Text>{tip.game.homeTeam.name}</Text>
                            {tip.selectedTip.id === tip.game.homeTeam.id && <Text>👈</Text>}
                          </HStack>
                        </Td>
                        <Td>
                          <HStack>
                            <Text>{tip.game.awayTeam.name}</Text>
                            {tip.selectedTip.id === tip.game.awayTeam.id && <Text>👈</Text>}{' '}
                          </HStack>
                        </Td>
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
