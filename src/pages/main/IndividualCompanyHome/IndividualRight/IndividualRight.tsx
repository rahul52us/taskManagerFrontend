import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { AiOutlineMail } from "react-icons/ai";
import IndividualRightFollowing from "./individualRightFollowing/IndividualRightFollowing";

const IndividualRight = observer(() => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const followersColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Box p={6} borderRadius="lg" bg={bgColor}>
      <Box textAlign="center">
        <Avatar size="2xl" name="Rahul Kushwah" mb={4} />
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          Rahul Kushwah
        </Text>
        <Text mt={1} fontSize="md" color={followersColor}>
          Followers: 12
        </Text>
        <Text mt={4} fontSize="sm" color={textColor}>
          About Me: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Box>
      <Flex justify="start" align="center" mt={6}>
        <Button
          colorScheme="blue"
          size="md"
          fontWeight="bold"
          borderRadius="full"
          _hover={{ bg: "blue.600" }}
        >
          Follow
        </Button>
        <IconButton
          ml={3}
          color={followersColor}
          aria-label="Send Email"
          icon={<AiOutlineMail size={20} />}
          isRound
          size="md"
          _hover={{ color: "blue.600" }}
        />
      </Flex>
      <IndividualRightFollowing />
    </Box>
  );
});

export default IndividualRight;
