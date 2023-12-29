import { observer } from "mobx-react-lite";
import TripForm from "./TripForm";
import CustomDrawer from "../../../../../../config/component/Drawer/CustomDrawer";
import { useState } from "react";
import store from "../../../../../../store/store";
import moment from "moment";
import { readFileAsBase64 } from "../../../../../../config/constant/function";

const AddTripForm = observer(({ tripFormData, setTripFormData }: any) => {
  const {
    tripStore: { createTrip },
    auth: { openNotification },
  } = store;
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  const [thumbnail, setThumbnail] = useState<any>([]);

  const submitForm = async (values: any, resetForm: any) => {
    setLoading(true);
    if (thumbnail.length) {
      const buffer = await readFileAsBase64(thumbnail[0]);
      const fileData = {
        buffer: buffer,
        filename: thumbnail[0].name,
        type: thumbnail[0].type,
      };
      values.thumbnail = fileData;
    }
    createTrip({
      ...values,
      startDate: moment(values.startDate).format("YYYY-MM-DD"),
      endDate: moment(values.startDate).format("YYYY-MM-DD"),
      type: values.type?.value,
    })
      .then(() => {
        openNotification({
          title: "Created Successfully",
          message: "Trip has been created successfully",
        });
        resetForm();
        setTripFormData({ open: false, type: "add" });
      })
      .catch((err) => {
        openNotification({
          title: "Create Failed",
          message: err?.message,
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };


  interface TravelDetails {
    country?: string;
    state?: string;
    fromCity?: string;
    toCity?: string;
    startDate?: Date;
    endDate?: Date;
    travelMode?: string;
    amount?: string;
    isCab?: string;
    cabFair?: string;
    isAccommodation?: string;
    locality?: string;
    durationOfStay?: number;
    accommodationCost?: number;
  }

  interface AdditionalExpense {
    type: string;
    amount: string;
  }

  interface TripFormValues {
    title: string;
    description: string;
    thumbnail?: string;
    type: string;
    country:string;
    travelDetails: TravelDetails[];
    additionalExpenses: AdditionalExpense[];
  }

  const initialValues: TripFormValues = {
    title: "",
    description: "",
    thumbnail: "",
    country: "",
    type: "individual",
    travelDetails: [
      {
        state: "",
        fromCity: "",
        toCity: "",
        startDate: new Date(),
        endDate: new Date(),
        travelMode: "",
        amount: "",
        isCab: "false",
        cabFair: "",
        isAccommodation: "false",
        locality: "",
        durationOfStay: 0,
        accommodationCost: 0,
      },
    ],
    additionalExpenses: [
      {
        type: "",
        amount: "",
      },
    ],
  };

  return (
    <CustomDrawer
      title={`Create Trip`}
      open={tripFormData.open}
      close={() => {
        setTripFormData({ open: false, data: null, type: "add" });
      }}
      props={{minWidth : '85vw'}}
    >
      <TripForm
        loading={loading}
        setLoading={setLoading}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        initialValues={initialValues}
        submitForm={submitForm}
        showError={showError}
        onSubmit={submitForm}
        setShowError={setShowError}
        open={tripFormData.open}
        onClose={() =>
          setTripFormData({ open: false, data: null, type: "add" })
        }
      />
    </CustomDrawer>
  );
});

export default AddTripForm;
