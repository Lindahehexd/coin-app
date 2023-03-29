import { useEffect, useState } from "react";
import axios from "axios";
import Coins from "../components/Coins";
import { Link } from "react-router-dom";
import { Box, HStack, VStack, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Header from "../components/Header";

import HomeSkeleton from "../components/HomeSkeleton";

const Home = () => {
  //父層 等等把這個coins 的值傳到Coin元件
  const [coins, setCoins] = useState([]);
  // 搜尋input的state
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const inputBg = useColorModeValue("gray.100", "gray.700");

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCoins(res.data);
        // console.log(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  //filer所有的coin.name 然後這些東西轉小寫的字與搜尋列符合

  const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

  const skeletonRow = () => {
    let row = [];
    for (let i = 0; i < 30; i++) {
      row.push(<HomeSkeleton key={i} />);
    }
    return row;
  };

  return (
    <VStack mx={4}>
      <Header />
      <Flex justify="center">
        <Input
          type="search"
          placeholder="Search Coins..."
          m={3}
          justifyItems="center"
          onChange={handleChange}
          bg={inputBg}
        />
      </Flex>
      {/* 先列符合filter內的東西， 如果沒有就map全部出來 */}

      <Flex justify="center" px={3}>
        <Box maxW="800px">
          <Flex gap={4} m={2} p={2} borderBottom="3px solid #f0f0f0" w="95%" justify="space-between">
            <Text>RANK</Text>
            <Text ml={{ sm: "15px" }}>Icon</Text>
            <Text ml={{ sm: "40px", lg: "5px" }} display={{ base: "none", md: "none", lg: "flex" }}>
              Price
            </Text>
            <Text mr={{ sm: 7, lg: 5 }}>24h</Text>
            <Text mr={{ sm: 1, lg: 5 }} display={{ base: "none", lg: "flex" }}>
              Volume
            </Text>
            <Text mr={{ sm: 1, lg: 1 }} display={{ base: "none", lg: "flex" }}>
              Mkt Cap
            </Text>
          </Flex>

          {loading && skeletonRow()}

          {filteredCoins.map((coin) => {
            return (
              <Link to={`/coin/${coin.id}`} key={coin.id}>
                <HStack w="100%">
                  <Coins
                    key={coin.id}
                    rank={coin.market_cap_rank}
                    name={coin.name}
                    img={coin.image}
                    symbol={coin.symbol}
                    price={coin.current_price.toLocaleString()}
                    priceChange={coin.price_change_percentage_24h.toFixed(1)}
                    volume={coin.total_volume.toLocaleString()}
                    market_cap={coin.market_cap.toLocaleString()}
                  />
                </HStack>
              </Link>
            );
          })}
        </Box>
      </Flex>
    </VStack>
  );
};

export default Home;
