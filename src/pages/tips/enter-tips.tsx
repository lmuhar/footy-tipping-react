import { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import DefaultLayout from '../../layouts/default.layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Button, FormControlLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { useEffect, useState } from 'react';
import to from 'await-to-js';
import Axios from 'axios';
import { roundDataService } from '../api/round';
import { IRound } from '../../models/round.model';
import { IGame } from '../../models/game.model';
import { useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import Moment from 'react-moment';
import { IUserData } from '../../models/user-data.model';
import useTokenData from '../../custom-hooks/token.data';
import { ITipCreate } from '../../models/tip.model';

const fetchGames = (data) => to(Axios.post<IGame[]>('/api/game/games-by-round', data));
const fetchRounds = () => to(Axios.get<IRound[]>('/api/round'));

interface PageProps {
  RoundData?: IRound[];
  GameData?: IGame[];
  SelectedRound?: any;
  UserData?: IUserData;
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

type FormValues = {
  tips: [];
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (_context) => {
  const [err, RoundData] = await roundDataService();
  const GameData = [];

  if (err) return { props: {} };

  return { props: { RoundData, GameData } };
};

const IndexPage: NextPage<PageProps> = ({ RoundData, GameData, SelectedRound }) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm<FormValues>();
  const user = useTokenData();
  console.log(user);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [round, setRound] = useState<IRound[]>(RoundData || null);
  const [game, setGame] = useState<IGame[]>(GameData || null);
  const [indexes, setIndexes] = useState([]);
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

  const addGame = (number) => {
    let i = 0;
    const index = [];
    while (i < number) {
      index.push(i);
      i++;
    }
    setIndexes(index);
    console.log(game);
  };

  const getGameDataFromAPI = async (body) => {
    setLoading(true);

    const [err, games] = await fetchGames(body);

    setLoading(false);

    if (err) return setGame([]);

    if (Array.isArray(games.data)) {
      setGame(games.data);
      addGame(games.data.length);
    } else {
      setGame([]);
    }
  };

  const handleInputChange = (inputValue) => {
    if (inputValue && inputValue.id) {
      setSelectedRound(inputValue.id);
      setIndexes([]);
      getGameDataFromAPI({ roundId: inputValue.id });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const req: ITipCreate[] = [];
    data.tips.forEach((item) => {
      if (item.tip) {
        req.push({
          user: user.id,
          tip: item.tip,
          round: selectedRound,
        });
      }
    });
    const createAllTips = req.map((tip) => {
      return to(Axios.post<ITipCreate>('/api/tip/create', tip));
    });

    await Promise.all(createAllTips)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    if (!round) getRoundDataFromAPI();
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
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
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

              {indexes.map((index) => {
                const fieldName = `tips[${index}]`;
                return (
                  <fieldset name={fieldName} key={fieldName}>
                    <div className={classes.form}>
                      <label>Game {index + 1}</label>
                      <div>
                        <Moment format="DD/MM/YYYY hh:mm a">{game[index].startDateTime}</Moment>
                      </div>
                      <section>
                        <Controller
                          name={`${fieldName}.tip`}
                          control={control}
                          required
                          defaultValue=""
                          as={
                            <RadioGroup name={`${fieldName}.tip`}>
                              <FormControlLabel
                                value={game[index].homeTeamId}
                                control={<Radio />}
                                label={game[index].homeTeam.name}
                              />
                              <FormControlLabel
                                value={game[index].awayTeamId}
                                control={<Radio />}
                                label={game[index].awayTeam.name}
                              />
                            </RadioGroup>
                          }
                        />
                      </section>
                    </div>
                  </fieldset>
                );
              })}

              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Save
              </Button>
            </form>
          </div>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;
