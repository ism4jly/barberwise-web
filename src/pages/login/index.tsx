import Head from "next/head"
import { Flex, Text, Center, Input, Button } from "@chakra-ui/react"

import Link from 'next/link'

export default function Login(){
    return(
        <>
        <Head>
            <title>BarberWise - Faça login para acessar</title>
        </Head>
            <Flex background="#12131b" height="100vh" alignItems="center" justifyContent="center">
                <Flex width={640} direction="column" p={14} rounded={8} >
                    <Center mb={10}>
                        <Text fontSize="60px" fontWeight="bold" color="orange.900">
                            Barber
                        </Text>
                        <Text fontSize="60px" fontWeight="bold" color="white">
                            Wise
                        </Text>
                    </Center>

                    <Input
                        mb={3}
                        background="barber.400"
                        variant="subtle"
                        size="lg"
                        placeholder="Digite seu e-mail"
                        color="white"
                        type="email"
                    />

                    <Input
                        mb={6}
                        background="barber.400"
                        variant="subtle"
                        size="lg"
                        placeholder="********"
                        color="white"
                        type="password"
                    />

                    <Button
                        background="button.cta"
                        color="gray.900"
                        size="lg"
                        fontWeight="bold"
                    _hover={{ bg: "#ffb13e" }}
                    >
                        Acessar
                    </Button>

                    <Center>
                        <Link href="/register">
                            <Text
                                mt={6}
                                textAlign="center"
                                color="barber.100"
                                cursor="pointer"
                                _hover={{ color: "orange.900" }}
                            >
                                Não possui uma conta? Cadastre-se
                            </Text>
                        </Link>
                    </Center>

                </Flex>
            </Flex>
        </>
    )
}