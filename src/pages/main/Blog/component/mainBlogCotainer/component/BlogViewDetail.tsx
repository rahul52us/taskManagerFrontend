import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { getCustomTextDate } from "../../../../../../config/constant/dateUtils";

const BlogViewDetail = ({item} : any) => {
  return (
    <Flex gap={3} mb={6}>
      <Box>
        <Image
          src="https://tse4.mm.bing.net/th?id=OIP.HxV79tFMPfBAIo0BBF-sOgHaEy&pid=Api&P=0&h=180"
          style={{ width: "40px", height: "40px" }}
          borderRadius={5}
        />
      </Box>
      <Box>
        <Box display="flex" fontSize="sm" gap={1}>
          <Text color="gray.600" fontWeight={600}>
            {item?.createdBy?.name}
          </Text>
        </Box>
        <Text fontSize="xs" color="gray.600" fontWeight={600}>
          {getCustomTextDate('Posted on',item?.createdAt)}
        </Text>
      </Box>
    </Flex>
  );
};
export default BlogViewDetail;
