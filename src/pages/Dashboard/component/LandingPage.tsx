import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import lambo from "../../../config/assets/icon_images/lambo.jpg";

interface LandingPageProps {
  headerText?: string;
  helperText?: string;
  heroImage?: any;
  onClick?: any;
  buttonText?: any;
}

export default function LandingPage({
  headerText,
  heroImage,
  helperText,
  onClick,
  buttonText,
}: LandingPageProps) {
  return (
    <>
      <Grid>
        <Image src={heroImage} />
        <Flex flexDir={"column"} justifyContent={"center"} align={"center"}>
          <Heading>{headerText}</Heading>
          <Text>{helperText}</Text>
          <Button my={6} onClick={onClick}>
            {buttonText}
          </Button>
        </Flex>
        <Flex
          mb={4}
          flexDir={"column"}
          justifyContent={"center"}
          align={"center"}
        >
          <Heading mt={10} mb={2}>
            Features that make this project stand out:
          </Heading>
          <Text>Insert some text here</Text>
        </Flex>
        <Grid my={5} px={"10vw"} templateColumns={"1fr 1fr 1fr 1fr"} gap={4}>
          <LandingPageCard />
          <LandingPageCard />
          <LandingPageCard />
          <LandingPageCard />
        </Grid>
        <Box my={5} minH={"30vh"} bg={"pink"}>
          {/* <LandingPageCircularCards/> */}
        </Box>
        <Box my={5} minH={"30vh"} bg={"blue.100"}>
          <Heading textAlign={"center"} mt={10} mb={4}>
            Lorem, ipsum dolor.
          </Heading>
          <Grid
            px={"10vw"}
            py={4}
            templateColumns={"1fr 1fr 1fr 1fr 1fr "}
            gap={4}
          >
            <LandingPageCardTall />
            <LandingPageCardTall />
            <LandingPageCardTall />
            <LandingPageCardTall />
            <LandingPageCardTall />
          </Grid>
        </Box>
        <Box my={5} minH={"30vh"}>
          <Heading textAlign={"center"} mb={4}>
            Lorem, ipsum dolor.
          </Heading>
          <Grid my={5} px={"10vw"} templateColumns={"1fr 1fr 1fr 1fr"} gap={4}>
            <LandingPageCardNoScale />
            <LandingPageCardNoScale />
            <LandingPageCardNoScale />
            <LandingPageCardNoScale />
          </Grid>
        </Box>
        <Box my={5} mb={"5vh"} minH={"30vh"}>
          <CardImgandText order={0} />
          <CardImgandText order={1} />
        </Box>
        <Box my={5} mb={"5vh"} minH={"30vh"}>
          {" "}
        </Box>
      </Grid>
    </>
  );
}
LandingPage.defaultProps = {
  headerText: "Lorem Ipsum",
  heroImage: lambo,
  helperText: "Hello, this is some sample text that should go here.",
  buttonText: "Click Me!",
};

export function LandingPageCard({}) {
  return (
    <>
      <Grid
        maxW={"25vw"}
        borderWidth="1px"
        borderRadius="lg"
        bg={"white"}
        p={4}
        boxShadow="lg"
        cursor="pointer"
        transition="transform 0.2s ease-in, box-shadow 0.2s"
        _hover={{ transform: "scale(1.02)", bg: "gray.100" }}
        templateRows={"3fr 2fr"}
        gap={2}
      >
        <Flex justifyContent={"center"}>
          <Image rounded={10} src={lambo} />
        </Flex>

        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Title
          </Text>
          <Text>Description</Text>
        </Box>
      </Grid>
    </>
  );
}

export const LandingPageCircularCards = () => {
  return (
    <Grid p={5} templateColumns={"1fr 1fr 1fr"}>
      <Grid templateColumns={"2fr 10fr"}>
        <Box minH={"10vh"} bg={"red"} borderRadius={"10vh"}></Box>
        <Box minH={"10vh"} bg={"red"} borderRightRadius={"10vh"}></Box>
      </Grid>
    </Grid>
  );
};

export function LandingPageCardTall({}) {
  return (
    <>
      <Grid
        maxW={"15vw"}
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        boxShadow="lg"
        bg={"white"}
        cursor="pointer"
        transition="transform 0.2s ease-in, box-shadow 0.2s"
        _hover={{ transform: "scale(1.05)", bg: "gray.100" }}
        templateRows={"1fr 1fr"}
        gap={2}
      >
        <Flex justifyContent={"center"}>
          <Image rounded={10} src={lambo} />
        </Flex>

        <Box>
          <Text textAlign={"center"} fontSize="xl" fontWeight="bold">
            Title 2
          </Text>
          <Text textAlign={"center"}>Description 2</Text>
        </Box>
      </Grid>
    </>
  );
}

export function LandingPageCardNoScale({}) {
  return (
    <>
      <Grid
        maxW={"25vw"}
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        boxShadow="lg"
        bg={"white"}
        cursor="pointer"
        _hover={{ bg: "gray.100" }}
        templateRows={"3fr 2fr"}
        gap={2}
      >
        <Flex justifyContent={"center"}>
          <Image rounded={10} src={lambo} />
        </Flex>

        <Box>
          <Text textAlign={"center"} fontSize="xl" fontWeight="bold">
            Title 2
          </Text>
          <Text textAlign={"center"}>Description 2</Text>
        </Box>
      </Grid>
    </>
  );
}

export function CardImgandText({ order }: any) {
  return (
    <Box my={20}>
      <Grid px={"15vw"} maxH={"30vh"} templateColumns={"1fr 1fr"} gap={4}>
        <Grid  order={order}>
          <Heading>Lorem ipsum dolor sit amet.</Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            praesentium? <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, hic.{" "}
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi,
            optio. <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            praesentium? <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, hic.{" "}
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi,
            optio. <br />
          </Text>
        </Grid>
        <Grid>
          <Image height={"300px"} w={"604px"} rounded={10} src={lambo} />
        </Grid>
      </Grid>
    </Box>
  );
}
