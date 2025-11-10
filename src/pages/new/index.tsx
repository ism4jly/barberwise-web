import { useMemo, useState } from "react";
import Head from "next/head";
import { Sidebar } from "@/components/sidebar";

import {
    Flex,
    Heading,
    Button,
    Input,
    Select,
    Portal,
    createListCollection
} from '@chakra-ui/react'

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

import { useRouter } from "next/router";

interface HaircutProps {
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface NewProps {
    haircuts: HaircutProps[]
}


export default function New({haircuts} : NewProps){

    const [customer, setCustomer] = useState('');
    const [selectedHaircut, setSelectedHaircut] = useState(haircuts[0]);

    const router = useRouter();

    const collection = useMemo(() => {
        return createListCollection({
        items: haircuts.map((item) => ({
            name: item.name,
            value: item.id,
        })),
        itemToString: (item) => item.name,
        itemToValue: (item) => item.value,
        });
    }, [haircuts]);

    function handleChangeSelect(details) {
        const selectedId = details.value[0];
        const haircutItem = haircuts.find(haircut => haircut.id === selectedId);

        setSelectedHaircut(haircutItem);

    }

    async function handleRegister(){
        try{
            const apiClient = setupAPIClient();
            await apiClient.post('/schedule', {
                customer: customer,
                haircut_id: selectedHaircut?.id
            });
            alert('Agendamento realizado com sucesso!');

            router.push('/dashboard');
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <Head>
                <title>BarberWise - Novo agendamento</title>
            </Head>
            <Sidebar>
                <Flex direction="column" align="flex-start" justify="flex-start">
                    <Flex
                        w="100%"
                        direction="row"
                        align="center"
                        justify="flex-start"
                    >
                        <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="white">
                            Novo corte
                        </Heading>
                    </Flex>

                    <Flex
                        maxW="700px"
                        pt={8}
                        pb={8}
                        w="100%"
                        bg="barber.400"
                        direction="column"
                        align="center"
                        justify="center"
                    >
                        <Input
                            placeholder="Nome do cliente"
                            w="85%"
                            mb={3}
                            size="lg"
                            type="text"
                            bg="barber.900"
                            borderColor="gray.700"
                            color="white"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                        />
                        <Select.Root
                            collection={collection}
                            size="lg"
                            width="85%"
                            mb={3}
                            onValueChange={handleChangeSelect}
                        >
                            <Select.HiddenSelect />
                            <Select.Label color="white" fontWeight="bold">Selecione o corte</Select.Label>

                            <Select.Control bg="barber.900">
                                <Select.Trigger color="white" borderColor="gray.700">
                                <Select.ValueText placeholder="Escolha um corte" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>

                            <Portal>
                                <Select.Positioner>
                                <Select.Content>
                                    {collection.items.map((item) => (
                                    <Select.Item item={item} key={item.value}>
                                        {item.name}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                    ))}
                                </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>

                        <Button
                            w="85%"
                            size="lg"
                            color="gray.900"
                            bg="button.cta"
                            _hover={{ bg: "#ffb13e" }}
                            onClick={handleRegister}
                        >
                            Cadastrar
                        </Button>

                    </Flex>

                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try{
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get("/haircuts", {
            params: {
                status: true
            }
        })

        if(response.data === null){
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }

        return {
            props: {
                haircuts: response.data
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