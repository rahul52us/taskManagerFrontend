import { Card, Grid } from "@chakra-ui/react";
import BarChart from "../../../config/component/charts/BarChart";
import LineGraph from "../../../config/component/charts/LineChart";
import PieChart from "../../../config/component/charts/PieChart";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import { useEffect } from "react";
import { makeChartResponse } from "./utils/common";

const DashChartContainer = observer(() => {
  const {
    VideoStore: { getCategoryVideoCount, categoryVideosCount },
  } = store;

  useEffect(() => {
    getCategoryVideoCount()
      .then(() => {

      })
      .catch(() => {});
  }, [getCategoryVideoCount]);

  const videosChartData = makeChartResponse(categoryVideosCount.data, "title", "count", ["#FF5733", "#33FF57", "#3366FF", "#FF33A1", "#FFD700"]);

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr" }}
      gap={5}
      mb={5}
      mt={5}
    >
      <Card width={"100%"} minH={350} p={{ base: 0, sm: 2 }}>
        <BarChart
          data={videosChartData?.data}
          options={videosChartData?.options}
          loading={categoryVideosCount.loading}
        />
      </Card>
      <Card width={"100%"} minH={350} p={{ base: 0, sm: 2 }}>
        <LineGraph />
      </Card>
      <Card width={"100%"} minH={350} p={{ base: 0, sm: 2 }}>
        <PieChart />
      </Card>
    </Grid>
  );
});

export default DashChartContainer;
