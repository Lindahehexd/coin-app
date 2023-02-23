// 把props傳出去給其他元件用 (下對上)
import { Flex, HStack, Box, useColorModeValue, SimpleGrid, GridItem, Image, Text } from "@chakra-ui/react";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";

const Coins = ({ img, symbol, price, name, market_cap, rank, priceChange, volume }) => {
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <HStack w="100%">
      <Flex
        gap={4}
        border="1px"
        borderColor="gray.200"
        rounded="md"
        m={2}
        p={2}
        _hover={{ bg: hoverBg }}
        justify="space-between"
        w="100%"
      >

        <Flex  w="100%" justify="left" align="center" gap={3}>
          <Flex  w="50px" justify="left">
            <Text>#{rank}</Text>
          </Flex>

          <Flex  align="center" justify="left" w="150px">
            <Image  h="40px" src={img} alt="crypto" mr={1} />
            <Text>
              {name} ({symbol})
            </Text>
          </Flex>

          <Flex  w="80px" display={{ base: "none",  lg: "flex" }} >
            <Text>${price}</Text>
          </Flex>

          <Flex w="50px" fontWeight="medium" color={priceChange > 0 ? "green.400" : "red.400"}>
            <Text>{priceChange}%</Text>
          </Flex>

          <Flex  w="120px" display={{ base: "none",md: "none",lg: "flex" }}>
            <Text>${volume}</Text>
          </Flex>

          <Flex  flexGrow={1} display={{ base: "none", md: "none", lg: "flex" }}>
            <Text>${market_cap}</Text>
          </Flex>
        </Flex>
      </Flex>
    </HStack>
  );
};

export default Coins;
