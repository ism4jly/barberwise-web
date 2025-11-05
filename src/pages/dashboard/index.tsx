import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>BarberWise - Minha Barbearia</title>
            </Head>
            <Flex background="#12131b" height="100vh" alignItems="center" justifyContent="center">
                <Text fontSize={30} color="white">Página Dashboard</Text>
            </Flex>
        </>
    )
}
