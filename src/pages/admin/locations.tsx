import { NextPage, GetServerSideProps } from 'next';
import DefaultLayout from '../../layouts/default.layout';
import { useForm, Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { ILocationNames } from '../../models/location-name.model';
import { useEffect, useState } from 'react';
import to from 'await-to-js';
import Axios from 'axios';
import { locationDataService } from './../api/location';
import GenericTable from '../../components/section/generic-table';

const fetchLocations = () => to(Axios.get<ILocationNames[]>('/api/location'));

interface PageProps {
  LocationData?: ILocationNames[];
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const getServerSideProps: GetServerSideProps<PageProps> = async (_context) => {
  const [err, LocationData] = await locationDataService();

  if (err) return { props: {} };

  return { props: { LocationData } };
};

const IndexPage: NextPage<PageProps> = ({ LocationData }) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm<FormValues>();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<ILocationNames[]>(LocationData || []);

  const getLocationNameDataFromAPI = async () => {
    setLoading(true);

    const [err, locations] = await fetchLocations();

    setLoading(false);

    if (err) return setLocation([]);

    if (Array.isArray(locations && locations.data)) {
      setLocation(locations.data);
    } else {
      setLocation([]);
    }
  };

  useEffect(() => {
    if (!location) getLocationNameDataFromAPI();
  }, [location]);

  const onSubmit = async (data: ILocationNames) => {
    setLoading(true);
    const [err, locationName] = await to(Axios.post<ILocationNames>('/api/location/create', data));

    if (err) console.error(err);

    if (locationName) {
      setLoading(false);
      getLocationNameDataFromAPI();
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
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Locations
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
                onChange={([event]: any[]) => {
                  return event.target.value;
                }}
              />

              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Save
              </Button>
            </form>
          </div>
          <div className={classes.paper}>
            <GenericTable teamData={location} tableHeader={[{ Header: 'Name', accessor: 'name' }]} />
          </div>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default IndexPage;
