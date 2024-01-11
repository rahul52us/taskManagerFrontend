import { observer } from "mobx-react-lite";
import TripCard from "../component/TripCard";
import { Grid } from "@chakra-ui/react";
import store from "../../../../../store/store";
import { useEffect } from "react";
const TripLayout = observer(({setTripFormData} : any) => {
  const {
    tripStore: {
      getAllTrip,
      trips: { hasFetch, data },
    },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    if (!hasFetch) {
      getAllTrip()
        .then(() => {})
        .catch((err) => {
          openNotification({ message: err.message, title: "Failed to Get Trips" });
        });
    }
  }, [hasFetch, getAllTrip, openNotification]);

  return (
    <div>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr 1fr 1fr 1fr",
        }}
        gap={4}
        columnGap={3}
      >
        {data.map((item: any, index: number) => {
          return <TripCard key={index} item={item} setTripFormData={setTripFormData} />;
        })}
      </Grid>
    </div>
  );
});

export default TripLayout;
