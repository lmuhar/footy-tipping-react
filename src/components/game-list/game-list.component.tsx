import { Select, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ChangeEventHandler, useMemo, useState } from 'react';
import { trpc } from 'utils/trpc';

const UserList = () => {
  const { data: rounds } = trpc.getRounds.useQuery();
  const { data: games } = trpc.getGames.useQuery();

  const [roundId, setRoundId] = useState<string | null>(null);

  const handleRoundSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    setRoundId(e.target.value);
  };

  const roundGames = useMemo(() => {
    if (!games) return [];
    return games.filter((game) => game.roundId === roundId);
  }, [roundId, games]);

  return (
    <Stack>
      <Select placeholder="Select Round" onChange={handleRoundSelect}>
        {rounds &&
          rounds.map((round) => (
            <option key={round.id} value={round.id}>
              {round.roundNumber}
            </option>
          ))}
      </Select>
      {games && (
        <TableContainer borderRadius="md" overflow="hidden" w="full">
          <Table position="relative">
            <TableCaption>Games</TableCaption>
            <Thead>
              <Tr>
                <Th>Location</Th>
                <Th>Home</Th>
                <Th>Away</Th>
              </Tr>
            </Thead>
            <Tbody>
              {roundGames.map((game) => (
                <Tr key={game.id}>
                  <Td>{game.location.name}</Td>
                  <Td>{game.homeTeam.name}</Td>
                  <Td>{game.awayTeam.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default UserList;
