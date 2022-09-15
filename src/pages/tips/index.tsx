import { NextPage } from 'next';
import { ApplicationShell } from 'layouts/application-shell';
import useTokenData from 'custom-hooks/useTokenData.hook';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ViewTips: NextPage = () => {
  const { user } = useTokenData();
  const { data } = useQuery(['latestRoundWithGames'], async () => (await axios.get('/api/rounds/latest/games')).data);

  return <ApplicationShell></ApplicationShell>;
};

export default ViewTips;
