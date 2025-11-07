import Head from "next/head";
import {
    Flex,
    Text,
    Heading,
    Button,
    useMediaQuery,
    Input,
    Stack, 
    Switch
} from '@chakra-ui/react'

import { Sidebar } from "@/components/sidebar";
import { FiChevronLeft } from "react-icons/fi";

import Link from "next/link";

export default function EditHaircut(){
    const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

    return(
        <>
            <Head>
                <title>BarberWise - Editar Corte</title>
            </Head>
            <Sidebar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
                    <Flex
                        direction={isMobile ? "column" : "row"}
                        w="100%"
                        alignItems={isMobile ? "flex-start" : "center"}
                        justifyContent="flex-start"
                        mb={isMobile ? 4 : 0}
                    >
                        <Link href="/haircuts">
                            <Button mr={3} p={4} display="flex" alignItems="center" justifyContent="center">
                                <FiChevronLeft size={24} color="white" />
                                Voltar
                            </Button>
                        </Link>

                        <Heading fontSize={isMobile ? "22px" : "3xl"} color="white">
                            Editar corte
                        </Heading>
                    </Flex>

                    <Flex
                        mt={4}
                        maxW="700px"
                        pt={8}
                        pb={8}
                        w="100%"
                        bg="barber.400"
                        direction="column"
                        align="center"
                        justify="center"
                    >
                        <Heading mb={4} color="white" fontSize={isMobile ? "22px" : "3xl"}>Editar corte</Heading>

                        <Flex w="85%" direction="column">
                            <Input
                                placeholder="Nome do corte"
                                bg="gray.900"
                                borderColor="gray.700"
                                mb={3}
                                size="lg"
                                type="text"
                                w="100%"
                            />

                            <Input
                                placeholder="Valor do seu corte ex 45.90"
                                bg="gray.900"
                                borderColor="gray.700"
                                mb={3}
                                size="lg"
                                type="text"
                                w="100%"
                            />

                            <Stack mb={6} align="center" direction="row">
                                <Text fontWeight="bold" color="white">Desativar corte</Text>
                                <Switch.Root 
                                    colorPalette="red" 
                                    size="lg" 
                                >
                                <Switch.HiddenInput />
                                <Switch.Control />
                            </Switch.Root>
                            </Stack>

                            <Button
                                mb={6}
                                w="100%"
                                bg="button.cta"
                                color="gray.900"
                                _hover={{ bg: "#ffb13e"}}
                                fontWeight="bold"
                            >
                                Salvar
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
}