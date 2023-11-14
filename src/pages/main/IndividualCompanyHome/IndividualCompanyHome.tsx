import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import { toJS } from "mobx";
import IndividualMain from "./IndividualMain/IndividualMain";
import IndividualRight from "./IndividualRight/IndividualRight";
import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";

const IndividualCompanyHome = observer(() => {
  const {
    auth: { user },
  } = store;

  console.log("the users is", toJS(user));

  const borderColor = useColorModeValue("#f0f0f0", "teal.700");

  return (
    <Grid gridTemplateColumns={{ base: "1fr", md: "2fr 1fr" }} px={{ md: 3 }}>
      <GridItem borderRight={`1px solid ${borderColor}`}>
        <IndividualMain />
      </GridItem>
      <GridItem>
        <IndividualRight />
      </GridItem>
    </Grid>
  );
});

export default IndividualCompanyHome;
