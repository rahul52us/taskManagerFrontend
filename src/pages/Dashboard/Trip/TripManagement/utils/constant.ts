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
      travelCost: "",
      isCab: "false",
      cabCost: "",
      isAccommodation: "false",
      locality: "",
      durationOfStay: 0,
      accommodationCost: 0,
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