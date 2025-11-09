import { useState } from "react";
import Head from "next/head";
import {
    Flex,
    Text,
    Heading,
    Button,
    useMediaQuery,
    Input,
    Stack,
    Switch,
    SwitchCheckedChangeDetails
} from '@chakra-ui/react'

import { Sidebar } from "@/components/sidebar";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

import Router from "next/router";

interface HaircutProps {
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface SubscriptionProps {
    id: string;
    status: string;
}

interface EditHaircutProps {
    haircut: HaircutProps;
    subscription: SubscriptionProps | null;
}

export default function EditHaircut({ haircut, subscription }: EditHaircutProps) {
    const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

    const [name, setName] = useState(haircut?.name);
    const [price, setPrice] = useState(haircut?.price);
    const [status, setStatus] = useState(haircut?.status);

    const isSwitchChecked = !status; 

    function handleChangeStatus(details: SwitchCheckedChangeDetails) {
        const newStatus = details.checked ? false : true;
        setStatus(newStatus);

    }

    async function handleUpdate() {
        if (name === '' || price === '') return;

        try {
            const apiClient = setupAPIClient();

            await apiClient.put('/haircut', {
                haircut_id: haircut.id,
                name,
                price: Number(price),
                status,
            });

            alert('Corte atualizado com sucesso!');

            Router.push('/haircuts');
        } catch (err) {
            console.log(err);
        }
    }

    return (
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
                                color="white"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Input
                                placeholder="Valor do seu corte ex 45.90"
                                bg="gray.900"
                                borderColor="gray.700"
                                mb={3}
                                size="lg"
                                type="text"
                                w="100%"
                                color="white"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <Stack mb={6} align="center" direction="row">
                                <Text fontWeight="bold" color="white">Desativar corte</Text>
                                <Switch.Root
                                    colorPalette="red"
                                    size="lg"
                                    checked={isSwitchChecked}
                                    onCheckedChange={handleChangeStatus}
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
                                _hover={{ bg: "#ffb13e" }}
                                fontWeight="bold"
                                disabled={subscription?.status !== 'active'}
                                onClick={handleUpdate}
                            >
                                Salvar
                            </Button>

                            {subscription?.status !== 'active' && (
                                <Flex direction="row" align="center" justify="center">
                                    <Link href="/planos">
                                        <Text fontWeight="bold" mr={1} color="#31FB6a" cursor="pointer">
                                            Seja premium
                                        </Text>
                                    </Link>
                                    <Text color="white">
                                        e tenha todos acessos liberados.
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const { id } = ctx.params;

    try {
        const apiClient = setupAPIClient(ctx);
        const check = await apiClient.get('/haircut/check');
        const response = await apiClient.get("/haircut/detail", {
            params: { haircut_id: id }
        });

        return {
            props: {
                haircut: response.data,
                subscription: check.data?.subscriptions
            }
        }
    } catch (err) {
        console.log(err);
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        }
    }
});
