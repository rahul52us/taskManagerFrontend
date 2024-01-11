import { useEffect } from "react";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../../component/Loader/Loader";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const AuthenticateLayout = observer(() => {
  const {
    auth: { restoreUser },
  } = store;
  const navigate = useNavigate();

  useEffect(() => {
    if (restoreUser()) {
      navigate("/");
    }
  }, [navigate, restoreUser]);

  return (
      <Grid minH={"100vh"} templateColumns={{ lg: "1fr 1fr", sm: "auto" }}>
        <Flex justifyContent={"center"}>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFnRGkEP6baYj2xctlFXfLDlQxnrCbd9spRQ&usqp=CAU"
            alt=""
          />
          <Text
            position={"absolute"}
            color={"white"}
            top={"40%"}
            fontSize={"4xl"}
          >
            ABCDEFGHI
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          minH="100vh"
          w="100%"
          bg={useColorModeValue("yellow", "gray.800")}
        >
          <Box m="auto" width={{base : '95%', sm : "60%"}}>
            <Suspense fallback={<Loader />}>
               <Outlet />
            </Suspense>
            </Box>
        </Flex>
      </Grid>
     );
});

export default AuthenticateLayout;