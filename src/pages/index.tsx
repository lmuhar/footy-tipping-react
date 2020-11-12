import to from 'await-to-js';
import Axios from 'axios';
import { NextPage } from 'next';
import AflLadder from '../components/section/afl-ladder';
import DefaultLayout from '../layouts/default.layout';

interface PageProps {
  aflLadder: any[];
}

const IndexPage: NextPage<PageProps> = (props) => {
  return (
    <DefaultLayout>
      <AflLadder aflData={props.aflLadder} />
    </DefaultLayout>
  );
};

IndexPage.getInitialProps = async (): Promise<PageProps> => {
  const [err, res] = await to(Axios.get('http://localhost:3000/api/afl-ladder'));
  if (err) {
    return { aflLadder: [] };
  }

  return { aflLadder: res?.data };
};

export default IndexPage;
