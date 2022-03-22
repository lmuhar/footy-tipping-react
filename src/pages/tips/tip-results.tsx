import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import Moment from 'react-moment';
import { GetServerSideProps, NextPage } from 'next';
import DefaultLayout from '../../layouts/default.layout';
import { IRound, SaveResult } from '../../models/round.model';
import { getLastRoundGames } from '../api/round/get-last-round-games';
import { Controller, useForm } from 'react-hook-form';
import to from 'await-to-js';
import Axios from 'axios';
import { useState } from 'react';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type FormValues = {
  games: [{ result: string; gameId: string }];
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (_context) => {
  const [err, RoundData] = await getLastRoundGames();

  if (err) return { props: {} };

  return { props: { RoundData } };
};

const IndexPage: NextPage<PageProps> = ({ RoundData }) => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<FormValues>();
  const onSubmit = async (data) => {
    setLoading(true);
    const req: SaveResult[] = [];
    const keys = Object.keys(data);
    keys.map((key) => {
      if (data[key]) {
        req.push({ id: key, result: data[key] });
      }
    });
    console.log(req);
    const updateResults = req.map((tip) => {
      if (tip.id && tip.result) {
        return to(Axios.post<SaveResult>('/api/game/update-result', tip));
      }
    });
    await Promise.all(updateResults)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
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
      {RoundData && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Enter results
            </Typography>
            <Typography component="h5" variant="h5">
              <div>Round {RoundData ? RoundData[0]?.roundNumber : ''}</div>
              <div>
                <Moment format="DD/MM/YY">{RoundData[0]?.dateStart}</Moment> -{' '}
                <Moment format="DD/MM/YY">{RoundData[0]?.dateEnd}</Moment>
              </div>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
              {RoundData[0].games.map((game) => {
                const fieldName = game.id;
                return (
                  <fieldset name={fieldName} key={fieldName}>
                    <div className={classes.form}>
                      <label>Game</label>
                    </div>
                    <section>
                      <Controller
                        name={`${game.id}`}
                        control={control}
                        required
                        defaultValue=""
                        as={
                          <RadioGroup name={`${fieldName}.tip`}>
                            <FormControlLabel value={game.homeTeam.id} control={<Radio />} label={game.homeTeam.name} />
                            <FormControlLabel value={game.awayTeam.id} control={<Radio />} label={game.awayTeam.name} />
                          </RadioGroup>
                        }
                      />
                    </section>
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
