import DashboardBanner from "./component/DashboardBanner";
import DashWidgetCard from "./component/DashWidgetCard";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import DeleteModel from "../../config/component/common/DeleteModel";
import { deleteCategoryFunction } from "./quiz/component/Forms/utils/function";
import DashChartContainer from "./component/DashChartContainer";
import DashPageHeader from "../../config/component/common/DashPageHeader/DashPageHeader";
import { headerHeight } from "../../config/constant/variable";
import { Box } from "@chakra-ui/react";

const DashboardIndex = observer(() => {
  const {
    quiz: { setDeleteCategoryModal },
  } = store;

  const items = [{ label: "Home", link: "/" }, { label: "Dashboard" }];

  return (
    <Box minHeight={`calc(100vh - ${headerHeight})`} m={-2} p={3}>
      <DashPageHeader title="Dashboard" breadcrumb={items} />
      <DashboardBanner />
      <DashWidgetCard />
      <DashChartContainer />
      <DeleteModel
        id={store.quiz.openDeleteCategoryModal?.data?._id}
        open={store.quiz.openDeleteCategoryModal?.open}
        close={setDeleteCategoryModal}
        title={"Delete Category"}
        content={`Are you sure , you want to delete ${store.quiz.openDeleteCategoryModal?.data?.title} category`}
        submit={deleteCategoryFunction}
      />
    </Box>
  );
});

export default DashboardIndex;
