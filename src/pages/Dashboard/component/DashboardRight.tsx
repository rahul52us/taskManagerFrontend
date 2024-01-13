import { observer } from "mobx-react-lite";
import DashboardRecentNotification from "./DashboardRecentNotification";
import DashboardRightCard from "./DashboardRightCard";
import AddUserCard from "./AddUserCard";
import ProgressInfoCard from "./ProgressInfoCard";

const userData = [
  {
    id: 1,
    name: "John Doe",
    avatarSrc: "https://bit.ly/dan-abramov",
    access: "access",
  },
  {
    id: 2,
    name: "Kashish Systum",
    avatarSrc: "https://bit.ly/dan-abramov",
    access: "access",
  },
  {
    id: 2,
    name: "Ayush Yadavvvv",
    avatarSrc: "https://bit.ly/dan-abramov",
    access: "access",
  },
];

const DashboardRight = observer(() => {
  return (
    <div>
      <DashboardRecentNotification />
      <DashboardRightCard />
      <ProgressInfoCard
        count={9090}
        title="Due Fees"
        gradientColors={["#f54646", "#fc9e45"]}
      />
      <AddUserCard userData={userData} />
    </div>
  );
});

export default DashboardRight;
