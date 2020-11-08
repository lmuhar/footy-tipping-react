import { FunctionComponent } from 'react';
import { Flex } from '@chakra-ui/core';
import Header from '../components/section/Header';

const DefaultLayout: FunctionComponent = ({ children }) => {
  return (
    <Flex direction="column">
      <Header />
      <Flex direction="column" maxW="lg" margin="auto" p="4">
        {children}
      </Flex>
    </Flex>
  );
};

export default DefaultLayout;
