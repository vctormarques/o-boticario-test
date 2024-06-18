import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useBoolean,
  useToast
} from '@chakra-ui/react';
import LandscapeLogoComponent from 'components/logo/landscape-logo';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormSubmitLogin } from 'types/submit-login.type';
import { loginSchema } from './login-schema.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { apiBoticario } from 'services/api';
import { AxiosResponse } from 'axios';
import { UserAuthState } from 'interfaces/user-auth-state.interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocalitonState } from 'types/location.type';
import { SigninOptions } from 'interfaces/auth-provider.interface';
import useAuth from 'hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useBoolean();
  const location = useLocation();
  const { signin, userState } = useAuth();
  const from = (location.state as LocalitonState)?.from.pathname || '/';
  const toast = useToast();

  const onSubmit: SubmitHandler<FormSubmitLogin> = async (payload) => {
    const { username, password } = payload;
    setIsLoading.on();

    apiBoticario
      .post('/auth/login', { username, password })
      .then(({ data }: AxiosResponse<UserAuthState>) => {
        const options: SigninOptions = {
          userState: data,
          callback: () => navigate(from, { replace: true })
        };

        signin(options);
      })
      .catch(({ response }) => {
        toast({
          title: 'Erro',
          description: response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      })
      .finally(() => {
        setIsLoading.off();
      });
  };

  const methods = useForm<FormSubmitLogin>({
    reValidateMode: 'onChange',
    resolver: yupResolver(loginSchema)
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods;

  return (
    <Flex
      w="100%"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <LandscapeLogoComponent w={250} h={110} borderRadius={20} />
      <Flex
        w={[340, 534]}
        mt={10}
        bg="gray.100"
        borderRadius={16}
        p={62}
        flexDir="column"
        boxShadow="md"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} flex="1">
            <Input
              placeholder="Usuário"
              type="text"
              size="lg"
              border="2px solid"
              borderColor="gray.300"
              {...register('username')}
            />
            <Text color="red">{errors.username?.message}</Text>

            <Input
              placeholder="Senha"
              type="password"
              size="lg"
              border="2px solid"
              borderColor="gray.300"
              {...register('password')}
            />
            <Text color="red">{errors.password?.message}</Text>
          </Stack>
          <Button
            type="submit"
            size="lg"
            bg="#00a470"
            isLoading={isLoading}
            fontWeight="semibold"
            fontSize="xl"
            mt={5}
            w="100%"
            color="white"
            _hover={{ filter: 'brightness(1.1)' }}
          >
            Entrar
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}
