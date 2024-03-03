import DashboardBanner from "./component/DashboardBanner";
import DashWidgetCard from "./component/DashWidgetCard";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import DeleteModel from "../../config/component/common/DeleteModel";
import { deleteCategoryFunction } from "./quiz/component/Forms/utils/function";
import DashChartContainer from "./component/DashChartContainer";
import DashPageHeader from "../../config/component/common/DashPageHeader/DashPageHeader";
import { headerHeight } from "../../config/constant/variable";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { dashBreadCrumb } from "./utils/breadcrumb.constant";
import DashboardRight from "./component/DashboardRight";
// import MyCoursesTable from "./component/MyCoursesTable";
// import SkeletanCategoryCard from "../../config/component/Card/CategoryCard/SkeletanCategoryCard";
import ProfileCard from "./component/ProfileCard";
import LandingPage from "./component/LandingPage";

const DashboardIndex = observer(() => {
  const {
    quiz: { setDeleteCategoryModal },
  } = store;

  return (
    <>
      <Box
        minHeight={`calc(100vh - ${headerHeight})`}
        m={-2}
        p={3}
      >
        <DashPageHeader title="Dashboard" breadcrumb={dashBreadCrumb} />
        <Grid templateColumns={{ base: "1fr", xl: "3.5fr 1fr" }} columnGap={3}>
          <GridItem>
            <DashboardBanner />
            <DashWidgetCard />
            {/* <SkeletanCategoryCard/> */}

            <DashChartContainer />
          </GridItem>
          <GridItem>
            <DashboardRight />
          </GridItem>
          {/* <MyCoursesTable /> */}
        </Grid>
        <DeleteModel
          id={store.quiz.openDeleteCategoryModal?.data?._id}
          open={store.quiz.openDeleteCategoryModal?.open}
          close={setDeleteCategoryModal}
          title={"Delete Category"}
          content={`Are you sure , you want to delete ${store.quiz.openDeleteCategoryModal?.data?.title} category`}
          submit={deleteCategoryFunction}
        />
        <ProfileCard title="title" />
      </Box>
      <LandingPage />
    </>
  );
});

export default DashboardIndex;
