import { useTable } from 'react-table';
import { makeStyles, TableContainer } from '@material-ui/core';
import { useMemo, useState } from 'react';
import { Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react';

interface CompProp {
  userData: any[];
  roundId: any[];
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
    borderCollapse: 'collapse',
    margin: '25px 0',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
  },
  thead: {
    backgroundColor: '#2196f3',
    color: '#ffffff',
    textAlign: 'left',
  },
  th: {
    padding: '12px 15px',
  },
  td: {
    padding: '12px 15px',
  },
  tr: {
    borderBottom: '1px solid #dddddd',
    '&:nth-of-type(even)': {
      backgroundColor: '#f3f3f3',
    },
    '&:last-of-type': {
      borderBottom: '2px solid #2196f3',
    },
    '.active-row': {
      fontWeight: 'bold',
      color: '#2196f3',
    },
  },
}));

const UserLadder = ({ userData, roundId }: CompProp) => {
  const [info, setInfo] = useState<any[]>([]);
  debugger;

  userData.forEach((user) => {
    let total = 0;
    let lastRound = 0;
    user.tips.forEach((tip: any) => {
      if (tip.selectedTip && tip.game.result && tip.selectedTip.id === tip.game.result.id) {
        total = total + 1;
        if (roundId[0].id === tip.game.roundId) {
          lastRound = lastRound + 1;
        }
      }
    });
    if (total > 0) {
      setInfo([
        ...info,
        {
          id: user.id,
          name: user.username,
          lastRound: lastRound,
          total: total,
        },
      ]);
    }
  });
  const data = useMemo(() => info.sort((a, b) => b.total - a.total), [info]);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Leaderboard</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Last Round</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td>row.name</Td>
              <Td isNumeric>row.lastRound</Td>
              <Td isNumeric>row.total</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Last Round</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default UserLadder;
