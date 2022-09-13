import { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import DefaultLayout from '../../layouts/default.layout';
import { useForm, Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { useEffect, useState } from 'react';
import to from 'await-to-js';
import Axios from 'axios';
import { IRound } from '../../models/round.model';
import { roundDataService } from '../api/round';
import Moment from 'react-moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import AddGameForm from '../../components/section/add-game';
import { ILocationNames } from '../../models/location-name.model';
import { ITeamNames } from '../../models/team-names.model';
import { teamDataService } from '../api/teams';
import { locationDataService } from '../api/locations';

const fetchRounds = () => to(Axios.get<IRound[]>('/api/round'));

interface PageProps {
  RoundData?: IRound[];
  LocationData?: ILocationNames[];
  TeamData?: ITeamNames[];
}

type FormValues = {
  roundNumber: number;
  dateStart: Date;
  dateEnd: Date;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const getServerSideProps: GetServerSideProps<PageProps> = async (_context) => {
  const [err, RoundData] = await roundDataService();
  const [err1, LocationData] = await locationDataService();
  const [err2, TeamData] = await teamDataService();

  if (err1) return { props: {} };
  if (err2) return { props: {} };
  if (err) return { props: {} };

  return { props: { RoundData, LocationData, TeamData } };
};

const IndexPage: NextPage<PageProps> = ({ RoundData, LocationData, TeamData }) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm<FormValues>();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [round, setRound] = useState<IRound[]>(RoundData || []);

  const getRoundDataFromAPI = async () => {
    setLoading(true);

    const [err, rounds] = await fetchRounds();

    setLoading(false);

    if (err) return setRound([]);

    if (Array.isArray(rounds)) {
      setRound(rounds);
    } else {
      setRound([]);
    }
  };

  useEffect(() => {
    if (!round) getRoundDataFromAPI();
  }, [round]);

  const onSubmit = async (data: IRound) => {
    const request: IRound = {
      roundNumber: parseInt(data.roundNumber.toString(), 10),
      dateStart: new Date(data.dateStart),
      dateEnd: new Date(data.dateEnd),
    };
    setLoading(true);
    const [err, round] = await to(Axios.post<IRound>('/api/round/create', request));

    if (err) console.error(err);

    if (round) {
      setLoading(false);
    }
  };
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
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Rounds
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
              <Controller
                as={<TextField />}
                name="roundNumber"
                label="Round"
                control={control}
                value={''}
                variant="outlined"
                margin="normal"
                defaultValue="0"
                required
                fullWidth
                id="roundNumber"
                autoComplete="roundNumber"
                type="number"
                autoFocus
              />
              <Controller
                as={<TextField />}
                name="dateStart"
                id="dateStart"
                label="Start Date"
                control={control}
                value={''}
                variant="outlined"
                margin="normal"
                defaultValue=""
                required
                fullWidth
                type="datetime-local"
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={([event]: any[]) => {
                  return event.target.value;
                }}
              />
              <Controller
                as={<TextField />}
                name="dateEnd"
                id="dateEnd"
                label="Start End"
                control={control}
                value={''}
                variant="outlined"
                margin="normal"
                defaultValue=""
                required
                fullWidth
                type="datetime-local"
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={([event]: any[]) => {
                  return event.target.value;
                }}
              />
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Save Round
              </Button>
            </form>
            <AddGameForm roundData={round} locationData={LocationData || []} teamData={TeamData || []} />
            <List component="nav" className={classes.paper}>
              {round.map((d) => (
                <ListItem button key={d.roundNumber}>
                  <div>{d.roundNumber} - </div>
                  <div>
                    <Moment format="DD/MM/YYYY">{d.dateStart}</Moment>
                  </div>
                  <Divider />
                </ListItem>
              ))}
            </List>
          </div>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;
