import { useMemo } from "react";
import NextLink from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
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
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navigation = () => {
  const { asPath, push } = useRouter();
  const { data, status } = useSession();

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isAuthenticated = useMemo(() => status === "authenticated", [status]);
  const isAdmin = useMemo(() => data?.user.role === "admin", [data]);

  return (
    <>
      <Box
        as="section"
        minW="sm"
        position="fixed"
        w="full"
        zIndex="overlay"
        top="0"
      >
        <Box as="nav" bg="blue.500" py={{ base: "3", lg: "4" }} px="4">
          <Flex justify="space-between">
            <ButtonGroup variant="solid" colorScheme="blue">
              <HStack spacing={4}>
                <NextLink href="/" passHref>
                  <Heading size="md" color="white">
                    Footy Tipping 2024 🏉
                  </Heading>
                </NextLink>
                {isDesktop && isAuthenticated && (
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
                        <NextLink href="/admin/results" passHref>
                          <MenuItem as="a" hidden={!isAdmin}>
                            Enter Results
                            <Badge ml="1" variant="subtle" rounded="sm">
                              Admin
                            </Badge>
                          </MenuItem>
                        </NextLink>
                      </MenuList>
                    </Menu>
                    <Button
                      onClick={() => push("/admin")}
                      isActive={asPath === "/admin"}
                      hidden={!isAdmin}
                    >
                      Admin
                    </Button>
                  </>
                )}
              </HStack>
            </ButtonGroup>
            <ButtonGroup variant="solid" colorScheme="blue">
              <HStack spacing={4}>
                {isDesktop && (
                  <>
                    <Button
                      isActive={asPath === "/me"}
                      onClick={() => push("/me")}
                      hidden={!isAuthenticated}
                    >
                      My Profile
                    </Button>
                    <Button onClick={() => signOut()} hidden={!isAuthenticated}>
                      Log out
                    </Button>
                    <Button onClick={() => signIn()} hidden={isAuthenticated}>
                      Sign in
                    </Button>
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
                    <Button
                      as="a"
                      w="full"
                      justifyContent="flex-start"
                      isActive={asPath === "/"}
                    >
                      Home
                    </Button>
                  </NextLink>
                  {isAdmin && (
                    <NextLink href="/admin" passHref>
                      <Button
                        as="a"
                        w="full"
                        justifyContent="flex-start"
                        isActive={asPath === "/admin"}
                      >
                        Admin
                      </Button>
                    </NextLink>
                  )}
                </VStack>
              </ButtonGroup>
              {/* Tips Menu */}
              {isAuthenticated && (
                <>
                  <Heading size="md">Tips</Heading>
                  <ButtonGroup variant="ghost" w="full">
                    <VStack w="full">
                      <NextLink href="/tips" passHref>
                        <Button
                          as="a"
                          w="full"
                          justifyContent="flex-start"
                          isActive={asPath === "/tips"}
                        >
                          View Tips
                        </Button>
                      </NextLink>
                      <NextLink href="/tips/enter" passHref>
                        <Button
                          as="a"
                          w="full"
                          justifyContent="flex-start"
                          isActive={asPath === "/tips/enter"}
                        >
                          Enter Tips
                        </Button>
                      </NextLink>
                      {isAdmin && (
                        <NextLink href="/admin/results" passHref>
                          <Button
                            as="a"
                            w="full"
                            justifyContent="flex-start"
                            isActive={asPath === "/admin/results"}
                          >
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
                  {!isAuthenticated && (
                    <>
                      <Button
                        as="a"
                        w="full"
                        justifyContent="flex-start"
                        onClick={() => signIn()}
                        isActive={asPath === "/login"}
                      >
                        Sign in
                      </Button>
                    </>
                  )}
                  {isAuthenticated && (
                    <>
                      <Button
                        as="a"
                        w="full"
                        justifyContent="flex-start"
                        onClick={() => signOut()}
                      >
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
