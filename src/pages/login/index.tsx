import { useState, useContext } from "react"
import Head from "next/head"
import { Flex, Text, Center, Input, Button } from "@chakra-ui/react"
import Link from 'next/link'

import { AuthContext } from "@/context/AuthContext"

export default function Login(){
    const { signIn } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin(){
        await signIn({ email, password })
    }

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        mb={6}
                        background="barber.400"
                        variant="subtle"
                        size="lg"
                        placeholder="********"
                        color="white"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        background="button.cta"
                        color="gray.900"
                        size="lg"
                        fontWeight="bold"
                        _hover={{ bg: "#ffb13e" }}
                        onClick={handleLogin}
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