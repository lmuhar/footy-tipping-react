import { Button, CircularProgress, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { IUserNameUpdate } from '../../models/user-data.model';

import Axios from 'axios';
import DefaultLayout from '../../layouts/default.layout';
import { NextPage } from 'next';
import { makeStyles } from '@material-ui/core';
import to from 'await-to-js';
import { useState } from 'react';
import useTokenData from '../../custom-hooks/token.data';

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

interface UserToken {
  token: string;
}

type FormValues = {
  newName: string;
};

const IndexPage: NextPage = () => {
  const classes = useStyles();
  const user = useTokenData();
  const { control, handleSubmit } = useForm<FormValues>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const onSubmit = async (data) => {
    if (data.newName) {
      setLoading(true);
      const payload: IUserNameUpdate = {
        id: user.id,
        ...data,
      };
      const [err, res] = await to(Axios.post<UserToken>(`/api/user/update-name`, payload));
      if (err) {
        setLoading(false);
        setSaved(false);
      }

      if (res && res.data) {
        localStorage.setItem('token', res.data.token);
        setLoading(false);
        setSaved(true);
      }
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
      {!isLoading && !saved && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Typography component="h1" variant="h5">
            <div className={classes.paper}>{user?.username}</div>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
            <Controller
              as={<TextField />}
              name="newName"
              label="Username"
              control={control}
              value={''}
              variant="outlined"
              margin="normal"
              defaultValue=""
              required
              fullWidth
              id="username"
              autoComplete="username"
              autoFocus
              onChange={([event]) => {
                return event.target.value;
              }}
            />

            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Save
            </Button>
          </form>
        </Container>
      )}
      {saved && (
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Username saved
            </Typography>
          </div>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;