import { Grid, Box, GridItem } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import store from "../../../../store/store";
import VideoCategoryCard from "../../../../config/component/Card/CategoryCard/VideoCategoryCard";
import SkeletanCategoryCard from "../../../../config/component/Card/CategoryCard/SkeletanCategoryCard";

const VideoGridLayout = observer(({ handleClick }: any) => {
  const {
    VideoStore: { categories },
  } = store;

  return (
    <Box p={4} pt={2}>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={6}
      >
        {categories.data.map((item: any, index: number) => (
          <VideoCategoryCard
            link={item?.description}
            item={item}
            key={index}
            handleClick={handleClick}
          />
        ))}
      </Grid>
      {categories.loading && (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2,1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
        >
          {[1, 2, 3, 4].map((item: number) => {
            return (
              <GridItem key={item}>
                <SkeletanCategoryCard />
              </GridItem>
            );
          })}
        </Grid>
      )}
    </Box>
  );
});

export default VideoGridLayout;
