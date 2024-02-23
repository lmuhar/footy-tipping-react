import { NextPage } from 'next';
import {
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Table,
  VStack,
  HStack,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { ApplicationShell } from 'layouts/application-shell';
import { Card } from 'components/card';
import { AFLLadder } from 'components/afl-ladder';
import { trpc } from 'utils/trpc';

const UserLadder = () => {
  const { data: usersWithTips } = trpc.usersWithTips.useQuery();

  const { data: roundId } = trpc.roundId.useQuery();

  const tableData = useMemo(() => {
    if (!usersWithTips || !usersWithTips.length || !roundId) return [];

    const info: {
      id: string;
      name: string;
      lastRound: number;
      total: number;
    }[] = [];
    usersWithTips.forEach((userWithTip) => {
      let total = 0;
      let lastRound = 0;

      userWithTip.tips.forEach((tip) => {
        if (tip.selectedTip && tip.game.result && tip.selectedTip.id === tip.game.result.id) {
          total = total + 1;
          if (roundId === tip.game.roundId) {
            lastRound = lastRound + 1;
          }
        }
      });

      const { id, username: name } = userWithTip;

      if (total > 0)
        info.push({
          id,
          name,
          lastRound,
          total,
        });
    });

    return info.sort((a, b) => b.total - a.total);
  }, [roundId, usersWithTips]);

  return (
    <TableContainer borderRadius="md" w="full">
      <Table size="sm" position="relative">
        <TableCaption>Leader board</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Last</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((rowData) => (
            <Tr key={rowData.id}>
              <Td>
                <HStack>
                  <Avatar size="xs" name={rowData.name} />
                  <Text>{rowData.name}</Text>
                </HStack>
              </Td>
              <Td isNumeric>{rowData.lastRound}</Td>
              <Td isNumeric>{rowData.total}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const IndexPage: NextPage = () => {
  return (
    <ApplicationShell>
      <VStack spacing={8}>
        <Card w="full">
          <UserLadder />
        </Card>
        <Card w="full">
          <AFLLadder />
        </Card>
      </VStack>
    </ApplicationShell>
  );
};

export default IndexPage;
