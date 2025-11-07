import { useState } from "react";
import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import { Flex, Text, Heading, Button, Stack, Switch, useMediaQuery, SwitchCheckedChangeDetails } from "@chakra-ui/react";

import Link from "next/link";

import { IoMdPricetag } from "react-icons/io";

import { canSSRAuth } from "@/utils/canSSRAuth";

import { setupAPIClient } from "@/services/api";

interface HaircutsItem{
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface HaircutsProps{
    haircuts: HaircutsItem[];
}

export default function Haircuts({haircuts} : HaircutsProps){

    const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

    const [haircutList, setHaircutList] = useState(haircuts || []);
    const [disabledHaircut, setDisabledHaircut] = useState("enabled");

    async function handleDisabled(details: SwitchCheckedChangeDetails) {
        
        setDisabledHaircut(details.checked ? "enabled" : "disabled");

        try {
            const apiClient = setupAPIClient();

            const status = details.checked ? true : false;

            const response = await apiClient.get('/haircuts', {
            params: {
                status: status,
            },
            });

            setHaircutList(response.data);
        } catch (err) {
            console.log(err);
        }
    }


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
                            <Switch.Root 
                                colorPalette="green" 
                                size="lg" 
                                value={disabledHaircut} 
                                onCheckedChange={handleDisabled}
                                checked={disabledHaircut !== "disabled"}
                            >
                                <Switch.HiddenInput />
                                <Switch.Control />
                            </Switch.Root>
                        </Stack>
                    </Flex>

                    {haircutList.map(haircut => (
                        <Link key={haircut.id} href={`/haircuts/${haircut.id}`} style={{ width: "100%" }}>
                            <Flex
                                cursor="pointer"
                                w="100%"
                                p={4}
                                bg="barber.400"
                                direction={isMobile ? "column" : "row"}
                                align={isMobile ? "flex-start" : "center"}
                                rounded="4"
                                mb={2}
                                justifyContent="space-between"
                            >
                                <Flex
                                    mb={isMobile ? 2 : 0}
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
                                        {haircut.name}
                                    </Text>
                                </Flex>

                                <Text fontWeight="bold" color="white">
                                    Preço: R$ {haircut.price}
                                </Text>

                            </Flex>
                        </Link>

                    ))}

                </Flex>
            </Sidebar>
        
        </>
    )
    
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try{
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/haircuts', {
            params: {
                status: true
            }
        });

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