import { useState } from "react";
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
import { setupAPIClient } from "@/services/api";
import { Sidebar } from "@/components/sidebar";

export interface ScheduleItem {
    id: string;
    customer: string;
    haircut: {
        id: string;
        name: string;
        price: number | string;
        user_id: string;
    }
}

interface DashboardProps{
    schedule: ScheduleItem[]
}

export default function Dashboard({ schedule } : DashboardProps) {
    const [list, setList] = useState(schedule);

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

                    {list.map(item => (
                        <ChakraLink
                            key={item?.id}
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
                                    <Text color="white" fontWeight="bold" ml={4} lineClamp={1}>{item?.customer}</Text>
                                </Flex>

                                <Text mb={isMobile ? 2 : 0} fontWeight="bold" color="white">{item?.haircut?.name}</Text>
                                <Text mb={isMobile ? 2 : 0} fontWeight="bold"  color="white">R$ {item?.haircut?.price}</Text>

                            </Flex>
                        </ChakraLink>
                    ))}
                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try{
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/schedule');

        return {
            props: {
                schedule: response.data
            }
        }
    }catch(err){
        console.log(err);
        return {
            props:{
                schedule:[]
            }
        }
    }
});
