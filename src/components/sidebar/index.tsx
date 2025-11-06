import { ReactNode } from "react";
import { 
    IconButton, 
    Box, 
    CloseButton, 
    Flex, 
    Icon, 
    Drawer, 
    DrawerContent,
    useDisclosure, 
    Text, 
    BoxProps, 
    FlexProps} from "@chakra-ui/react";

import { FiScissors, FiClipboard, FiSettings, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";

import Link from "next/link";

interface LinkItemProps {
    name: string;
    icon: IconType;
    route: string;
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Agenda', icon: FiScissors, route: '/dashboard'},
    { name: 'Cortes', icon: FiClipboard, route: '/haircuts'},
    { name: 'Minha Conta', icon: FiSettings, route: '/profile'},
]

export function Sidebar({children} : {children: ReactNode}) {

    const { open, onOpen, onClose } = useDisclosure();

    return(
        <Box minH="100vh" bg="barber.900">
            <SidebarContent 
            onClose={() => onClose}
            display={{base: 'none', md: 'block'}}
            />

            <Drawer.Root open={open} onOpenChange={onClose}>
                <Drawer.Backdrop />
                <Drawer.Content>
                    <SidebarContent onClose={() => onClose()} />
                </Drawer.Content>
            </Drawer.Root>

            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    )
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg="barber.400"
      borderRight="1px"
      borderRightColor="sidebarBorder"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      {/* Cabeçalho */}
      <Flex
        h="20"
        alignItems="center"
        justifyContent="space-between"
        mx="8"
      >
        <Link href="/dashboard">
          <Flex cursor="pointer" userSelect="none" flexDirection="row">
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="white">
              Barber
            </Text>
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="button.cta">
              Wise
            </Text>
          </Flex>
        </Link>
        <CloseButton color="white" display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {/* Itens da Sidebar */}
      <Box mt="4">
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} route={link.route}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  )
}


interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactNode;
    route: string;
}


const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
  return (
    <Link href={route} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color="white"
        _hover={{
          bg: 'barber.900',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
            color="white"
            _groupHover={{
              color: 'white',
            }}
          />
        )}
        <Text fontWeight="medium">{children}</Text>
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

const MobileNav = ({onOpen, ...rest} : MobileProps) => {
    return(
        <Flex 
            ml={{ base: 0, md:60}}
            px={{ base: 4, md:24}}
            height="20"
            alignItems="center"
            bg="mb_bg"
            borderBottomWidth="1px"
            borderBottomColor="sidebarBorder"
            justifyContent="flex-start"
            {...rest}
        >
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
            >
                <Icon as={FiMenu} color="white" />
            </IconButton>

            <Flex flexDirection="row">
                <Text ml={8} fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="white">
                    Barber
                </Text>
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="button.cta">
                    Wise
                </Text>
            </Flex>

        </Flex>
    )
}