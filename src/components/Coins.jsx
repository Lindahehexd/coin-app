// 把props傳出去給其他元件用 (下對上)
import { Flex, HStack, Box, useColorModeValue, SimpleGrid, GridItem, Image } from "@chakra-ui/react";

const Coins = ({ img, symbol, price, name, market_cap, rank, priceChange, volume }) => {
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <HStack>
      <Box w="1000px" gap={4} border="1px" borderColor="gray.200" rounded="md" m={2} p={2} _hover={{ bg: hoverBg }}>
        <SimpleGrid columns={6} spacing={3} alignItems="center" mx={2}>
          <Flex gap={7} alignItems="center">
            <GridItem>#{rank}</GridItem>
            <Image h="40px" src={img} alt="crypto" />
          </Flex>
          <GridItem>
            {name} ({symbol})
          </GridItem>
          <GridItem>${price}</GridItem>
          <GridItem fontWeight="medium" color={priceChange > 0 ? "green.400" : "red.400"}>
            {priceChange}%
          </GridItem>
          <GridItem>${volume}</GridItem>
          <GridItem>${market_cap}</GridItem>
        </SimpleGrid>
      </Box>
    </HStack>
  );
};

export default Coins;
