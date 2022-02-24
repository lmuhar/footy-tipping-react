import { CircularProgress, Container, CssBaseline, makeStyles, Typography } from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';
import React, { useState } from 'react';
import DefaultLayout from '../../layouts/default.layout';
import { IRound } from '../../models/round.model';
import { latestRoundService } from '../api/round/latest-round';
import Moment from 'react-moment';
import _ from 'lodash';

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
  console.log(RoundData);

  const [isLoading, setLoading] = useState<boolean>(false);
  setLoading(false);

  return (
    <DefaultLayout>
      {isLoading && (
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <CircularProgress />
          </div>
        </Container>
      )}
      {!isLoading && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              View Tips
            </Typography>
            <Typography component="h5" variant="h5">
              <div>Round {RoundData[0].roundNumber}</div>
              <div>
                <Moment format="DD/MM/YY">{RoundData[0].dateStart}</Moment> -{' '}
                <Moment format="DD/MM/YY">{RoundData[0].dateEnd}</Moment>
              </div>
            </Typography>
          </div>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;
