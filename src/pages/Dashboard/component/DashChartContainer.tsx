import { Card, Grid } from "@chakra-ui/react";
import BarChart from "../../../config/component/charts/BarChart";
import PieChart from "../../../config/component/charts/PieChart";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import { useEffect } from "react";
import { makeChartResponse } from "./utils/common";

const DashChartContainer = observer(() => {
  const {
    VideoStore: { getCategoryVideoCount, categoryVideosCount },
    notesStore: { getCategoryCoursesCount, categoryCoursesCount },
  } = store;

  const fetchData = (getDataFn: any) =>
    new Promise((resolve, reject) => {
      getDataFn().then(resolve).catch(reject);
    });

  useEffect(() => {
    Promise.all([
      fetchData(getCategoryCoursesCount),
      fetchData(getCategoryVideoCount),
    ])
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [getCategoryVideoCount, getCategoryCoursesCount]);

  const videosChartData = makeChartResponse(
    categoryVideosCount.data,
    "Videos Data",
    "title",
    "count",
    ["#FF5733", "#33FF57", "#3366FF", "#FF33A1", "#FFD700"]
  );

  const coursesChartData = makeChartResponse(
    categoryCoursesCount.data,
    "Courses Data",
    "title",
    "count",
    ["#FF5733", "#33FF57", "#3366FF", "#FF33A1", "#FFD700"]
  );

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap={5}
      mb={5}
      mt={5}
    >
      <Card width={"100%"} minH={350} p={{ base: 0, sm: 2 }}>
        <BarChart
          data={coursesChartData?.data}
          options={coursesChartData?.options}
          loading={categoryCoursesCount.loading}
        />
      </Card>
      <Card width={"100%"} minH={350} p={{ base: 0, sm: 2 }}>
        <PieChart
          data={videosChartData?.data}
          options={videosChartData?.options}
          loading={categoryVideosCount.loading}
        />
      </Card>
    </Grid>
  );
});

export default DashChartContainer;
