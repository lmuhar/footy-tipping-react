import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { PropsWithChildren, useEffect } from 'react';
import NextLink from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useTokenData from 'custom-hooks/useTokenData.hook';
import { useRouter } from 'next/router';

const Navigation = () => {
  const { asPath, push } = useRouter();
  const { user, logout } = useTokenData();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onClose();
  }, [asPath, onClose]);

  return (
    <>
      <Box as="section" minW="sm" position="fixed" w="full" zIndex="overlay" top="0">
        <Box as="nav" bg="blue.500" py={{ base: '3', lg: '4' }} px="4">
          <Flex justify="space-between">
            <ButtonGroup variant="solid" colorScheme="blue">
              <HStack spacing={4}>
                <NextLink href="/" passHref>
                  <Heading size="md" as="a" color="white">
                    Footy Tipping 2022 🏉
                  </Heading>
                </NextLink>
                {isDesktop && user && (
                  <>
                    <Menu variant="solid">
                      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Tips
                      </MenuButton>
                      <MenuList>
                        <NextLink href="/tips" passHref>
                          <MenuItem as="a">View Tips</MenuItem>
                        </NextLink>
                        <NextLink href="/tips/enter" passHref>
                          <MenuItem as="a">Enter Tips</MenuItem>
                        </NextLink>
                      </MenuList>
                    </Menu>
                  </>
                )}
              </HStack>
            </ButtonGroup>
            <ButtonGroup variant="solid" colorScheme="blue">
              <HStack spacing={4}>
                {isDesktop && (
                  <>
                    {user && (
                      <>
                        <NextLink href="/me" passHref>
                          <Button as="a">My Profile</Button>
                        </NextLink>
                        <Button onClick={logout}>Log out</Button>
                      </>
                    )}
                    {!user && (
                      <>
                        <NextLink href="/login" passHref>
                          <Button as="a">Log in</Button>
                        </NextLink>
                        <NextLink href="/" passHref>
                          <Button as="a">Register</Button>
                        </NextLink>
                      </>
                    )}
                  </>
                )}
                {!isDesktop && <Button onClick={onOpen}>Open Menu</Button>}
              </HStack>
            </ButtonGroup>
          </Flex>
        </Box>
      </Box>

      {/* MOBILE MENU DRAWER */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack alignItems="flex-start">
              {/* Tips Menu */}
              <Heading size="md">General</Heading>
              <ButtonGroup variant="ghost" w="full">
                <VStack w="full">
                  <NextLink href="/" passHref>
                    <Button as="a" w="full" justifyContent="flex-start">
                      Home
                    </Button>
                  </NextLink>
                </VStack>
              </ButtonGroup>
              {/* Tips Menu */}
              {user && (
                <>
                  <Heading size="md">Tips</Heading>
                  <ButtonGroup variant="ghost" w="full">
                    <VStack w="full">
                      <NextLink href="/tips" passHref>
                        <Button as="a" w="full" justifyContent="flex-start">
                          View Tips
                        </Button>
                      </NextLink>
                      <NextLink href="/tips/enter" passHref>
                        <Button as="a" w="full" justifyContent="flex-start">
                          Enter Tips
                        </Button>
                      </NextLink>
                    </VStack>
                  </ButtonGroup>
                </>
              )}
              {/* Account Menu */}
              <Heading size="md">Account</Heading>
              <ButtonGroup variant="ghost" w="full">
                <VStack w="full">
                  {!user && (
                    <>
                      <NextLink href="/login" passHref>
                        <Button as="a" w="full" justifyContent="flex-start">
                          Log in
                        </Button>
                      </NextLink>
                      <NextLink href="/" passHref>
                        <Button as="a" w="full" justifyContent="flex-start">
                          Register
                        </Button>
                      </NextLink>
                    </>
                  )}
                  {user && (
                    <>
                      <NextLink href="/me" passHref>
                        <Button as="a" w="full" justifyContent="flex-start">
                          My Profile
                        </Button>
                      </NextLink>
                      <Button as="a" w="full" justifyContent="flex-start" onClick={logout}>
                        Log out
                      </Button>
                    </>
                  )}
                </VStack>
              </ButtonGroup>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const ApplicationShell = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box as="main">
      <Navigation />
      <Container minW="sm" maxW="2xl" px="6" mt="24">
        {children}
      </Container>
    </Box>
  );
};

export default ApplicationShell;
