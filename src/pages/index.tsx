import Head from "next/head"
import { Flex, Text } from "@chakra-ui/react"

export default function Home(){
    return(
        <>
        <Head>
            <title>BarberWise - Seu sistema completo</title>
        </Head>
            <Flex background="#12131b" height="100vh" alignItems="center" justifyContent="center">
                <Text fontSize={30} color="white">Página Home</Text>
            </Flex>
        </>
    )
}