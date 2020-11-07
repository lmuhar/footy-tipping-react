import { Flex, Heading, Text, Box} from "@chakra-ui/core";
import Axios from "axios";
import { NextPage, NextPageContext } from "next";
import { useState } from "react";
import to from 'await-to-js';
import { User } from "@prisma/client";

interface PageProps { name: string; users: User[]; };

const IndexPage: NextPage<PageProps> = (props) => {
  const [users, setUsers] = useState<User[]>(props.users);

  return (
    <Flex direction="column" margin="auto">
      <Heading>Cats Page</Heading>
      <Text>Say hello to {props.name}</Text>
      {users.map(user => <Box key={'butts__' + user.username} shadow="md" p="4" rounded="md">{user.username}</Box>)}
    </Flex>
  );
};

IndexPage.getInitialProps = async (ctx: NextPageContext): Promise<PageProps> => {
  const [err, res] = await to(Axios.get('http://localhost:3000/api/user'));

  if (err) {
    return { name: ctx.query.name as string, users: [] }
  };


  return { name: ctx.query.name as string, users: res?.data };
}

export default IndexPage;