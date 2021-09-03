import { useTable } from 'react-table';
import React from 'react';


interface CompProp {
    userData: any[]
}

const UserTable: React.FunctionComponent<CompProp> = ({ userData }) => {
  const data = React.useMemo(() => userData, [])

  const columns = React.useMemo(() => [
      {
          Header: 'Username',
          accessor: 'username'
      },
      {
          Header: 'Email',
          accessor: 'email'
      }
  ], [])

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
}

export default UserTable;