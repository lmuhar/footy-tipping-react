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
import { format, parseISO } from 'date-fns';

const RoundList = () => {
  const { data, isLoading } = useQuery(['rounds'], async () => (await axios.get('/api/rounds')).data);

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
            <TableCaption>Rounds</TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>No.</Th>
                <Th>Start</Th>
                <Th>End</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((round: any) => (
                <Tr key={round.id}>
                  <Td isNumeric>{round.roundNumber}</Td>
                  <Td>{format(parseISO(round.dateStart), "dd/MM/yyyy")}</Td>
                  <Td>{format(parseISO(round.dateEnd), "dd/MM/yyyy")}</Td>
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
