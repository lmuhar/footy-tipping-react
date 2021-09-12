import React from 'react';
import Container from '@material-ui/core/Container';
import { InputLabel, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import ReactSelect from 'react-select';
import { ILocationNames } from '../../models/location-name.model';
import { ITeamNames } from '../../models/team-names.model';
import { IRound } from '../../models/round.model';
import { IGame, IGameCreate } from '../../models/game.model';
import to from 'await-to-js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';
import Axios from 'axios';

interface CompProp {
  roundData: IRound[];
  locationData: ILocationNames[];
  teamData: ITeamNames[];
}

type FormValues = {
  round: string;
  games: IGame[];
};

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

const AddGameForm: React.FunctionComponent<CompProp> = ({ roundData, teamData, locationData }) => {
  const classes = useStyles();
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log('here', data);
    const req: IGameCreate[] = [];

    data.games.forEach((item) => {
      req.push({
        homeTeam: item.homeTeam.id,
        awayTeam: item.awayTeam.id,
        location: item.location.id,
        startDateTime: new Date(item.startDateTime),
        round: data.round.id,
      });
    });

    const createAllGames = req.map((game) => {
      return to(Axios.post<IGameCreate>('/api/game/create', game));
    });

    await Promise.all(createAllGames)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  const addGame = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeGame = (index) => () => {
    setIndexes((prevIndexes) => [...prevIndexes.filter((item) => item !== index)]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  const clearGames = () => {
    setIndexes([]);
  };

  return (
    <Container component="main" maxWidth="xs">
      {isLoading && (
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <CircularProgress />
          </div>
        </Container>
      )}
      <div className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <FormControl className={classes.form}>
            <InputLabel id="round">Round</InputLabel>
            <Controller
              as={<ReactSelect instanceId={'round'} />}
              name="round"
              label="Round"
              options={roundData}
              getOptionLabel={(item) => `${item.roundNumber}`}
              getOptionValue={(item) => item['id']}
              control={control}
              value={''}
              variant="outlined"
              defaultValue=""
              required
              fullWidth
              isClearable
              id="round"
            />
          </FormControl>
          {indexes.map((index) => {
            const fieldName = `games[${index}]`;
            return (
              <fieldset name={fieldName} key={fieldName}>
                <FormControl className={classes.form}>
                  <InputLabel id="homeTeam">Home Team</InputLabel>
                  <Controller
                    as={<ReactSelect instanceId={'homeTeam'} />}
                    name={`${fieldName}.homeTeam`}
                    label="Home Team"
                    options={teamData}
                    getOptionLabel={(item) => `${item.name}`}
                    getOptionValue={(item) => item['id']}
                    control={control}
                    value={''}
                    variant="outlined"
                    defaultValue=""
                    required
                    fullWidth
                    isClearable
                    id="homeTeam"
                  />
                </FormControl>
                <FormControl className={classes.form}>
                  <InputLabel id="awayTeam">Away Team</InputLabel>
                  <Controller
                    as={<ReactSelect instanceId={'awayTeam'} />}
                    name={`${fieldName}.awayTeam`}
                    label="Away Team"
                    options={teamData}
                    getOptionLabel={(item) => `${item.name}`}
                    getOptionValue={(item) => item['id']}
                    control={control}
                    value={''}
                    variant="outlined"
                    defaultValue=""
                    required
                    fullWidth
                    isClearable
                    id="awayTeam"
                  />
                </FormControl>
                <FormControl className={classes.form}>
                  <InputLabel id="location">Location</InputLabel>
                  <Controller
                    as={<ReactSelect instanceId={'location'} />}
                    name={`${fieldName}.location`}
                    label="Location"
                    options={locationData}
                    getOptionLabel={(item) => `${item.name}`}
                    getOptionValue={(item) => item['id']}
                    control={control}
                    value={''}
                    variant="outlined"
                    defaultValue=""
                    required
                    fullWidth
                    isClearable
                    id="location"
                  />
                </FormControl>
                <Controller
                  as={<TextField />}
                  name={`${fieldName}.startDateTime`}
                  id="startDateTime"
                  label="startDateTime"
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
                  onChange={([event]) => {
                    return event.target.value;
                  }}
                />
                <button type="button" onClick={removeGame(index)}>
                  Remove
                </button>
                <button type="button" onClick={clearGames}>
                  Clear Friends
                </button>
              </fieldset>
            );
          })}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Save
          </Button>
          <Button onClick={addGame} fullWidth variant="contained" color="primary" className={classes.submit}>
            Add Game
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddGameForm;
