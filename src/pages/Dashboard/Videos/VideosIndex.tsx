import { Box } from "@chakra-ui/react";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import VideoGridLayout from "./Layout/VideoGridLayout";
import { headerHeight } from "../../../config/constant/variable";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import VideoCategoryList from './component/VideosCategoryList'
import { videoBreadCrumb } from "../utils/breadcrumb.constant";

const VideosIndex = observer(() => {
  const [openVideosList, setOpenVideosList] = useState<any>({
    open: false,
    data: null,
  });

  return (
    <Box minHeight={`calc(100vh - ${headerHeight})`} m={-4} p={3}>
      <DashPageHeader
        title="Videos"
        btnTitle="CREATE"
        btnAction={() => setOpenVideosList({ open: true })}
        breadcrumb={videoBreadCrumb}
      />
      <VideoGridLayout />
      <VideoCategoryList
        videos={[]}
        title="Videos Categories"
        open={openVideosList.open}
        close={() => {
          setOpenVideosList({ open: false, data: null });
        }}
      />
    </Box>
  );
});

export default VideosIndex;
