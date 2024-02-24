import { Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { api} from '~/utils/api';

const LocationList = () => {
  const { data } = api.getTeams.useQuery();

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
              {data.map((team) => (
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
