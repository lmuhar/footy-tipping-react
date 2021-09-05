import { NextPage } from 'next';
import React from 'react';
import DefaultLayout from '../layouts/default.layout';
import { useForm, Controller } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { ITeamNames } from '../models/team-names.model';
import { useState } from 'react';
import to from 'await-to-js';
import Axios from 'axios';

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

const IndexPage: NextPage = (_props) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm<FormValues>();

  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: ITeamNames) => {
    setLoading(true);
    const [err, teamName] = await to(Axios.post(`/api/team/create`, data));

    if (err) console.log(err);

    if (teamName) {
      console.log(teamName);
      setLoading(false);
    }
  };
  return (
    <DefaultLayout>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
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
        </Container>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;
