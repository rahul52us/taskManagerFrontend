import { Card, Stack, CardBody, Heading, Box, Text } from "@chakra-ui/react";
import { FaRupeeSign } from "react-icons/fa";

const ProgressInfoCard = ({
  count,
  title,
}: {
  title: string;
  count: number;
}) => {
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        variant="elevated"
        _hover={{
          transform: "scale(1.05)",
        }}
        borderRadius={"3xl"}
        gap={6}
        cursor={"pointer"}
        maxW={"25vw"}
      >
        <Box
          p={10}
          bgGradient={"linear(#f54646,#fc9e45)"}
          borderLeftRadius={"3xl"}
        >
          <FaRupeeSign fontSize={"2.5rem"} color="white" />
        </Box>
        <Stack>
          <CardBody py={6}>
            <Heading size="md">{count}</Heading>
            <Text py="2">{title}</Text>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
};

export default ProgressInfoCard;
