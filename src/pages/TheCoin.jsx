import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Flex, Heading, VStack, Stack, Text, Box, Center, Spinner, Spacer, Badge, SimpleGrid } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import Chart from "../components/Chart";

const TheCoin = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [thecoin, setTheCoin] = useState({});
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setTheCoin(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center h="100vh" w="100%">
        <div>
          <Spinner />
        </div>
      </Center>
    );
  }

  return (
    <Center>
      <VStack m={4} spacing={7} p={8}>


        <Box w={{sm:'320px', md:'500px', lg:'800px'}} h={{ lg:'400px'}} align='center' bg='pink' justify='center' p={2}>

        <Chart />

        </Box>

        <Flex gap={4}>
          <img src={thecoin.image && thecoin.image.small} alt={thecoin.name} />
          <Heading>{thecoin.name}</Heading> # {thecoin.market_cap_rank}
        </Flex>

        <Flex w="100%"  justify="center">
          <SimpleGrid columns={[1,3,6]} justifyItems={{base:'center' , lg:'space-evenly'}} bg='pink' w="100%"  >
            <Flex gap={2} >
              <Text>1h:</Text>
              <Text
                fontWeight="medium"
                color={thecoin.market_data.price_change_percentage_1h_in_currency.usd > 0 ? "green.400" : "red.400"}
              >
                {thecoin.market_data && thecoin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%
              </Text>
            </Flex>

            <Flex  gap={2}>
              <Text>24h:</Text>

              <Text
                fontWeight="medium"
                color={thecoin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? "green.400" : "red.400"}
              >
                {thecoin.market_data && thecoin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%
              </Text>
            </Flex>
            <Flex  gap={2}>
              <Text >7 day: </Text>
              <Text
                fontWeight="medium"
                color={thecoin.market_data.price_change_percentage_7d_in_currency.usd > 0 ? "green.400" : "red.400"}
              >
                {thecoin.market_data && thecoin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text>14 day:</Text>
              <Text
                fontWeight="medium"
                color={thecoin.market_data.price_change_percentage_14d_in_currency.usd > 0 ? "green.400" : "red.400"}
              >
                {thecoin.market_data && thecoin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%
              </Text>
            </Flex>
            <Flex  gap={2}>
              <Text>30 day:</Text>
              <Text
                fontWeight="medium"
                color={thecoin.market_data.price_change_percentage_30d_in_currency.usd > 0 ? "green.400" : "red.400"}
              >
                {thecoin.market_data && thecoin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%
              </Text>
            </Flex>
            <Flex  gap={2}>
              <Text>1 year:</Text>
              <Text
                fontWeight="medium"
                color={thecoin.market_data.price_change_percentage_1y_in_currency.usd > 0 ? "green.400" : "red.400"}
              >
                {thecoin.market_data && thecoin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%
              </Text>
            </Flex>
          </SimpleGrid>

        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} bg="pink" w="100%" justifyItems="center">
          <Text fontWeight="bold" mt={5} fontSize="2xl" bg="teal">
            24hr High :
            <Badge colorScheme="green" fontSize="md">
              ${thecoin.market_data && thecoin.market_data.high_24h.usd.toLocaleString()}
            </Badge>
          </Text>
          <Text fontWeight="bold" mt={5} fontSize="2xl">
            24hr Low :
            <Badge colorScheme="red" fontSize="md">
              ${thecoin.market_data && thecoin.market_data.low_24h.usd.toLocaleString()}{" "}
            </Badge>
          </Text>
        </SimpleGrid>

        <Text fontWeight="bold" fontSize="2xl">
          ABOUT
        </Text>

        <Box bg="pink" maxW="728px">
          <Text
            dangerouslySetInnerHTML={{
              __html: thecoin.description && thecoin.description.en,
            }}
          ></Text>
        </Box>
      </VStack>
    </Center>
  );
};

export default TheCoin;
