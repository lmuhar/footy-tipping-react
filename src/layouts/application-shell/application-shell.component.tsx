import { Box, Container } from '@chakra-ui/react';
import { Navigation } from 'components/navigation';
import useTokenData from 'custom-hooks/useTokenData.hook';
import { PropsWithChildren } from 'react';

const ApplicationShell = ({ children }: PropsWithChildren<{ isLoggedInOnly?: boolean; isAdminOnly?: boolean }>) => {
  return (
    <Box as="main">
      <Navigation />
      <Container minW="sm" maxW="2xl" px="6" mt="36" pb="16">
        <>{children}</>
      </Container>
    </Box>
  );
};

export default ApplicationShell;
