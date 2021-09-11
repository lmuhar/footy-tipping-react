import React from 'react';
import Container from '@material-ui/core/Container';
import { InputLabel, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import ReactSelect from 'react-select';

interface CompProp {
  roundData: any[];
}

type FormValues = {
  round: string;
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

const AddGameForm: React.FunctionComponent<CompProp> = ({ roundData }) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm<FormValues>();
  const onSubmit = async (data) => {
    console.log('here', data);
  };

  return (
    <Container component="main" maxWidth="xs">
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
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Save
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddGameForm;
