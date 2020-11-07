import { Flex } from "@chakra-ui/core";
import { NextPage } from "next";
import React from "react";

const IndexPage: NextPage = () => {
  return (
    <Flex direction="column" align="center" justify= "center">
      <Flex justify="center" align="center" w="100%" h="93vh">
        Hello World
      </Flex>
    </Flex>
  );
};

export default IndexPage;