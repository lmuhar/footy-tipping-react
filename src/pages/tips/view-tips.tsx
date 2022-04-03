import { CircularProgress, Container, CssBaseline, Typography, makeStyles } from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';

import DefaultLayout from '../../layouts/default.layout';
import { IRound } from '../../models/round.model';
import Moment from 'react-moment';
import React from 'react';
import ViewTipsScreen from '../../components/section/view-tips-screen';
import _ from 'lodash';
import { latestRoundService } from '../api/round/latest-round';

interface PageProps {
  RoundData?: IRound[];
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
  const [err, RoundData] = await latestRoundService();

  if (err) return { props: {} };

  return { props: { RoundData } };
};

const IndexPage: NextPage<PageProps> = ({ RoundData }) => {
  const classes = useStyles();
  return (
    <DefaultLayout>
      {!RoundData && (
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <CircularProgress />
          </div>
        </Container>
      )}
      {RoundData && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              View Tips
            </Typography>
            <Typography component="h5" variant="h5">
              <div>Round {RoundData ? RoundData[0]?.roundNumber : ''}</div>
              <div>
                <Moment format="DD/MM/YY">{RoundData[0]?.dateStart}</Moment> -{' '}
                <Moment format="DD/MM/YY">{RoundData[0]?.dateEnd}</Moment>
              </div>
            </Typography>
            <ViewTipsScreen tips={RoundData[0].tips}></ViewTipsScreen>
            </div>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;
