import Coins from "./Coins";
import { Skeleton, Stack, VStack } from "@chakra-ui/react";

const HomeSkeleton = () => {
  return (
    <Stack  spacing={6}>
      <Skeleton height='30px' w={{sm:'350px', lg:'700px'}} />
      <Skeleton height='30px' w={{sm:'350px', lg:'700px'}} />
      <Skeleton height='30px' w={{sm:'350px', lg:'700px'}} />
    </Stack>
  );
};

export default HomeSkeleton;
