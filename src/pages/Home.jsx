import React, { useEffect, useState } from "react";
import axios from "axios";
import Coins from "../components/Coins";
import { Link } from "react-router-dom";
import { Box, Heading, HStack, VStack, Stack, Center, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import Header from "../components/Header";

import HomeSkeleton from "../components/HomeSkeleton";

const Home = () => {
  //父層 等等把這個coins 的值傳到Coin元件
  const [coins, setCoins] = useState([]);
  // 搜尋input的state
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

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


  const  skeletonRow = () => {
    let row =[]
    for (let i = 0; i < 30; i++) {
      row.push(<HomeSkeleton key={i}/>);
    }
    return row
  }

  return (
    <VStack>
      <Header />
      <form>
        <Input type="search" placeholder="Search Coins..." m={3} justifyItems="center" onChange={handleChange}></Input>
      </form>
      {/* 先列符合filter內的東西， 如果沒有就map全部出來 */}

      <Box w="1000px" gap={4} m={2} p={2} borderBottom="3px solid #f0f0f0">
        <SimpleGrid columns={6} spacing={3} alignItems="center" mx={2}>
          <p>RANK</p>
          <p className="coin-name">Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p className="hide-mobile">Volume</p>
          <p className="hide-mobile">Mkt Cap</p>
        </SimpleGrid>
      </Box>

      {loading && skeletonRow()}

      {filteredCoins.map((coin) => {
        return (
          <Link to={`/coin/${coin.id}`} key={coin.id}>
            <HStack>
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
    </VStack>
  );
};

export default Home;
