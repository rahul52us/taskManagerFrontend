import { observer } from "mobx-react-lite";
import { Button, Card, Grid } from "@chakra-ui/react";
import BarChart from "../../../../../config/component/charts/BarChart";
import { CardBoxShadow } from "../../../../../config/constant/variable";
import store from "../../../../../store/store";
import { useEffect } from "react";
import { makeChartResponse } from "../../../component/utils/common";

interface QuizFormI {
  setQuizTableDrawer: (value: any) => void;
}

const ChartIndex = observer(({ setQuizTableDrawer }: QuizFormI) => {
  const {
    quiz: { getCategoryQuizCount, categoryQuizCount },
  } = store;

  useEffect(() => {
    getCategoryQuizCount()
      .then(() => {})
      .catch(() => {});
  }, [getCategoryQuizCount]);

  const QuizChartData = makeChartResponse(
    categoryQuizCount.data,
    "Quiz Data",
    "title",
    "total category",
    ["#FF5733", "#33FF57", "#3366FF", "#FF33A1", "#FFD700"]
  );

  return (
    <div>
      <Grid gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Card width={"100%"} minH={350} p={3} boxShadow={CardBoxShadow}>
          <BarChart
            data={QuizChartData?.data}
            options={QuizChartData?.options}
            loading={categoryQuizCount.loading}
          />{" "}
        </Card>
        <Card width={"100%"} minH={350} p={3} boxShadow={CardBoxShadow}>
            <Button
              onClick={() =>
                setQuizTableDrawer({ open: true })
              }
            >
              Add New
            </Button>
        </Card>
      </Grid>
    </div>
  );
});

export default ChartIndex;