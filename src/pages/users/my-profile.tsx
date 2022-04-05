import { Button, CircularProgress, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import to from 'await-to-js';
import Axios from 'axios';
import { NextPage } from 'next';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useTokenData from '../../custom-hooks/token.data';
import DefaultLayout from '../../layouts/default.layout';
import { IUserNameUpdate } from '../../models/user-data.model';

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

const IndexPage: NextPage = (props) => {
  let user = useTokenData();
  console.log(user);
  const classes = useStyles();
  const { control, handleSubmit } = useForm<FormValues>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const onSubmit = async (data) => {
    setLoading(true);
    let payload: IUserNameUpdate = {
      id: user.id,
      ...data,
    };
    console.log(payload);
    const [err, res] = await to(Axios.post<UserToken>(`/api/user/update-name`, payload));
    if (err) {
      setLoading(false);
    }

    if (res && res.data) {
      localStorage.setItem('token', res.data.token);
      user = useTokenData();
      setLoading(false);
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
      {!isLoading && (
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
    </DefaultLayout>
  );
};

export default IndexPage;
