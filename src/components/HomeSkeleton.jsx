import Coins from "./Coins";
import { Skeleton, Stack, VStack } from "@chakra-ui/react";

const HomeSkeleton = () => {
  return (
    <Stack >
      <Skeleton height='60px'>
        <VStack>
          <Coins />
        </VStack>
      </Skeleton>
    </Stack>
  );
};

export default HomeSkeleton;
