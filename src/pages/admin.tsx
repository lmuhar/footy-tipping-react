import { CssBaseline } from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';
import { Container } from 'next/app';
import UserTable from '../components/section/users-table';
import DefaultLayout from '../layouts/default.layout';
import { makeStyles } from '@material-ui/core';
import { IUserData } from '../models/user-data.model';
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect } from 'react';
import { userDataService } from './api/user';

interface PageProps {
  UserData?: IUserData[];
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export const getServerSideProps: GetServerSideProps<PageProps> = async (_context) => {
  const [err, UserData] = await userDataService();

  if (err) return { props: {} };

  return { props: { UserData } };
};


const IndexPage: NextPage<PageProps> = ({UserData}) => {

  const [user, setUser] = useState<IUserData[]>(UserData || null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const getUserDataFromApi = async () => {
    setLoading(true);

    const [err, users] = await userDataService();

    setLoading(false);

    if (err) setUser([]);
    setUser(users);
  }

  useEffect(() => {
    if (!user) getUserDataFromApi();
  }, [])

  const classes = useStyles();
    return (
        <DefaultLayout>
          {isLoading && <CircularProgress />}
            <Container component="main" maxWidth="m">
                <CssBaseline />
                <div className={classes.paper}>
                <UserTable userData={UserData}/>
                </div>
            </Container>
        </DefaultLayout>
    )
}

export default IndexPage;