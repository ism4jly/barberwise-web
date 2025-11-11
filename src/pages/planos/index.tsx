import Head from "next/head";
import { Button, Flex, Text, Heading, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

interface PlanosProps{
    premium: boolean
}

export default function Planos({ premium }: PlanosProps){

    const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

    return(
        <>
            <Head>
                <title>Planos - BarberWise</title>
            </Head>
            <Sidebar>
                <Flex direction="column" align="flex-start" justify="flex-start">
                    <Heading
                        fontSize="3xl"
                        mt={4}
                        mb={4}
                        mr={4}
                        color="white"
                    >
                        Planos
                    </Heading>
                </Flex>

                <Flex
                    pb={8}
                    maxW="780px"
                    w="100%"
                    direction="column"
                    align="flex-start"
                    justify="flex-start"
                >
                    <Flex
                        w="100%"
                        gap={4}
                        flexDirection={isMobile ? "column" : "row"}
                    >
                        <Flex
                            rounded={4}
                            p={2}
                            flex={1}
                            bg="barber.400"
                            direction="column"
                        >
                            <Heading
                                textAlign="center"
                                fontSize="2xl"
                                mt={2}
                                mb={4}
                                color="gray.100"
                            >
                                Plano Grátis
                            </Heading>

                            <Text color="white" fontWeight="medium" ml={4} mb={2}>Registrar cortes.</Text>
                            <Text color="white" fontWeight="medium" ml={4} mb={2}>Criar apenas 3 modelos de corte.</Text>
                            <Text color="white" fontWeight="medium" ml={4} mb={2}>Editar dados do perfil</Text>
                        </Flex>

                        <Flex
                            rounded={4}
                            p={2}
                            flex={1}
                            bg="barber.400"
                            direction="column"
                        >
                            <Heading
                                textAlign="center"
                                fontSize="2xl"
                                mt={2}
                                mb={4}
                                color="#31FB6A"
                            >
                                Plano Premium
                            </Heading>

                            <Text color="white" fontWeight="medium" ml={4} mb={2}>Registrar cortes ilimitados.</Text>
                            <Text color="white" fontWeight="medium" ml={4} mb={2}>Criar modelos ilimitados.</Text>
                            <Text color="white" fontWeight="medium" ml={4} mb={2}>Editar dados do perfil.</Text>
                            <Text color="white" fontWeight="medium" ml={4} mb={2}>Editar modelos de corte.</Text>
                            <Text color="white" fontWeight="medium" ml={4} mb={2}>Receber todas as atualizações.</Text>
                            <Text fontSize="2xl" color="#31FB6A" fontWeight="bold" ml={4} mb={2}>R$ 9.99</Text>

                            <Button
                                bg={premium ? "transparent" : "button.cta"}
                                m={2}
                                color="white"
                                fontWeight="bold"
                                _hover={{ bg: "gray.900"}}
                                onClick={() => {}}
                                disabled={premium}
                            >
                                {premium ? (
                                    "VOCÊ JÁ É PREMIUM"
                                ) : (
                                    "VIRAR PREMIUM"
                                )}
                            </Button>

                            {premium && (
                                <Button
                                    m={2}
                                    bg="white"
                                    color="barber.900"
                                    fontWeight="bold"
                                    onClick={() => {}}
                                >
                                    ALTERAR ASSINATURA
                                </Button>
                            )}

                        </Flex>

                    </Flex>

                </Flex>
            </Sidebar>
            
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try{
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/me');

        return {
            props:{
                premium: response.data?.subscriptions?.status === 'active' ? true : false
            }
        }
    }catch(err){
        console.log(err);
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        } 
    }
});