import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Select, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ChangeEventHandler, useMemo, useState } from 'react';

const UserList = () => {
  const { data: rounds } = useQuery(['rounds'], async () => (await axios.get('/api/rounds')).data);
  const { data: games } = useQuery(['games'], async () => (await axios.get('/api/games')).data);

  const [roundId, setRoundId] = useState<string | null>(null);

  const handleRoundSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    setRoundId(e.target.value);
  };

  const roundGames = useMemo(() => {
    if (!games) return [];
    return games.filter((game: any) => game.roundId === roundId);
  }, [roundId, games]);

  return (
    <Stack>
      <Select placeholder="Select Round" onChange={handleRoundSelect}>
        {rounds &&
          rounds.map((round: any) => (
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
              {roundGames.map((game: any) => (
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
