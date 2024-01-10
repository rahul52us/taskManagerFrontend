import { observer } from "mobx-react-lite";
import TripForm from "./TripForm";
import CustomDrawer from "../../../../../../config/component/Drawer/CustomDrawer";
import { useEffect, useState } from "react";
import store from "../../../../../../store/store";
import { TripFormValues } from "../../utils/interface";
import {
  generateEditInitialValues,
  generateTripResponse,
} from "../../utils/functions";

const EditTripForm = observer(({ tripFormData, setTripFormData }: any) => {
  const {
    tripStore: { updateTrip },
    auth: { openNotification },
  } = store;
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  const [thumbnail, setThumbnail] = useState<any>([]);

  useEffect(() => {
    if(tripFormData?.data?.thumbnail?.name && tripFormData?.data?.thumbnail?.url){
      setThumbnail([{...tripFormData?.data?.thumbnail,file : tripFormData?.data?.thumbnail?.url}])
    }
  },[tripFormData])

  const setInitialValues = () => {
    const dt = generateEditInitialValues(tripFormData?.data);
    return {
      ...tripFormData?.data,
      ...dt
    };
  };

  const submitForm = async (values: TripFormValues, resetForm: any) => {
    setLoading(true);
    values.thumbnail = thumbnail;
    const payload = await generateTripResponse(values);
     updateTrip(payload,tripFormData?.data?._id)
      .then(() => {
        openNotification({
          title: "Trip Updated Successfully",
          message: "Trip has been Updated successfully",
        });
        resetForm();
        setThumbnail([]);
        setTripFormData({ open: false, type: "add" });
      })
      .catch((err) => {
        openNotification({
          title: "Updation Failed",
          message: err?.message,
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log('the thumbnail is', thumbnail)
  return (
    <CustomDrawer
      title={`Edit Trip`}
      open={tripFormData.open && tripFormData.type === "edit"}
      close={() => {
        setTripFormData({ open: false, data: null, type: "add" });
      }}
      props={{ minWidth: "85vw" }}
    >
      <TripForm
        isEdit={true}
        loading={loading}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        initialValues={{...setInitialValues(),thumbnail : thumbnail}}
        onSubmit={submitForm}
        showError={showError}
        setShowError={setShowError}
        onClose={() =>
          setTripFormData({ open: false, data: null, type: "add" })
        }
      />
    </CustomDrawer>
  );
});

export default EditTripForm;
