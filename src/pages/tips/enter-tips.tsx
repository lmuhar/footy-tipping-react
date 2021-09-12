import { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import DefaultLayout from '../../layouts/default.layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button, FormControl, InputLabel, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { ITeamNames } from '../../models/team-names.model';
import { useEffect, useState } from 'react';
import to from 'await-to-js';
import Axios from 'axios';
import { teamDataService } from './../api/team';
import { roundDataService } from '../api/round';
import { IRound } from '../../models/round.model';
import { IGame } from '../../models/game.model';
import { useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';

const fetchGames = (data) => to(Axios.post<IGame[]>('/api/game/games-by-round', data));
const fetchRounds = () => to(Axios.get<IRound[]>('/api/round'));
const fetchTeams = () => to(Axios.get<ITeamNames[]>('/api/team'));

interface PageProps {
  RoundData?: IRound[];
  GameData?: IGame[];
  TeamData?: ITeamNames[];
  SelectedRound?: any;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const getServerSideProps: GetServerSideProps<PageProps> = async (_context) => {
  const [err, RoundData] = await roundDataService();
  const [err2, TeamData] = await teamDataService();
  const GameData = [];

  if (err) return { props: {} };
  if (err2) return { props: {} };

  return { props: { RoundData, TeamData, GameData } };
};

const IndexPage: NextPage<PageProps> = ({ RoundData, GameData, TeamData, SelectedRound }) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [round, setRound] = useState<IRound[]>(RoundData || null);
  const [game, setGame] = useState<IGame[]>(GameData || null);
  const [teams, setTeam] = useState<ITeamNames[]>(TeamData || null);
  const [selectedRound, setSelectedRound] = useState<string>(SelectedRound || null);

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

  const getTeamNameDataFromAPI = async () => {
    setLoading(true);

    const [err, teams] = await fetchTeams();

    setLoading(false);

    if (err) return setTeam([]);

    if (Array.isArray(teams.data)) {
      setTeam(teams.data);
    } else {
      setTeam([]);
    }
  };

  const getGameDataFromAPI = async (body) => {
    setLoading(true);

    const [err, games] = await fetchGames(body);

    setLoading(false);

    if (err) return setGame([]);

    if (Array.isArray(games.data)) {
      setGame(games.data);
    } else {
      setGame([]);
    }
  };

  const handleInputChange = (inputValue) => {
    if (inputValue && inputValue.id) {
      setSelectedRound(inputValue.id);
      getGameDataFromAPI({ roundId: inputValue.id });
    }
  };

  const onSubmit = async () => {};

  useEffect(() => {
    if (!round) getRoundDataFromAPI();
  }, []);

  useEffect(() => {
    if (!teams) getTeamNameDataFromAPI();
  }, []);

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
              Enter Tips
            </Typography>
            <div className={classes.form}>
              <ReactSelect
                onChange={handleInputChange}
                name="round"
                label="Round"
                options={RoundData}
                getOptionLabel={(item) => `${item.roundNumber}`}
                getOptionValue={(item) => item['id']}
                control={control}
                variant="outlined"
                defaultValue=""
                value={RoundData.filter(function (option) {
                  return option.id === selectedRound;
                })}
                required
                fullWidth
                isClearable
                instanceId="round"
                id="round"
              />
            </div>

            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Save
            </Button>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate></form>
          </div>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;
