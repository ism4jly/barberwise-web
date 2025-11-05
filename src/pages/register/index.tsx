import { useState, useContext } from "react"
import Head from "next/head"
import { Flex, Text, Center, Input, Button } from "@chakra-ui/react"
import Link from 'next/link'

import { AuthContext } from "@/context/AuthContext"

import { canSSRGuest } from "@/utils/canSSRGuest"

export default function Register(){
    const { signUp } = useContext(AuthContext)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleRegister(){
        if(name === "" || email === "" || password === ""){
            return;
        }

        await signUp({ name, email, password });

        setName("");
        setEmail("");
        setPassword("");
    }

    return(
        <>
        <Head>
            <title>BarberWise - Crie sua conta</title>
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
                        placeholder="Nome da Barbearia"
                        color="white"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    
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
                        onClick={handleRegister}
                    >
                        Cadastrar
                    </Button>

                    <Center>
                        <Link href="/login">
                            <Text
                                mt={6}
                                textAlign="center"
                                color="barber.100"
                                cursor="pointer"
                                _hover={{ color: "orange.900" }}
                            >
                                Já possui uma conta? Faça login
                            </Text>
                        </Link>
                    </Center>

                </Flex>
            </Flex>
        </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {}
    }
});