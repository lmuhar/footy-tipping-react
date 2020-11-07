import { Flex, Heading, Text } from "@chakra-ui/core";
import { NextPage } from "next";
import React from "react";

const IndexPage: NextPage = () => {
  return (
    <Flex direction="column" margin="auto">
        <Heading>Cats R Cool</Heading>
    </Flex>
  );
};

export default IndexPage;