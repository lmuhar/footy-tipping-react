import to from 'await-to-js';
import Axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import AflLadder from '../components/section/afl-ladder';
import DefaultLayout from '../layouts/default.layout';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect, useState } from 'react';
import { IAFLLadder } from '../models/afl-ladder.model';
import { aflLadderService } from './api/afl-ladder';

// Alias of the to(Axtios(...)) as an API method
const fetchAFLLadder = () => to(Axios.get<IAFLLadder[]>(`/api/afl-ladder`));

interface PageProps {
  AFLLadder?: IAFLLadder[];
}

// getServerSideProps is the new getInitialProps. It's essentially the same thing but more efficient.
export const getServerSideProps: GetServerSideProps<PageProps> = async (_context) => {
  // Destructure the data directly into a AFLLadder variable.
  const [err, AFLLadder] = await aflLadderService();

  // Return nothing if there was an error. Props understands "AFLLadder?:" might be undefined.
  if (err) return { props: {} };

  // If all is good in the good, return the AFLLadder data! Variable is named the same, we can omit the :
  return { props: { AFLLadder } };
};

const IndexPage: NextPage<PageProps> = ({ AFLLadder }) => {
  // Store the ladder data in state using hooks. We can make use of this later!
  // We will set it null as a default, just in case the props returns nothing; such as a page load without SSR!
  // We not track the loading state too?
  const [ladder, setLadder] = useState<IAFLLadder[]>(AFLLadder || null);
  const [isLoading, setLoading] = useState<boolean>(false);

  // We can't (or shouldn't) use async functions in useEffect.
  // Instead we will use a separate async function that we know will update the state when it completes.
  const getLadderDataFromAPI = async () => {
    // Load, load I say!
    setLoading(true);

    // Okay, we need to get some data...
    const [err, { data: AFLLadder }] = await fetchAFLLadder();

    // We're done, no more loading shenanigans
    setLoading(false);

    // We fucked it, lets just set it to be empty
    if (err) setLadder([]);

    // Sweet! GO SAINTS!
    setLadder(AFLLadder);
  };

  // useEffect with empty [] (dependencies) will trigger on component mount/ page load.
  useEffect(() => {
    // Since we shouldn't use async directly, we will just ask the data to be fetched off in it's own time.
    // If we did await and something wen't wrong we could potentially cause the component to hang. Bad news.
    if (!ladder) getLadderDataFromAPI();
  }, []);

  return (
    <DefaultLayout>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Grid container>
          <Grid item>
            <AflLadder aflData={AFLLadder} />
          </Grid>
        </Grid>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;
