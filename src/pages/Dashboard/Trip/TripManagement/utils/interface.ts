export interface TravelDetails {
    country?: string;
    fromState?: string;
    toState?:string;
    fromCity?: string;
    toCity?: string;
    startDate?: Date;
    endDate?: Date;
    travelMode?: {label : string, value : string};
    travelCost?: string;
    isCab?: string;
    cabCost?: string;
    isAccommodation?: string;
    locality?: string;
    durationOfStay?: number;
    accommodationCost?: number;
  }

export interface tripTypeI {
  label : string, value : string
}

export interface AdditionalExpense {
    type: {label : string, value : string};
    amount: string;
}

export interface Participants {
  label : string, value : string;
}

export interface TripFormValues {
    title: string;
    description: string;
    thumbnail?: any;
    type: tripTypeI;
    country:any;
    participants:Participants[];
    travelDetails: TravelDetails[];
    additionalExpenses: AdditionalExpense[];
}

export interface TripFormI {
  initialValues : TripFormValues;
  showError:boolean;
  setShowError:any;
  loading : boolean,
  onClose : any,
  onSubmit : any,
  thumbnail : any,
  setThumbnail : any,
  isEdit? : boolean,
  isFileDeleted?:number,
  setIsFileDeleted?:any
}