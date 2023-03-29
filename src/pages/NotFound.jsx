import React from "react";
import { Center, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Center h="90vh">
      <VStack spacing={6}>
        <Heading>404 Page not found...</Heading>
        <Text>This url is not correct.</Text>
        <Link to="/">
          <Text fontWeight="bold" color="red.400">
            Go Back Home
          </Text>
        </Link>
      </VStack>
    </Center>
  );
};

export default NotFound;
