import axios from "axios";
import { action, makeObservable } from "mobx";

class TripStore {
  constructor() {
    makeObservable(this, {
      createTrip: action,
    });
  }

  createTrip = async (sendData : any) => {
    try {
      const { data } = await axios.post("trip/create", sendData);
      console.log(data)
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err?.message);
    }
  }}

export default TripStore;