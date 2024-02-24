import {
  Avatar,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { api } from "~/utils/api";

const UserList = () => {
  const { data } = api.getUsers.useQuery();

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
              {data.map((user) => (
                <Tr key={user.name}>
                  <Td display="flex" alignItems="center">
                    <Avatar name={user.name ?? undefined} size="xs" mr="2" />
                    {user.name}
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
