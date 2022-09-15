import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  Center,
  Spinner,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const LocationList = () => {
  const { data, isLoading } = useQuery(['locations'], async () => (await axios.get('/api/locations')).data);

  return (
    <Stack>
      {isLoading && (
        <Stack position="absolute" bg="gray.300" opacity="70%" top="0" bottom="0" left="0" right="0">
          <Center my="auto">
            <Spinner size="lg" />
          </Center>
        </Stack>
      )}
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
              {data.map((location: any) => (
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
