import { NextPage } from 'next';
import { Stack } from '@chakra-ui/react';
import { ApplicationShell } from 'layouts/application-shell';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useTokenData from 'custom-hooks/useTokenData.hook';
import { Card } from 'components/card';
import { CreateRoundForm } from 'components/forms/create-round-form';
import { CreateLocationForm } from 'components/forms/create-location-form';
import { UserList } from 'components/user-list';

const LoginPage: NextPage = () => {
  const { user } = useTokenData();
  const { push } = useRouter();

  useEffect(() => {
    if (user && user?.role !== 'admin') push('/');
  }, [user, push]);

  return (
    <ApplicationShell>
      <Stack spacing={12}>
        <Card>
          <CreateRoundForm />
        </Card>
        <Card>
          <CreateLocationForm />
        </Card>
        <Card>
          <UserList />
        </Card>
      </Stack>
    </ApplicationShell>
  );
};

export default LoginPage;
