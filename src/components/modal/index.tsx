import { Dialog, Button, Portal, CloseButton, Flex, Text } from "@chakra-ui/react";
import { FiUser, FiScissors } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ScheduleItem } from "@/pages/dashboard";

interface ModalInfoProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: ScheduleItem | undefined;
    finishService: () => Promise<void>;
}

export function ModalInfo({ isOpen, onClose, data, finishService }: ModalInfoProps) {
    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg="barber.400"
                        color="white"
                        p={6}
                        borderRadius="md"
                        boxShadow="lg"
                        position="relative"
                    >
                        <Dialog.Header>
                            <Dialog.Title fontSize="xl" fontWeight="bold">
                                Detalhes do Agendamento
                            </Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            {data ? (
                                <Flex direction="column" gap={3}>
                                    <Flex align="center" gap={2}>
                                        <FiUser size={28} color="#FFB13E" />
                                        <Text fontSize="large">
                                            <strong>Cliente:</strong> {data.customer}
                                        </Text>
                                    </Flex>

                                    <Flex align="center" gap={2}>
                                        <FiScissors size={28} color="#FFF" />
                                        <Text fontSize="large">
                                            <strong>Corte:</strong> {data.haircut.name}
                                        </Text>
                                    </Flex>

                                    <Flex align="center" gap={2}>
                                        <FaMoneyBillAlt size={28} color="#46ef75" />
                                        <Text fontSize="large">
                                            <strong>Preço:</strong> R$ {data.haircut.price}
                                        </Text>
                                    </Flex>
                                </Flex>
                            ) : (
                                <Text>Nenhum agendamento selecionado.</Text>
                            )}
                        </Dialog.Body>

                        <Dialog.Footer mt={4}>
                            <Button
                                onClick={finishService}
                                colorScheme="green"
                                mr={3}
                                bg="button.cta"
                                _hover={{ bg: "#FFB13E" }}
                                fontWeight="bold"
                            >
                                Finalizar serviço
                            </Button>
                        </Dialog.Footer>

                        <CloseButton
                            color="white"
                            position="absolute"
                            right={3}
                            top={3}
                            onClick={onClose}
                        />
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
