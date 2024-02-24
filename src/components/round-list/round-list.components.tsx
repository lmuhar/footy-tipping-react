import { Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { api} from '~/utils/api';

const RoundList = () => {
  const { data } = api.getRounds.useQuery();

  return (
    <Stack>
      {data && (
        <TableContainer borderRadius="md" overflow="hidden" w="full">
          <Table position="relative">
            <TableCaption>Rounds</TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>No.</Th>
                <Th>Start</Th>
                <Th>End</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((round) => (
                <Tr key={round.id}>
                  <Td isNumeric>{round.roundNumber}</Td>
                  <Td>{format(parseISO(round.dateStart), 'dd/MM/yyyy')}</Td>
                  <Td>{format(parseISO(round.dateEnd), 'dd/MM/yyyy')}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default RoundList;
