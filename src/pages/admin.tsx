import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ApplicationShell } from 'layouts/application-shell';
import NextLink from 'next/link';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTokenData from 'custom-hooks/useTokenData.hook';
import { Card } from 'components/card';
import { CreateRoundForm } from 'components/forms/create-round-form';
import { CreateLocationForm } from 'components/forms/create-location-form';
import { UserList } from 'components/user-list';

interface UpdateProfileInputs {
  username: string;
}

const LoginPage: NextPage = () => {
  const { user } = useTokenData();
  const { push } = useRouter();

  const [updateError, setUpdateError] = useState<boolean>(false);

  const updateMutation = useMutation(async (input: UpdateProfileInputs) => {
    if (!user) throw new Error('No user stored');
    return await axios.put(`/api/users/${user.id}`, input);
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInputs>();

  const onSubmit = (input: UpdateProfileInputs) => {
    setUpdateError(false);
    updateMutation.mutateAsync(input, {
      onSuccess: (res) => {
        localStorage.setItem('token', res.data.token);
        push('/');
      },
      onError: () => setUpdateError(true),
    });
  };

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
