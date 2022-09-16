import { useEffect } from 'react';
import NextLink from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useTokenData from 'custom-hooks/useTokenData.hook';
import { useRouter } from 'next/router';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
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
  MenuDivider,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

const Navigation = () => {
  const { asPath } = useRouter();
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
                        <MenuDivider />
                        {user.role === 'admin' && (
                          <NextLink href="/admin/results" passHref>
                            <MenuItem as="a">
                              Enter Results
                              <Badge ml="1" variant="subtle" rounded="sm">
                                Admin
                              </Badge>
                            </MenuItem>
                          </NextLink>
                        )}
                      </MenuList>
                    </Menu>
                    {user.role === 'admin' && (
                      <NextLink href="/admin" passHref>
                        <Button as="a" isActive={asPath === '/admin'}>
                          Admin
                        </Button>
                      </NextLink>
                    )}
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
                          <Button as="a" isActive={asPath === '/me'}>
                            My Profile
                          </Button>
                        </NextLink>
                        <Button onClick={logout}>Log out</Button>
                      </>
                    )}
                    {!user && (
                      <>
                        <NextLink href="/login" passHref>
                          <Button as="a" isActive={asPath === '/login'}>
                            Log in
                          </Button>
                        </NextLink>
                        <NextLink href="/register" passHref>
                          <Button as="a" isActive={asPath === '/register'}>
                            Register
                          </Button>
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
                    <Button as="a" w="full" justifyContent="flex-start" isActive={asPath === '/'}>
                      Home
                    </Button>
                  </NextLink>
                  {user && user.role === 'admin' && (
                    <NextLink href="/admin" passHref>
                      <Button as="a" w="full" justifyContent="flex-start" isActive={asPath === '/admin'}>
                        Admin
                      </Button>
                    </NextLink>
                  )}
                </VStack>
              </ButtonGroup>
              {/* Tips Menu */}
              {user && (
                <>
                  <Heading size="md">Tips</Heading>
                  <ButtonGroup variant="ghost" w="full">
                    <VStack w="full">
                      <NextLink href="/tips" passHref>
                        <Button as="a" w="full" justifyContent="flex-start" isActive={asPath === '/tips'}>
                          View Tips
                        </Button>
                      </NextLink>
                      <NextLink href="/tips/enter" passHref>
                        <Button as="a" w="full" justifyContent="flex-start" isActive={asPath === '/tips/enter'}>
                          Enter Tips
                        </Button>
                      </NextLink>
                      {user.role === 'admin' && (
                        <NextLink href="/admin/results" passHref>
                          <Button as="a" w="full" justifyContent="flex-start" isActive={asPath === '/admin/results'}>
                            Enter Results
                            <Badge ml="1" variant="subtle" rounded="sm">
                              Admin
                            </Badge>
                          </Button>
                        </NextLink>
                      )}
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
                        <Button as="a" w="full" justifyContent="flex-start" isActive={asPath === '/login'}>
                          Log in
                        </Button>
                      </NextLink>
                      <NextLink href="/register" passHref>
                        <Button as="a" w="full" justifyContent="flex-start" isActive={asPath === '/register'}>
                          Register
                        </Button>
                      </NextLink>
                    </>
                  )}
                  {user && (
                    <>
                      <NextLink href="/me" passHref>
                        <Button as="a" w="full" justifyContent="flex-start" isActive={asPath === '/me'}>
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

export default Navigation;
