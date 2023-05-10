import { Flex, Image, Spacer, Text, VStack } from "@chakra-ui/react";

export const ErrorPage = (): JSX.Element => {
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      maxW={{ base: "100vw", md: "1080px" }}
      alignSelf="center"
      align="center"
      justifySelf="center"
      p={{ base: 6, md: 10 }}
    >
      <Spacer />
      <VStack align="stretch" spacing={8} maxW={{ base: "unset", md: "360px" }}>
        <Text>This letters link is not available.</Text>
        <Text>
          Please double check your letters link or contact the agency who has
          given you this link.
        </Text>
      </VStack>
    </Flex>
  );
};
