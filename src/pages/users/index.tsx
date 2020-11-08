import { Box, Flex, Heading } from '@chakra-ui/core';
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
    <Flex direction="column" margin="auto">
      <Heading>Users</Heading>
      {users.map((user) => (
        <Box key={'butts__' + user.username} shadow="md" p="4" rounded="md">
          {user.username}
        </Box>
      ))}
    </Flex>
  );
};

IndexPage.getInitialProps = async (ctx: NextPageContext): Promise<PageProps> => {
  const [err, res] = await to(Axios.get('http://localhost:3000/api/user'));

  if (err) {
    return { name: ctx.query.name as string, users: [] };
  }

  return { name: ctx.query.name as string, users: res?.data };
};

export default IndexPage;
