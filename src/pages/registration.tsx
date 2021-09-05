import { NextPage } from 'next';
import React from 'react';
import DefaultLayout from '../layouts/default.layout';
import { useForm, Controller } from 'react-hook-form';
import to from 'await-to-js';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/dist/client/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';

type FormValues = {
  email: string;
  username: string;
  password: string;
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
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormValues>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const onSubmit = async (data) => {
    const [err, res] = await to(Axios.post(`/api/user/register`, data));
    if (err) {
      setLoading(true);
      console.log(err);
    }

    if (res) {
      localStorage.setItem('token', res.data.token);
      router.push('/');
      console.log('Success');
    }
  };
  return (
    <DefaultLayout>
    {isLoading && (<Container component="main" maxWidth="xs">
        <div className={classes.paper}>
       <CircularProgress />
      </div>
      </Container>)}
      {!isLoading && (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
            <Controller
              as={<TextField />}
              name="email"
              label="Email Address"
              control={control}
              value={''}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              autoComplete="email"
              autoFocus
              onChange={([event]) => {
                return event.target.value;
              }}
            />

            <Controller
              as={<TextField />}
              name="username"
              label="Username"
              control={control}
              value={''}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              autoComplete="username"
              autoFocus
              onChange={([event]) => {
                return event.target.value;
              }}
            />

            <Controller
              as={<TextField />}
              name="password"
              label="Password"
              type="password"
              id="password"
              control={control}
              value={''}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              onChange={([event]) => {
                return event.target.value;
              }}
            />

            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign Up
            </Button>
          </form>
        </div>
      </Container>)}
    </DefaultLayout>
  );
};

export default IndexPage;
