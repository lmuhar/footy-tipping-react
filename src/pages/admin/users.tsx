import { CssBaseline } from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';
import { Container } from 'next/app';
import DefaultLayout from '../../layouts/default.layout';
import { makeStyles } from '@material-ui/core';
import { IUserData } from '../../models/user-data.model';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect, useState } from 'react';
import { userDataService } from './../api/user';
import to from 'await-to-js';
import Axios from 'axios';
import GenericTable from '../../components/section/generic-table';

const fetchUsers = () => to(Axios.get<IUserData[]>(`/api/user`));

interface PageProps {
  UserData?: IUserData[];
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const getServerSideProps: GetServerSideProps<PageProps> = async (_context) => {
  const [err, UserData] = await userDataService();

  if (err) return { props: {} };

  return { props: { UserData } };
};

const IndexPage: NextPage<PageProps> = ({ UserData }) => {
  const [user, setUser] = useState<IUserData[]>(UserData || null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const getUserDataFromApi = async () => {
    setLoading(true);

    const [err, users] = await fetchUsers();

    setLoading(false);

    if (err) setUser([]);

    if (Array.isArray(users)) {
      setUser(users);
    } else {
      setUser([]);
    }
  };

  useEffect(() => {
    if (!user) getUserDataFromApi();
  }, []);

  const classes = useStyles();
  return (
    <DefaultLayout>
    {isLoading && (<Container component="main" maxWidth="xs">
        <div className={classes.paper}>
       <CircularProgress />
      </div>
      </Container>)}
      {!isLoading && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <GenericTable teamData={UserData} tableHeader={[{
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },]} />
          </div>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;
