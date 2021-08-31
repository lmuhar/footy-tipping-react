import to from 'await-to-js';
import Axios from 'axios';
import { NextPage } from 'next';
import AflLadder from '../components/section/afl-ladder';
import DefaultLayout from '../layouts/default.layout';
import Grid from '@material-ui/core/Grid';

interface PageProps {
  aflLadder: any[];
}

const IndexPage: NextPage<PageProps> = (props) => {
  return (
    <DefaultLayout>
      <Grid container>
        <Grid item>
          <AflLadder aflData={props.aflLadder} />
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

IndexPage.getInitialProps = async (): Promise<PageProps> => {
  const [err, res] = await to(Axios.get(`/api/afl-ladder`));
  if (err) {
    return { aflLadder: [] };
  }

  return { aflLadder: res?.data };
};

export default IndexPage;
