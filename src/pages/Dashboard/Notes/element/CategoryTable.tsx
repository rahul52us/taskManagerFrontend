import {
  Avatar,
  Box,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import StarRatingIcon from "../../../../config/component/StarRatingIcon/StarRatingIcon";
import { FaEdit } from "react-icons/fa";
import Pagination from "../../../../config/component/pagination/Pagination";

const CategoryTable = ({ data, setFormModel }: any) => {
  return (
    <Box boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" pt={1} pr={1} pl={1} pb={4}>
      <Box m={2}>
        <Text fontWeight="bold" fontSize="xl" color="gray.400">
          COURSES CATEGORIES
        </Text>
      </Box>
      <Box
        position="relative"
        overflow="auto hidden"
        className="customScrollBar"
      >
        <Table
          className="customTable"
          variant="striped"
          colorScheme="teal"
          size="sm"
        >
          <Thead bg={"whiteAlpha.900"} stroke={"whiteAlpha.500"} h={10}>
            <Tr>
              <Th>Thumbnail</Th>
              <Th minW={150} textAlign="center">
                Title
              </Th>
              <Th minW={160} textAlign="center">
                Total Notes
              </Th>
              <Th minW={160} textAlign="center">
                Creator
              </Th>
              <Th minW={160} textAlign="center">
                Rating
              </Th>
              <Th minW={160} textAlign="center">
                Pricing Type
              </Th>
              <Th minW={160} textAlign="center">
                Original Price
              </Th>
              <Th minW={160} textAlign="center">
                Discount Price
              </Th>
              <Th minW={160} textAlign="center">
                Created Date
              </Th>
              <Th minW={100} textAlign="center">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item: any, index: any) => {
              return (
                <Tr key={index}>
                  <Td>
                    <Avatar
                      src={item.thumbnail}
                      name={item.title}
                      w={5}
                      h={5}
                    />
                  </Td>
                  <Td fontSize={"sm"} textAlign="center" minW={180}>
                    {item.title}
                  </Td>
                  <Td textAlign="center">{item.totalChildData}</Td>
                  <Td textAlign="center" w={180}>
                    {item.createdBy?.name}
                  </Td>
                  <Td textAlign="center" minW={160}>
                    <StarRatingIcon rating={item?.rating} />
                  </Td>
                  <Td textAlign="center">{item?.pricingType}</Td>
                  <Td textAlign="center">{item?.originalPrice}</Td>
                  <Td textAlign="center">{item?.discountPrice}</Td>
                  <Td textAlign="center">
                    {item?.createdAt
                      ? moment(item?.createdAt).format("DD-MM-YYYY")
                      : "-"}
                  </Td>
                  <Td
                    textAlign="center"
                    onClick={() =>
                      setFormModel({
                        open: true,
                        type: "edit",
                        data: item,
                      })
                    }
                  >
                    <Icon as={FaEdit} cursor="pointer" color="blue.500" />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      <Box mt={4}>
      <Pagination totalPages={5} currentPage={2} onPageChange={() => {}}/>
      </Box>
    </Box>
  );
};

export default CategoryTable;
