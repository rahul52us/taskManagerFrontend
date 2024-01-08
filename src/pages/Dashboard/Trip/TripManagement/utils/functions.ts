import { YYYYMMDD_FORMAT, formatDate } from "../../../../../config/constant/dateUtils";
import { readFileAsBase64 } from "../../../../../config/constant/function";
import { tripTypes } from "./constant";
import {
  AdditionalExpense,
  Participants,
  TravelDetails,
  TripFormValues,
} from "./interface";


export const generateFormError = (errors: any, parent : any, type: string, index: number) => {
  console.log(errors['travelDetails'])
  if(errors?.[parent]?.[index]?.[type]){
    return errors?.[parent]?.[index]?.[type];
  }
  else{
    return undefined
  }
}

export const generateTripResponse = async (data: TripFormValues) => {
  if (Array.isArray(data.thumbnail) && data.thumbnail.length) {
    const buffer = await readFileAsBase64(data.thumbnail[0]);
    const fileData = {
      buffer: buffer,
      filename: data.thumbnail[0].name,
      type: data.thumbnail[0].type,
    };
    data.thumbnail = fileData;
  }
  else{
    data.thumbnail = ""
  }
  const updatedTravelDetails = data.travelDetails.map(
    (item: TravelDetails) => ({
      ...item,
      travelMode: item?.travelMode?.value || "",
      startDate: item?.startDate ? formatDate(item?.startDate,YYYYMMDD_FORMAT) : "",
      endDate: item?.endDate ? formatDate(item?.endDate,YYYYMMDD_FORMAT) : "",
      isAccommodation:Boolean(item.isAccommodation),
      isCab:Boolean(item.isCab)
    })
  );
  const type = data.type ? data.type.value : tripTypes[0].value;
  const updatedParticipants = data.participants.map(
    (item: Participants) => item.value
  );
  const updatedAdditionalExpense = data.additionalExpenses.map(
    (item: AdditionalExpense) => ({
      ...item,
      type: item?.type?.value || "",
    })
  );
  const updatedData = {
    ...data,
    type: type,
    participants: type === tripTypes[0].value ? [] : updatedParticipants,
    travelDetails: updatedTravelDetails,
    additionalExpenses: updatedAdditionalExpense,
  };
  return updatedData;
};

