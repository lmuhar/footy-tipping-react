import { useTable } from 'react-table';
import { makeStyles } from '@material-ui/core';

export interface TableHeader {
  Header: string;
  accessor: string;
}

interface CompProp {
  teamData: any[];
  tableHeader: TableHeader[];
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

const GenericTable: React.FunctionComponent<CompProp> = ({ teamData, tableHeader }) => {
  const classes = useStyles();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: tableHeader,
    data: teamData,
  });
  return (
    <div className={classes.paper}>
      <table className={classes.table} {...getTableProps()}>
        <thead className={classes.thead}>
          {headerGroups.map((headerGroup) => {
            const { key, ...props } = headerGroup.getHeaderGroupProps()
            return (
              <tr className={classes.tr} key={key} {...props}>
                {headerGroup.headers.map((column) => {
                  const { key, ...props } = headerGroup.getHeaderProps()
                  return (
                    <th className={classes.th} key={key} {...props}>
                      {column.render('Header')}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...props } = row.getRowProps()
            return (
              <tr key={key} {...props} className={classes.tr}>
                {row.cells.map((cell) => {
                  const { key, ...props } = cell.getCellProps()
                  return (
                    <td className={classes.td} key={key} {...props}>
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

export default GenericTable;
