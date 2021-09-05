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
import { ITeamNames } from '../../models/team-names.model';
import { useEffect, useState } from 'react';
import to from 'await-to-js';
import Axios from 'axios';
import { teamDataService } from './../api/team';
import GenericTable from '../../components/section/generic-table';

const fetchTeams = () => to(Axios.get<ITeamNames[]>('/api/team'));

interface PageProps {
  TeamData?: ITeamNames[];
}

type FormValues = {
  name: string;
};

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
  const [err, TeamData] = await teamDataService();

  if (err) return {props: {}};

  return { props: { TeamData }};
}

const IndexPage: NextPage<PageProps> = ({TeamData}) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm<FormValues>();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [team, setTeam] = useState<ITeamNames[]>(TeamData || null);

  const getTeamNameDataFromAPI = async () => {
    setLoading(true);

    const [err, teams] = await fetchTeams();

    setLoading(false);

    if (err) return setTeam([]);

    if (Array.isArray(teams)) {
      setTeam(teams);
    } else {
      setTeam([]);
    }
  }

  useEffect(() => {
    if (!team) getTeamNameDataFromAPI();
  }, [])

  const onSubmit = async (data: ITeamNames) => {
    setLoading(true);
    const [err, teamName] = await to(Axios.post<ITeamNames>(`/api/team/create`, data));

    if (err) console.log(err);

    if (teamName) {
      setLoading(false);
    }
  };
  return (
    <DefaultLayout>
    <Container component="main" maxWidth="xs">
      {isLoading && <CircularProgress />}
      </Container>
      {!isLoading && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Team Names
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
              <Controller
                as={<TextField />}
                name="name"
                label="Name"
                control={control}
                value={''}
                variant="outlined"
                margin="normal"
                defaultValue=""
                required
                fullWidth
                id="name"
                autoComplete="name"
                autoFocus
                onChange={([event]) => {
                  return event.target.value;
                }}
              />

              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Save
              </Button>
            </form>
          </div>
          <div className={classes.paper}>
            <GenericTable teamData={TeamData} tableHeader={[{Header: 'Name', accessor: 'name'}]} />
          </div>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;
