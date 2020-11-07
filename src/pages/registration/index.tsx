import { Box, Button, Flex, FormControl, Heading, Input } from "@chakra-ui/core";
import { NextPage } from "next";
import React from "react";

const IndexPage: NextPage = () => {
  return (
    <Flex direction="column" margin="auto">
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
            <form>
                <FormControl>
                    <Input id="email" type="email" placeholder="Email" />
                </FormControl>
                <FormControl mt={6}>
                    <Input id="username" type="text" placeholder="Username" />
                </FormControl>
                <FormControl mt={6}>
                    <Input id="password" type="password" placeholder="Password" />
                </FormControl>
                <Button type="submit" width="full" mt={4}>
                    Register
                </Button>
            </form>
        </Box>
      </Box>
    </Flex>
    </Flex>
  );
};

export default IndexPage;