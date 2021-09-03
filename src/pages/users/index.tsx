import { Box, Container } from '@material-ui/core';
import to from 'await-to-js';
import Axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import { useState } from 'react';

interface PageProps {
  name: string;
  users: any[];
}

const IndexPage: NextPage<PageProps> = (props) => {
  const [users, _setUsers] = useState<any[]>(props.users);

  return (
    <Container>
      <Container>Users</Container>
      {users.map((user) => (
        <Box key={'butts__' + user.username} p="4">
          {user.username}
        </Box>
      ))}
    </Container>
  );
};

IndexPage.getInitialProps = async (ctx: NextPageContext): Promise<PageProps> => {
  const [err, res] = await to(Axios.get(`/api/user`));

  if (err) {
    return { name: ctx.query.name as string, users: [] };
  }

  return { name: ctx.query.name as string, users: res?.data };
};

export default IndexPage;
