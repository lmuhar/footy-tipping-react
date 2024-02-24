import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { api} from '~/utils/api';

const AFLLadder = () => {
  const { data } = api.ladder.useQuery();

  return (
    <TableContainer borderRadius="md" overflow="hidden" w="full">
      <Table position="relative">
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
          {data?.map((rowData) => (
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

export default AFLLadder;
