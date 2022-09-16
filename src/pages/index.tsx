import to from 'await-to-js';
import { GetServerSideProps, NextPage } from 'next';
import { fetchAllUsersTipCount, fetchLadder, fetchLatestRoundId, Ladder } from 'data';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
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

const UserLadder = () => {
  const { data: usersWithTips } = useQuery(['usersWithTips'], async () => (await axios.get('/api/users/tips')).data);

  const { data: roundId } = useQuery(['roundId'], async () => (await axios.get('/api/rounds/latest')).data.id);

  const tableData = useMemo(() => {
    if (!usersWithTips || !usersWithTips.length || !roundId) return [];

    const info: any[] = [];
    usersWithTips.forEach((userWithTip: any) => {
      let total = 0;
      let lastRound = 0;

      userWithTip.tips.forEach((tip: any) => {
        if (tip.selectedTip && tip.game.result && tip.selectedTip.id === tip.game.result.id) {
          total = total + 1;
          if (roundId[0].id === tip.game.roundId) {
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
    <TableContainer borderRadius="md" overflow="hidden" w="full">
      <Table position="relative">
        <TableCaption>Leader board</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Last Round</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((rowData: any) => (
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

interface PageProps {
  ladder: Ladder;
  usersWithTips: any[];
  roundId: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (_context) => {
  const [_fetchLadderErr, ladder] = await to(fetchLadder());
  const [_fetchUsersWithTipsError, usersWithTips] = await to(fetchAllUsersTipCount());
  const [_fetchLatestRoundIdError, roundId] = await to(fetchLatestRoundId());

  return {
    props: {
      ladder: ladder || [],
      usersWithTips: usersWithTips || [],
      roundId: roundId || '',
    },
  };
};

const IndexPage: NextPage<PageProps> = (props) => {
  return (
    <ApplicationShell>
      <VStack spacing={8}>
        <Card w="full">
          <UserLadder initialUsersWithTips={props.usersWithTips} initialRoundId={props.roundId} />
        </Card>
        <Card w="full">
          <AFLLadder initialLadder={props.ladder} />
        </Card>
      </VStack>
    </ApplicationShell>
  );
};

export default IndexPage;
