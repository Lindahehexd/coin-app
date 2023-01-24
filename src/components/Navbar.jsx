import { Box, Flex, useColorModeValue, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";

export default function Navbar() {


const navBg = useColorModeValue('red.300', 'gray.700')
const hoverBg = useColorModeValue('gray.200', 'gray.300')
const txtColor = useColorModeValue('gray.600', 'gray.600')

  return (
      <Box bg={navBg} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link to="/">
            <Box bg='gray.50' px={4} rounded='2xl'  _hover={{ bg: hoverBg }} >
            <Text fontSize="xl" fontWeight='bold' color={txtColor}>Coin Tracker</Text>
            </Box>
          </Link>
          <Flex alignItems={"center"}>
            <DarkModeButton />
          </Flex>
        </Flex>
      </Box>
  );
}
