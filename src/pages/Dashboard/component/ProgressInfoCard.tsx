import { Card, Stack, CardBody, Heading, Box, Text } from "@chakra-ui/react";
import { FaRupeeSign } from "react-icons/fa";

const ProgressInfoCard = ({
  count,
  title,
  gradientColors
}: {
  title: string;
  count: number;
  gradientColors:any;
}) => {
  return (
    <Card
      direction={'row'}
      variant="elevated"
      _hover={{
        transform: "scale(1.05)",
      }}
      borderRadius={"2xl"}
      gap={6}
      cursor={"pointer"}
    >
      <Box
        p={10}
        // bgGradient={"linear(#f54646,#fc9e45)"}
        bgGradient={`linear(${gradientColors[0]},${gradientColors[1]})`}

        borderLeftRadius={"2xl"}
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
  );
};

export default ProgressInfoCard;
