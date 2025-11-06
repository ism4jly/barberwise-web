import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import { Flex, Text, Heading, Button, Stack, Switch, useMediaQuery } from "@chakra-ui/react";

import Link from "next/link";

import { IoMdPricetag } from "react-icons/io";

export default function Haircuts(){

    const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

    return(
        <>
            <Head>
                <title>BarberWise - Modelos de corte</title>
            </Head>
            <Sidebar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
                    <Flex
                        direction={isMobile ? "column" : "row"}
                        w="100%"
                        alignItems={isMobile ? "flex-start" : "center"}
                        justifyContent="flex-start"
                        mb={0}
                    >
                        <Heading
                            fontSize={isMobile ? "28px" : "3xl"}
                            mt={4}
                            mb={4}
                            mr={4}
                            color="orange.900"
                        >
                            Modelos de corte
                        </Heading>

                        <Link href="/haircuts/new">
                            <Button>
                                Cadastrar novo
                            </Button>
                        </Link>

                        <Stack ml="auto" align="center" direction="row">
                            <Text color="white" fontWeight="bold">ATIVOS</Text>
                            <Switch.Root colorPalette="green" size="lg">
                                <Switch.HiddenInput />
                                <Switch.Control />
                            </Switch.Root>
                        </Stack>
                    </Flex>

                    <Link href="/haircuts/123" style={{ width: "100%" }}>
                        <Flex
                            cursor="pointer"
                            w="100%"
                            p={4}
                            bg="barber.400"
                            direction="row"
                            rounded="4"
                            mb={2}
                            justifyContent="space-between"
                        >
                            <Flex
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <IoMdPricetag 
                                    size={28}
                                    color="#fba931"
                                />
                                <Text 
                                    color="white"
                                    ml={4}
                                    fontWeight="bold"
                                >
                                    Corte completo
                                </Text>
                            </Flex>

                            <Text fontWeight="bold" color="white">
                                Preço: R$ 59.90
                            </Text>

                        </Flex>
                    </Link>

                </Flex>
            </Sidebar>
        
        </>
    )
    
}