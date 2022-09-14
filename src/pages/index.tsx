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
  Spinner,
  Stack,
  Center,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { ApplicationShell } from 'layouts/application-shell';

const UserLadder = (props: { initialUsersWithTips: any[]; initialRoundId: string }) => {
  const { data: usersWithTips, isLoading: isLoadingUsersWithTips } = useQuery(
    ['usersWithTips'],
    async () => (await axios.get('/api/users/tips')).data,
    {
      initialData: props.initialUsersWithTips,
    },
  );

  const { data: roundId, isLoading: isLoadingRoundId } = useQuery(
    ['roundId'],
    async () => (await axios.get('/api/rounds/latest/id')).data,
    {
      initialData: props.initialRoundId,
    },
  );

  const tableData = useMemo(() => {
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
        {(isLoadingUsersWithTips || isLoadingRoundId) && (
          <Stack position="absolute" bg="gray.300" opacity="70%" top="0" bottom="0" left="0" right="0">
            <Center my="auto">
              <Spinner size="lg" />
            </Center>
          </Stack>
        )}
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
              <Td>{rowData.name}</Td>
              <Td isNumeric>{rowData.lastRound}</Td>
              <Td isNumeric>{rowData.total}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const AFLLadder = (props: { initialLadder: any[] }) => {
  const { data, isLoading } = useQuery(['ladder'], async () => (await axios.get<Ladder>('/api/ladder')).data, {
    initialData: props.initialLadder,
  });

  return (
    <TableContainer borderRadius="md" overflow="hidden" w="full">
      <Table position="relative">
        {isLoading && (
          <Stack position="absolute" bg="gray.300" opacity="70%" top="0" bottom="0" left="0" right="0">
            <Center my="auto">
              <Spinner size="lg" />
            </Center>
          </Stack>
        )}
        <TableCaption>AFL Ladder</TableCaption>
        <Thead>
          <Tr>
            <Th isNumeric>No.</Th>
            <Th>Team</Th>
            <Th isNumeric>Percent</Th>
            <Th isNumeric>Points</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((rowData: any) => (
            <Tr key={rowData.name}>
              <Td isNumeric>{rowData.order}</Td>
              <Td>{rowData.name}</Td>
              <Td isNumeric>{rowData.percent}</Td>
              <Td isNumeric>{rowData.points}</Td>
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
        <UserLadder initialUsersWithTips={props.usersWithTips} initialRoundId={props.roundId} />
        <Divider />
        <AFLLadder initialLadder={props.ladder} />
      </VStack>
    </ApplicationShell>
  );
};

export default IndexPage;
