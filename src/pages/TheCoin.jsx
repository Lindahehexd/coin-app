import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Flex, Heading, VStack, Stack, Text, Box, Center, Spinner, Spacer, Badge } from "@chakra-ui/react";
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
      <VStack m={4} maxWidth="768px" spacing={7}>
        <Chart />

        <Flex gap={4}>
          <img src={thecoin.image && thecoin.image.small} alt={thecoin.name} />
          <Heading>{thecoin.name}</Heading> # {thecoin.market_cap_rank}
        </Flex>

        <TableContainer w="100vh">
          <Table>
            <Thead>
              <Tr>
                <Th>1h</Th>
                <Th>24h</Th>
                <Th>7 day</Th>
                <Th>14 day</Th>
                <Th>30 day</Th>
                <Th>1 year</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontWeight="medium" color={thecoin.market_data.price_change_percentage_1h_in_currency.usd > 0 ? "green.400" : "red.400"}>
                  {thecoin.market_data && thecoin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%
                </Td>
                <Td fontWeight="medium" color={thecoin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? "green.400" : "red.400"}>
                  {thecoin.market_data && thecoin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%
                </Td>
                <Td fontWeight="medium" color={thecoin.market_data.price_change_percentage_7d_in_currency.usd > 0 ? "green.400" : "red.400"}>
                  {thecoin.market_data && thecoin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%
                </Td>
                <Td fontWeight="medium" color={thecoin.market_data.price_change_percentage_14d_in_currency.usd > 0 ? "green.400" : "red.400"}>
                  {thecoin.market_data && thecoin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%
                </Td>
                <Td fontWeight="medium" color={thecoin.market_data.price_change_percentage_30d_in_currency.usd > 0 ? "green.400" : "red.400"}>
                  {thecoin.market_data && thecoin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%
                </Td>
                <Td fontWeight="medium" color={thecoin.market_data.price_change_percentage_1y_in_currency.usd > 0 ? "green.400" : "red.400"}>
                  {thecoin.market_data && thecoin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Flex gap={20}>
          <Text fontWeight="bold" mt={5} fontSize="2xl">
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
        </Flex>

        <Flex>
          <Text fontWeight="bold" fontSize="2xl">
            ABOUT
          </Text>
        </Flex>

        <Text
          dangerouslySetInnerHTML={{
            __html: thecoin.description && thecoin.description.en,
          }}
        ></Text>
      </VStack>
    </Center>
  );
};

export default TheCoin;
