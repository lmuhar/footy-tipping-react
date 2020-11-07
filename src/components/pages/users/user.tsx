import { ListItem, Flex, Stack, Text, Heading } from '@chakra-ui/core';
import { PrismaClient } from '@prisma/client';
import React from 'react';
import NextLink from 'next/link';

export async function getStaticProps() {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany({
    });
    return {
        props: {
            users
        }
    };
}

const User: React.FunctionComponent = (user) => {
    console.log(user);
    return (
          <ListItem
    border="1px solid"
    borderColor="gray.200"
    borderRadius={4}
    my={2}
    bg="white"
  >
      <Flex as="a">
        <Stack mt={4}>
          <Heading size="lg" fontWeight="500">
            {user}
          </Heading>
          <Text color="gray.700">{user}</Text>
        </Stack>
      </Flex>
  </ListItem>
    )
}

export default User;