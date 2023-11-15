import { useState, useEffect } from "react";
import { Box, Button, Card, Grid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import BarChart from "../../../config/component/charts/BarChart";
import store from "../../../store/store";
import CategoryTable from "./element/CategoryTable";
import CustomDrawer from "../../../config/component/Drawer/CustomDrawer";
import FormComponent from "./element/FormComponent";
import { CardBoxShadow, headerHeight } from "../../../config/constant/variable";
import { makeChartResponse } from "../component/utils/common";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { dashboard } from "../../../config/constant/routes";

const NotesIndex = observer(() => {
  const [formModel, setFormModel] = useState({
    open: false,
    type: "add",
    data: null,
  });
  const {
    notesStore: {
      getCategories,
      categories,
      getCategoryCoursesCount,
      categoryCoursesCount,
    },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    if (!categories.hasFetch) {
      getCategoryCoursesCount()
        .then(() => {})
        .catch(() => {});
      getCategories({ page: 1 })
        .then(() => {})
        .catch((err: any) => {
          openNotification({
            type: "error",
            message: err?.message,
            title: "Get Categories Failed",
          });
        });
    }
  }, [
    getCategories,
    categories.hasFetch,
    openNotification,
    getCategoryCoursesCount,
  ]);

  const CoursesChartData = makeChartResponse(
    categoryCoursesCount.data,
    "Courses Data",
    "title",
    "count",
    ["#FF5733", "#33FF57", "#3366FF", "#FF33A1", "#FFD700"]
  );

  const items = [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "Courses" },
  ];

  return (
    <Box minHeight={`calc(100vh - ${headerHeight})`} m={-2} p={3}>
    <DashPageHeader
      title="Videos"
      breadcrumb={items}
    />
      <Grid gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Card p={3} boxShadow={CardBoxShadow}>
          <BarChart
            data={CoursesChartData?.data}
            options={CoursesChartData?.options}
            loading={categoryCoursesCount.loading}
          />{" "}
        </Card>
        <Card p={3} boxShadow={CardBoxShadow}>
          <div>
            <Button
              onClick={() =>
                setFormModel({ open: true, type: "add", data: null })
              }
            >
              Add New
            </Button>
          </div>
        </Card>
      </Grid>
      <Box flex={1} mt={5} boxShadow={CardBoxShadow} rounded={8} my={4}>
        <CategoryTable data={categories.data} setFormModel={setFormModel} />
      </Box>
      <CustomDrawer
        open={formModel.open}
        close={() => {
          setFormModel({ open: false, type: "add", data: null });
        }}
        title="Add New Data"
      >
        <FormComponent formData={formModel} />
      </CustomDrawer>
    </Box>
  );
});

export default NotesIndex;
