import Coins from "./Coins";
import { Skeleton, Stack, VStack } from "@chakra-ui/react";

const HomeSkeleton = () => {
  return (
    <Stack  spacing={6}>
      <Skeleton height='30px' w='700px' />
      <Skeleton height='30px' w='700px' />
      <Skeleton height='30px' w='700px' />
    </Stack>
  );
};

export default HomeSkeleton;
