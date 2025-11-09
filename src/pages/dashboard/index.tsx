import Head from "next/head";
import { 
    Flex, 
    Text, 
    Heading, 
    Button,
    Link as ChakraLink,
    useMediaQuery

} from "@chakra-ui/react";

import Link from "next/link";
import { IoMdPerson } from "react-icons/io";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";

export default function Dashboard() {

    const [isMobile] = useMediaQuery(["(max-width: 768px)"])

    return (
        <>
            <Head>
                <title>BarberWise - Minha Barbearia</title>
            </Head>
            <Sidebar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
                    <Flex w="100%" direction="row" align="center" justify="flex-start">
                        <Heading color="white" fontSize="3xl" mt={4} mb={4} mr={4}>Agenda</Heading>
                        <Link href="/new">
                            <Button>Registrar</Button>
                        </Link>
                    </Flex>

                    <ChakraLink
                        w="100%"
                        m={0}
                        p={0}
                        mt={1}
                        bg="transparent"
                        style={{ textDecoration: "none" }}
                    >
                        <Flex
                            w="100%"
                            direction={isMobile ? "column" : "row"}
                            p={4}
                            rounded={4}
                            mb={4}
                            bg="barber.400"
                            justify="space-between"
                            align={isMobile ? "flex-start" : "center"}
                        >
                            <Flex
                                direction="row"
                                mb={isMobile ? 2 : 0}
                                align="center"
                                justify="center"
                            >
                                <IoMdPerson size={28} color="#f1f1f1" />
                                <Text color="white" fontWeight="bold" ml={4} lineClamp={1}>Ismael Freitas</Text>
                            </Flex>

                            <Text mb={isMobile ? 2 : 0} fontWeight="bold" color="white">Corte Completo</Text>
                            <Text mb={isMobile ? 2 : 0} fontWeight="bold"  color="white">R$ 59.90</Text>

                        </Flex>
                    </ChakraLink>
                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {
            
        }
    }
});
