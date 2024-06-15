import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useBoolean
} from '@chakra-ui/react';
import LandscapeLogoComponent from 'components/logo/landscapeLogo';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormSubmitLogin } from 'types/submit-login.type';
import { loginSchema } from './login-schema.validation';
import { yupResolver } from '@hookform/resolvers/yup';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useBoolean();
  const onSubmit: SubmitHandler<FormSubmitLogin> = async (payload) => {
    const { username, password } = payload;
    console.log(username);
    setIsLoading.on();
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
