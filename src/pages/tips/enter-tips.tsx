import { NextPage, GetServerSideProps } from 'next';
import DefaultLayout from '../../layouts/default.layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Button, FormControlLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { useEffect, useState } from 'react';
import to from 'await-to-js';
import Axios from 'axios';
import { roundDataService } from '../api/round';
import { IRound } from '../../models/round.model';
import { IGame, IGameByRoundUser } from '../../models/game.model';
import { useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import Moment from 'react-moment';
import { IUserData } from '../../models/user-data.model';
import useTokenData from '../../custom-hooks/token.data';
import { ITipCreate } from '../../models/tip.model';
import AflLadder from '../../components/section/afl-ladder';
import { IAFLLadder } from '../../models/afl-ladder.model';
import { aflLadderService } from '../api/afl-ladder';
import { AlertProps } from '@material-ui/lab';

const fetchGames = (data: IGameByRoundUser) => to(Axios.post<IGame[]>('/api/game/games-by-round', data));
const fetchRounds = () => to(Axios.get<IRound[]>('/api/round'));
const fetchAFLLadder = () => to(Axios.get<IAFLLadder[]>(`/api/afl-ladder`));

interface PageProps {
  RoundData?: IRound[];
  GameData?: IGame[];
  SelectedRound?: any;
  UserData?: IUserData;
  UserTips?: any;
  AFLLadder?: IAFLLadder[];
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
  tips: [{ tip: string; gameId: string }];
};

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (_context) => {
  const [err, RoundData] = await roundDataService();
  const [err2, AFLLadder] = await aflLadderService();
  const GameData: any[] = [];

  if (err || err2) return { props: {} };

  return { props: { RoundData, GameData, AFLLadder } };
};

const IndexPage: NextPage<PageProps> = ({ RoundData, GameData, SelectedRound, AFLLadder }) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm<FormValues>();
  const user = useTokenData();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [round, setRound] = useState<IRound[]>(RoundData || []);
  const [game, setGame] = useState<IGame[]>(GameData || []);
  const [indexes, setIndexes] = useState<number[]>([]);
  const [ladder, setLadder] = useState<IAFLLadder[]>(AFLLadder || []);
  const [selectedRound, setSelectedRound] = useState<string>(SelectedRound || []);
  const [open, setOpen] = useState<boolean>(false);

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

  const addGame = (number: number) => {
    let i = 0;
    const index = [];
    while (i < number) {
      index.push(i);
      i++;
    }
    setIndexes(index);
  };

  const getGameDataFromAPI = async (body: any) => {
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

  const getLadderDataFromAPI = async () => {
    setLoading(true);

    const [err, { data: AFLLadder }] = await fetchAFLLadder();

    setLoading(false);

    if (err) setLadder([]);

    setLadder(AFLLadder);
  };

  const handleInputChange = (inputValue: any) => {
    if (inputValue && inputValue.id) {
      setSelectedRound(inputValue.id);
      setIndexes([]);
      getGameDataFromAPI({ roundId: inputValue.id, userId: user.id });
    }
  };

  const handleClose = (event: any, reason: string) => {
    console.log(event);
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    const req: ITipCreate[] = [];
    data.tips.forEach((item, i) => {
      if (item.tip) {
        req.push({
          user: user.id,
          selectedTip: item.tip,
          round: selectedRound,
          game: game[i].id,
          id: game[i]?.tip[0]?.id,
        });
      }
    });
    const createAllTips = req.map((tip) => {
      if (tip.id) {
        return to(Axios.post<ITipCreate>('/api/tip/edit', tip));
      } else {
        return to(Axios.post<ITipCreate>('/api/tip/create', tip));
      }
    });

    await Promise.all(createAllTips)
      .then(() => {
        setLoading(false);
        setOpen(true);
        setSaved(true);
      })
      .catch(() => {
        setLoading(false);
        setOpen(false);
        setSaved(false);
      });
  };

  useEffect(() => {
    if (!round) getRoundDataFromAPI();
    if (!ladder) getLadderDataFromAPI();
  }, [ladder, round]);

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
            {!saved && (
              <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                <div className={classes.form}>
                  <ReactSelect
                    onChange={handleInputChange}
                    name="round"
                    label="Round"
                    options={RoundData}
                    getOptionLabel={(item) => `${item.roundNumber}`}
                    getOptionValue={(item) => item['id'] || ''}
                    control={control}
                    variant="outlined"
                    defaultValue={undefined}
                    value={RoundData?.filter((option) => {
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
                        <div>{game[index].location.name}</div>
                        <section>
                          <Controller
                            name={`${fieldName}.tip`}
                            control={control}
                            required
                            defaultValue={game[index]?.tip[0]?.selectedTipId || ''}
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
            )}
            {AFLLadder && AFLLadder.length > 0 && <AflLadder aflData={AFLLadder} />}
          </div>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert severity="success">Tips successfully saved!</Alert>
          </Snackbar>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;
