import { NextPage } from 'next';
import { Button, Heading, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ApplicationShell } from 'layouts/application-shell';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useTokenData from 'custom-hooks/useTokenData.hook';
import { Card } from 'components/card';
import { CreateRoundForm } from 'components/forms/create-round-form';
import { CreateLocationForm } from 'components/forms/create-location-form';
import { UserList } from 'components/user-list';
import { AddTeamForm } from 'components/forms/add-team-form';
import { RoundList } from 'components/round-list';
import CreateGameForm from 'components/forms/create-game-form/create-game-form.component';
import { GameList } from 'components/game-list';
import { LocationList } from 'components/location-list';
import { TeamList } from 'components/team-list';
import { trpc } from 'utils/trpc';

const LoginPage: NextPage = () => {
  const utils = trpc.useUtils();
  const { user } = useTokenData();
  const { push } = useRouter();

  useEffect(() => {
    if (user && user?.role !== 'admin') push('/');
  }, [user, push]);

  const primeMutation = trpc.primeLadder.useMutation();

  const handlePrimeTeamsOnClick = () => {
    primeMutation.mutate();
    utils.getTeams.invalidate();
  };

  return (
    <ApplicationShell>
      <Stack spacing={12}>
        {/* Rounds */}
        <Card>
          <Heading size="md" mb="2">
            Rounds
          </Heading>
          <Tabs isFitted>
            <TabList mb="1em">
              <Tab>Create Round</Tab>
              <Tab>View Rounds</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CreateRoundForm />
              </TabPanel>
              <TabPanel>
                <RoundList />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Card>

        {/* Games */}
        <Card>
          <Heading size="md" mb="2">
            Games
          </Heading>
          <Tabs isFitted>
            <TabList mb="1em">
              <Tab>Create Game</Tab>
              <Tab>View Games</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CreateGameForm />
              </TabPanel>
              <TabPanel>
                <GameList />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Card>

        {/* Locations */}
        <Card>
          <Heading size="md" mb="2">
            Locations
          </Heading>
          <Tabs isFitted>
            <TabList mb="1em">
              <Tab>Create Location</Tab>
              <Tab>View Locations</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CreateLocationForm />
              </TabPanel>
              <TabPanel>
                <LocationList />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Card>

        {/* Teams */}
        <Card>
          <HStack mb="2">
            <Heading size="md">Teams</Heading>
            <Button size="xs" colorScheme="blue" onClick={handlePrimeTeamsOnClick} isLoading={primeMutation.isPending}>
              Prime Teams
            </Button>
          </HStack>
          <Tabs isFitted>
            <TabList mb="1em">
              <Tab>Create Team</Tab>
              <Tab>View Teams</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AddTeamForm />
              </TabPanel>
              <TabPanel>
                <TeamList />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Card>

        {/* Users */}
        <Card>
          <Heading size="md" mb="2">
            Users
          </Heading>
          <UserList />
        </Card>
      </Stack>
    </ApplicationShell>
  );
};

export default LoginPage;
