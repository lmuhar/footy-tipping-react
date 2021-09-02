import { CssBaseline } from '@material-ui/core';
import { NextPage } from 'next';
import { Container } from 'next/app';
import UserTable from '../components/section/users-table';
import DefaultLayout from '../layouts/default.layout';
import to from 'await-to-js';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core';

interface PageProps {
  userData: any[];
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));


const IndexPage: NextPage<PageProps> = (props) => {
  const classes = useStyles();
    return (
        <DefaultLayout>
            <Container component="main" maxWidth="m">
                <CssBaseline />
                <div className={classes.paper}>
                <UserTable userData={props.userData}/>
                </div>
            </Container>
        </DefaultLayout>
    )
}


IndexPage.getInitialProps = async (): Promise<PageProps> => {
  const [err, res] = await to(Axios.get(`/api/user`));
  if (err) {
    return { userData: [] };
  }

  return { userData: res?.data };
}

export default IndexPage;