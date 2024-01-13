import { useState, useEffect } from "react";
import { Text, Icon, Grid } from "@chakra-ui/react";
// import { FiUsers } from "react-icons/fi";
import { FaRegPlayCircle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const WidgetCard = ({
  totalCount,
  title,
  link,
}: {
  totalCount: number;
  title: string;
  link: string;
}) => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const intervalDelay = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < totalCount) {
        setCount(count + 1);
      }
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [count, totalCount]);

  return (
    <Grid
      border={"1px solid"}
      bg={"gray.50"}
      borderColor={"gray.300"}
      bgGradient="linear(to-r, #5ba6ff, #5fb8ff)"
      boxShadow="rgb(0 0 0 / 20%) 0px 0px 8px"
      p={"2rem 2rem 1rem 2rem"}
      borderRadius={"3xl"}
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "xl",
        bgGradient: "linear(to-r, #2ea8fc, #0060f6)",
      }}
      cursor="pointer"
      transition="transform 0.2s, box-shadow 0.2s"
      textAlign="center"
      onClick={() => navigate(link)}
      templateRows={{ lg: "2fr 0.5fr 1.25fr", sm: "auto" }}
      templateColumns={{ lg: "1fr", sm: "1fr 0.5fr 1fr" }}
    >
      <Icon
        as={FaRegPlayCircle}
        fontSize={"6xl"}
        rounded={10}
        p={2}
        gridColumn={{ sm: "1" }}
      />
      <Text fontSize="xl" fontWeight="bold" gridColumn={{ lg: "1", sm: "2" }}>
        {title}
      </Text>
      <Text
        fontSize="xl"
        fontWeight="semibold"
        gridColumn={{ lg: "1", sm: "2" }}
      >
        {count < totalCount ? count : totalCount}
      </Text>
    </Grid>
  );
};

export default WidgetCard;
