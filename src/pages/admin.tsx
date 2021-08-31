import { CssBaseline } from '@material-ui/core';
import { NextPage } from 'next';
import { Container } from 'next/app';
import UserTable from '../components/section/users-table';
import DefaultLayout from '../layouts/default.layout';
import to from 'await-to-js';
import Axios from 'axios';

interface PageProps {
  userData: any[];
}

const IndexPage: NextPage<PageProps> = (props) => {

    return (
        <DefaultLayout>
            <Container component="main">
                <CssBaseline />
                <UserTable userData={props.userData}/>
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