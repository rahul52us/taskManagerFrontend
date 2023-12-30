import { observer } from "mobx-react-lite";
import TripCard from "../component/TripCard";
import { Grid } from "@chakra-ui/react";
const TripLayout = observer(() => {
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
        {[
        {
            thumbnail:
            "https://res.cloudinary.com/dsckn1jjj/image/upload/v1700761827/taskManager/spooky-tree-against-big-moon_1048-2912.avif",
            title: "new Trip",
            description:
            "here is an description for the users and it is good to see you",
        },
        {
            thumbnail:
            "https://res.cloudinary.com/dsckn1jjj/image/upload/v1700761827/taskManager/spooky-tree-against-big-moon_1048-2912.avif",
            title: "new Trip",
            description:
            "here is an description for the users and it is good to see you",
        },
        {
            thumbnail:
            "https://res.cloudinary.com/dsckn1jjj/image/upload/v1700761827/taskManager/spooky-tree-against-big-moon_1048-2912.avif",
            title: "new Trip",
            description:
            "here is an description for the users and it is good to see you",
        },
        {
            title: "new Trip",
            description:
            "here is an description for the users and it is good to see you",
        },
        {
            title: "new Trip",
            description:
            "here is an description for the users and it is good to see you",
        },
        {
            thumbnail:
            "https://res.cloudinary.com/dsckn1jjj/image/upload/v1700761827/taskManager/spooky-tree-against-big-moon_1048-2912.avif",
            title: "new Trip",
            description:
            "here is an description for the users and it is good to see you",
        },
        {
            title: "new Trip",
            description:
            "here is an description for the users and it is good to see you",
        },
        {
            thumbnail:
            "https://res.cloudinary.com/dsckn1jjj/image/upload/v1700761827/taskManager/spooky-tree-against-big-moon_1048-2912.avif",
            title: "new Trip",
            description:
            "here is an description for the users and it is good to see you",
        },
        {
            thumbnail:
            "https://res.cloudinary.com/dsckn1jjj/image/upload/v1700761827/taskManager/spooky-tree-against-big-moon_1048-2912.avif",
            title: "new Trip",
            description:
            "here is an description for the users and it is good to see you",
        },
        ].map((item: any, index: number) => {
        return <TripCard key={index} item={item} />;
        })}
    </Grid>
    </div>
);
});

export default TripLayout;