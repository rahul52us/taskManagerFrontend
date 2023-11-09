import {
  Box,
  Flex,
  Text,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useParams } from "react-router-dom";

const tabNames = ["Home", "About", "List", "Videos"];
const tabContents = [
  "Home Content",
  "About Content",
  "List Content",
  "Video Content",
];

const backgroundImageUrl =
  "https://miro.medium.com/v2/resize:fit:5880/1*ZHmzChivsHJ71QxTFnvp-g.jpeg";

const IndividualMain = observer(() => {
  const [selectedTab, setSelectedTab] = useState("Home");
  const { individualCompany } = useParams();

  const handleTabChange = (index: number) => setSelectedTab(tabNames[index]);

  return (
    <Box
      width="100%"
      paddingX={{ base: "0rem", md: "2rem", lg: "4rem", xl: "5rem" }}
      transition="background 0.3s ease"
    >
      <Box
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "150px",
        }}
      />
      <Flex
        // direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        align="center"
        cursor="pointer"
        mt={{ base: 3, md: 5 }}
        mb={{ base: 3, md: 5 }}
        transition="color 0.3s ease"
      >
        <Text
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="bold"
          mb={{ base: 3, md: 0 }}
        >
          {individualCompany?.split("-").join(" ")}
        </Text>
        <Icon as={FiMoreVertical} w={6} h={6} color="gray.500" />
      </Flex>
      <Tabs
        isFitted
        variant="enclosed"
        size="sm"
        colorScheme="#f0f0f0"
        onChange={handleTabChange}
        transition="background 0.3s ease"
      >
        <TabList>
          {tabNames.map((name, index) => (
            <Tab
              key={index}
              isSelected={selectedTab === name}
              _selected={{
                color: "white",
                bg: "teal.500",
                borderBottom: "0px solid #f0f0f0",
              }}
              fontSize={{ base: "sm", md: "md" }}
              transition="background 0.3s ease"
              mb={1}
            >
              {name}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabContents.map((content, index) => (
            <TabPanel key={index}>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
                color="teal.500"
              >
                {content}
              </Text>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
});

export default IndividualMain;