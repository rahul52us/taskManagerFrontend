import { useEffect } from "react";
import { Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../component/Loader/Loader";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { getSideData } from "./utils/constant";

const AuthenticateLayout = observer(() => {
  const {
    auth: { restoreUser },
  } = store;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isBelowMd = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    if (restoreUser()) {
      navigate("/");
    }
  }, [navigate, restoreUser]);

  return (
    <Grid minH={"100vh"} templateColumns={{ lg: "1fr 1fr", sm: "auto" }}>
      {isBelowMd ? (
        // Content for screens below 'md'
        null
      ) : (
        <Flex justifyContent={"center"}>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFnRGkEP6baYj2xctlFXfLDlQxnrCbd9spRQ&usqp=CAU"
            alt=""
          />
          <Box position={"absolute"} color={"white"}>
            <Text top={"40%"} fontSize={"4xl"}>
              {getSideData(pathname).title}
            </Text>
            <Text fontSize={20}>{getSideData(pathname).description}</Text>
          </Box>
        </Flex>
      )}
      <Flex
        flexDirection="column"
        minH="100vh"
        w="100%"
        bg={useColorModeValue("yellow", "gray.800")}
      >
        <Box m="auto" width={{ base: "95%", sm: "60%" }}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Box>
      </Flex>
    </Grid>
  );
});

export default AuthenticateLayout;
