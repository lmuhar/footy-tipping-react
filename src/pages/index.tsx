import to from 'await-to-js';
import Axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import AflLadder from '../components/section/afl-ladder';
import DefaultLayout from '../layouts/default.layout';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect, useState } from 'react';
import { IAFLLadder } from '../models/afl-ladder.model';
import { aflLadderService } from './api/afl-ladder';
import { userTipCount } from './api/user/user-tip-count';
import { IUserTips } from '../models/user-data.model';
import UserLadder from '../components/section/user-ladder';
import { latestRoundId } from './api/round/get-latest-round-id';

// Alias of the to(Axtios(...)) as an API method
const fetchAFLLadder = () => to(Axios.get<IAFLLadder[]>(`/api/afl-ladder`));
const fetchUserTips = () => to(Axios.get<IUserTips[]>('/api/user/user-tip-count'));
const fetchLatestRoundId = () => to(Axios.get<IUserTips[]>('/api/round/get-latest-round-id'));

interface PageProps {
  AFLLadder?: IAFLLadder[];
  UserData?: IUserTips[];
  RoundId?: any[];
}

// getServerSideProps is the new getInitialProps. It's essentially the same thing but more efficient.
export const getServerSideProps: GetServerSideProps<PageProps> = async (_context) => {
  // Destructure the data directly into a AFLLadder variable.
  const [err, AFLLadder] = await aflLadderService();
  const [err2, UserData] = await userTipCount();
  const [err3, RoundId] = await latestRoundId();

  // Return nothing if there was an error. Props understands "AFLLadder?:" might be undefined.
  if (err || err2 || err3) return { props: {} };

  // If all is good in the good, return the AFLLadder data! Variable is named the same, we can omit the :
  return { props: { AFLLadder, UserData, RoundId } };
};

const IndexPage: NextPage<PageProps> = ({ AFLLadder = [], UserData = [], RoundId = [] }) => {
  // Store the ladder data in state using hooks. We can make use of this later!
  // We will set it null as a default, just in case the props returns nothing; such as a page load without SSR!
  // We not track the loading state too?
  const [ladder, setLadder] = useState<IAFLLadder[]>(AFLLadder || []);
  const [users, setUsers] = useState<IUserTips[]>(UserData || []);
  const [roundId, setRoundId] = useState<any[]>(RoundId || []);
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

  const getUserTipsFromAPI = async () => {
    setLoading(true);

    const [err, { data: UserData }] = await fetchUserTips();

    setLoading(false);

    if (err) setUsers([]);
    setUsers(UserData);
  };

  const getLatestRoundId = async () => {
    setLoading(true);

    const [err, { data: RoundId }] = await fetchLatestRoundId();

    setLoading(false);

    if (err) setRoundId([]);
    setRoundId(RoundId);
  };

  // useEffect with empty [] (dependencies) will trigger on component mount/ page load.
  useEffect(() => {
    // Since we shouldn't use async directly, we will just ask the data to be fetched off in it's own time.
    // If we did await and something wen't wrong we could potentially cause the component to hang. Bad news.
    if (!ladder) getLadderDataFromAPI();
    if (!users) getUserTipsFromAPI();
    if (!roundId) getLatestRoundId();
  }, [ladder, roundId, users]);

  return (
    <DefaultLayout>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Container>
          {UserData.length > 0 && RoundId && RoundId.length > 0 && <UserLadder userData={UserData} roundId={RoundId} />}
        </Container>
      )}
      {!isLoading && <Container>{AFLLadder.length > 0 && <AflLadder aflData={AFLLadder} />}</Container>}
    </DefaultLayout>
  );
};

export default IndexPage;
