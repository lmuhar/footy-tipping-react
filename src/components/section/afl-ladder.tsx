import { useTable } from 'react-table';
import React from 'react';

interface CompProp {
  aflData: any[];
}

const AflLadder: React.FunctionComponent<CompProp> = ({ aflData }) => {
  const data = React.useMemo(() => aflData, []);

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
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.header} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th key={column.header} {...column.getHeaderProps()}>
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
            <tr key={row} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td key={cell.order} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AflLadder;
