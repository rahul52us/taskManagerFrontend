import DashPageHeader from "../../../../config/component/common/DashPageHeader/DashPageHeader";
import { tripBreadCrumb } from "../../utils/breadcrumb.constant";
import { observer } from "mobx-react-lite";
import TripChartContainer from "./component/TripChartContainer/TripChartContainer";
import TripLayout from "./layout/TripLayout";
import { useState } from "react";
import AddTripForm from "./component/forms/AddTripForm";

const TripManagement = observer(() => {
  const [tripFormData, setTripFormData] = useState({open : false, type : 'add'})
  return (
    <div>
      <DashPageHeader breadcrumb={tripBreadCrumb} />
      <TripChartContainer addData={() => setTripFormData({ open : true, type : 'add' })}/>
      <TripLayout />
      <AddTripForm tripFormData={tripFormData} setTripFormData={setTripFormData} />
    </div>
  );
});

export default TripManagement;