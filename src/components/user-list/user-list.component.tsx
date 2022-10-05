import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const UserList = () => {
  const { data } = useQuery(['users'], async () => (await axios.get('/api/users')).data);

  return (
    <Stack>
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
                  <Td display="flex" alignItems="center">
                    <Avatar name={user.username} size="xs" mr="2" />
                    {user.username}
                  </Td>
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
