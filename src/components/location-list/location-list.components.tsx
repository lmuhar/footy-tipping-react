import { Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { api} from '~/utils/api';

const LocationList = () => {
  const { data } = api.getLocations.useQuery();

  return (
    <Stack>
      {data && (
        <TableContainer borderRadius="md" overflow="hidden" w="full">
          <Table position="relative">
            <TableCaption>Locations</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((location) => (
                <Tr key={location.id}>
                  <Td>{location.name}</Td>
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
