import to from 'await-to-js';
import Axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import AflLadder from '../components/section/afl-ladder';
import DefaultLayout from '../layouts/default.layout';


interface PageProps {
  aflLadder: any[];
}

const IndexPage: NextPage<PageProps> = (props) => {
  return (
  <DefaultLayout>Hello World!
    <AflLadder aflData={props.aflLadder}/>
  </DefaultLayout>);
};

IndexPage.getInitialProps = async (ctx: NextPageContext): Promise<PageProps> => {
  const [err, res] = await to(Axios.get('http://localhost:3000/api/afl-ladder'));
  console.log(res?.data);
  if (err) {
    return { aflLadder: [] };
  }

  return { aflLadder: res?.data };
};

export default IndexPage;
