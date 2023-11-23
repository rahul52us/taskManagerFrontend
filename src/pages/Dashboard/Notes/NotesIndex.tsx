import { useState, useEffect } from "react";
import { Box, Button, Card, Grid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import BarChart from "../../../config/component/charts/BarChart";
import store from "../../../store/store";
import CategoryTable from "./element/CategoryTable";
import CustomDrawer from "../../../config/component/Drawer/CustomDrawer";
import CategoryFormComponent from "./element/CategoryFormComponent";
import { CardBoxShadow, headerHeight } from "../../../config/constant/variable";
import { makeChartResponse } from "../component/utils/common";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { coursesBreadCrumb } from "../utils/breadcrumb.constant";
import CourseList from "./element/CourseList";

const NotesIndex = observer(() => {
  const [courseListModel, setCourseListModel] = useState({
    open: false,
    type: "add",
    category: null,
    data: null,
  });

  const [CategoryformModel, setCategoryFormModel] = useState({
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

  return (
    <Box minHeight={`calc(100vh - ${headerHeight})`} m={-2} p={3}>
      <DashPageHeader title="Videos" breadcrumb={coursesBreadCrumb} />
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
                setCategoryFormModel({ open: true, type: "add", data: null })
              }
            >
              Add New
            </Button>
          </div>
        </Card>
      </Grid>
      <Box flex={1} mt={5} boxShadow={CardBoxShadow} rounded={8} my={4}>
        <CategoryTable
          data={categories.data}
          setFormModel={setCategoryFormModel}
          totalPages={categories.totalPages}
          currentPage={categories.currentPage}
          handleCourseModel={(item: any) => {
            setCourseListModel({
              type: "add",
              open: true,
              category: item,
              data: null,
            });
          }}
        />
      </Box>
      <CustomDrawer
        open={CategoryformModel.open}
        close={() => {
          setCategoryFormModel({ open: false, type: "add", data: null });
        }}
        title="Add New Data"
      >
        <CategoryFormComponent formData={CategoryformModel} />
      </CustomDrawer>
      <CourseList
        category={courseListModel.category}
        open={courseListModel.open}
        close={() => {
          setCourseListModel({
            type: "add",
            data: null,
            category: null,
            open: false,
          });
        }}
      />
    </Box>
  );
});

export default NotesIndex;
