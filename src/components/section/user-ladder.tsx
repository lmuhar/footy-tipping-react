import { useTable } from 'react-table';
import { makeStyles } from '@material-ui/core';
import { useMemo, useState } from 'react';

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
  const classes = useStyles();
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Last Round',
        accessor: 'lastRound',
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <div className={classes.paper}>
      <table className={classes.table} {...getTableProps()}>
        <thead className={classes.thead}>
          {headerGroups.map((headerGroup) => (
            <tr className={classes.tr} key={headerGroup.header} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className={classes.th} key={column.Header} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr key={row} {...row.getRowProps()} className={classes.tr}>
                {row.cells.map((cell) => {
                  return (
                    <td className={classes.td} key={cell.order} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserLadder;
