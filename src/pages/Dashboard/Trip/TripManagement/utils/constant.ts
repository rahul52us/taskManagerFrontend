import { TripFormValues } from "./interface";
export const tripTypes = [
  { label: "Individual", value: "individual" },
  { label: "Group", value: "group" },
];

export const categoryTypes = [
  { label: "Meal", value: "meal" },
  { label: "Clothes", value: "cloth" },
  { label: "Game", value: "game" },
  { label: "template visit", value: "templateVisit" },
];

export const travelModes = [
  { label: "flight", value: "flight" },
  { label: "train", value: "train" },
  { label: "bus", value: "bus" },
  { label: "bussiness", value: "bussiness" },
];

export const participants = [
  { label: "Rahul52us@gamil.com", value: "653c3ee413257078ac0d6a97" },
  { label: "sanjana52us@gamil.com", value: "653c3ee413257078ac0d6a96" },
];

export const initialValues: TripFormValues = {
  title: "",
  description: "",
  thumbnail: "",
  country: "IN",
  type: { label: tripTypes[0].label, value: tripTypes[0].value },
  travelDetails: [
    {
      fromState: "",
      toState: "",
      fromCity: "",
      toCity: "",
      startDate: new Date(),
      endDate: new Date(),
      travelMode: { label: travelModes[1].label, value: travelModes[1].value },
      travelCost: undefined,
      isCab: "false",
      cabCost: undefined,
      isAccommodation: "false",
      locality: "",
      durationOfStay: undefined,
      accommodationCost: undefined,
    },
  ],
  additionalExpenses: [
    {
      type: { label: categoryTypes[0].label, value: categoryTypes[0].value },
      amount: "",
    },
  ],
  participants: [{ label: "", value: "" }],
};

export const getInitialValues = (data : any) => {
  return {
    title: data?.title || "",
    description: data?.description || "",
    thumbnail: "",
    country: data.country || "IN",
    type: { label: tripTypes[0].label, value: tripTypes[0].value },
    travelDetails: [
      {
        fromState: "",
        toState: "",
        fromCity: "",
        toCity: "",
        startDate: new Date(),
        endDate: new Date(),
        travelMode: {
          label: travelModes[1].label,
          value: travelModes[1].value,
        },
        travelCost: undefined,
        isCab: "false",
        cabCost: undefined,
        isAccommodation: "false",
        locality: "",
        durationOfStay: undefined,
        accommodationCost: undefined,
      },
    ],
    additionalExpenses: [
      {
        type: { label: categoryTypes[0].label, value: categoryTypes[0].value },
        amount: "",
      },
    ],
    participants: [{ label: "", value: "" }],
  };
};
