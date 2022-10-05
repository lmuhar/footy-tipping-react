import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const LocationList = () => {
  const { data } = useQuery(['teams'], async () => (await axios.get('/api/teams')).data);

  return (
    <Stack>
      {data && (
        <TableContainer borderRadius="md" overflow="hidden" w="full">
          <Table position="relative">
            <TableCaption>Teams</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((team: any) => (
                <Tr key={team.id}>
                  <Td>{team.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default LocationList;
