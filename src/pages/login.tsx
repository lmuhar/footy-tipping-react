import { NextPage, NextPageContext } from 'next';
import React from 'react';
import DefaultLayout from '../layouts/default.layout';
import { useForm, Controller } from 'react-hook-form';
import to from 'await-to-js';
import Axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';

interface UserToken {
  token: string;
}

type FormValues = {
  email: string;
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

const getHost = (context: NextPageContext): { host: string; proto: string } => {
   const { req } = context;
   if (req !== undefined) {
     const {
       "x-forwarded-host": host,
       "x-forwarded-proto": proto
     } = req.headers;
     if (
       typeof host === "string" &&
       typeof proto === "string" &&
       (proto === "http" || proto === "https")
     ) {
       // Proto doesn't have the colon on server
       return { host, proto: proto + ":" };
     }
   } else if (window && window.location) {
     // Parse url to determine our current host
     const { href } = window.location;
     const { host, protocol: proto } = new URL(href);
     return { host, proto };
   }
   throw new Error("Could not determine host to fetch API.");
 };

const IndexPage: NextPage = (_props) => {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormValues>();
  const onSubmit = async (data) => {
    const [err, res] = await to(
      Axios.post<UserToken>(`${getHost(_props).host}:${getHost(_props).proto || 80}/api/user/login`, data),
    );
    if (err) {
      console.log(err);
    }

    if (res && res.data) {
      localStorage.setItem('token', res.data.token);
      router.push('/');
    }
  };
  return (
    <DefaultLayout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              defaultValue=""
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
              name="password"
              label="Password"
              type="password"
              id="password"
              control={control}
              value={''}
              defaultValue=""
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registration" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default IndexPage;
