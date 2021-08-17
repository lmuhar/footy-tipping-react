import { Box } from '@material-ui/core';
import { NextPage } from 'next';
import React from 'react';
import DefaultLayout from '../layouts/default.layout';
/*import { useForm } from 'react-hook-form';
import to from 'await-to-js';
import Axios from 'axios';*/

const IndexPage: NextPage = () => {
  /*const { handleSubmit, register } = useForm();
  const onSubmit = async (data) => {
    const [err, res] = await to(Axios.post(`http://localhost:${process.env.PORT || 3000}/api/user/register`, data));
    if (err) {
      // console.log(err);
    }

    if (res) {
      // console.log('Success');
    }
  };*/
  return (
    <DefaultLayout>
      <Box p={8} maxWidth="500px" borderRadius={8} boxShadow="lg">
 
        </Box>
    </DefaultLayout>
  );
};

export default IndexPage;
