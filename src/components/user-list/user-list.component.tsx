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

const UserList = () => {
  const { data, isLoading } = useQuery(['users'], async () => (await axios.get('/api/users')).data);

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
            <TableCaption>Users</TableCaption>
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((user: any) => (
                <Tr key={user.username}>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
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
