import { useTable } from 'react-table';
import React from 'react';
import { makeStyles } from '@material-ui/core';

interface CompProp {
  aflData: any[];
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
    borderCollapse: 'collapse',
    margin: '25px 0',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)'
  },
  thead: {
    backgroundColor: '#2196f3',
    color: '#ffffff',
    textAlign: 'left'
  },
  th: {
    padding: '12px 15px'
  },
  td: {
    padding: '12px 15px'
  },
  tr: {
    borderBottom: '1px solid #dddddd',
    '&:nth-of-type(even)': {
      backgroundColor: '#f3f3f3'
    },
    '&:last-of-type': {
      borderBottom: '2px solid #2196f3'
    },
    '.active-row': {
      fontWeight: 'bold',
      color: '#2196f3'
    }
  }
}));


const AflLadder: React.FunctionComponent<CompProp> = ({ aflData }) => {
  const data = React.useMemo(() => aflData, []);
  const classes = useStyles();
  const columns = React.useMemo(
    () => [
      {
        Header: 'No.',
        accessor: 'order', // accessor is the "key" in the data
      },
      {
        Header: 'Team',
        accessor: 'name',
      },
      {
        Header: 'Played',
        accessor: 'played',
      },
      {
        Header: 'Wins',
        accessor: 'wins',
      },
      {
        Header: 'Draw',
        accessor: 'draws',
      },
      {
        Header: 'Loss',
        accessor: 'loss',
      },
      {
        Header: 'For',
        accessor: 'for',
      },
      {
        Header: 'Agt',
        accessor: 'agt',
      },
      {
        Header: 'Percent',
        accessor: 'percent',
      },
      {
        Header: 'Points',
        accessor: 'points',
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
                <th className={classes.th} key={column.header} {...column.getHeaderProps()}>
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
              <tr className={classes.tr} key={row} {...row.getRowProps()}>
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

export default AflLadder;
