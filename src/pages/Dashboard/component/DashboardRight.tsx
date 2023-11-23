import { observer } from "mobx-react-lite";
import DashboardRecentNotification from "./DashboardRecentNotification";

const DashboardRight = observer(() => {
  return (
    <div>
       <DashboardRecentNotification />
    </div>
  );
});

export default DashboardRight;
