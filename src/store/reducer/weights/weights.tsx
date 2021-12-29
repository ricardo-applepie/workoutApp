import { Action } from "../../actionTypes/actionTypes";
import { WeightMeasurements } from "./weightTypes";

var _ = require("lodash");

const INITIALSTATE: WeightMeasurements = {
  // dummy data to be displayed , before actual data is added by  the user .
  measurements: [
    {
      id: 1,
      weight: "50kg",
      date: "Mon Aug 18 2014 21:11:54 GMT+0200 (Central European Summer Time)",
    },
    {
      id: 2,
      weight: "80kg",
      date: "Tues Sep 30 2014 21:11:54 GMT+0200 (Central European Summer Time)",
    },
  ],
  updating: false,
};

function MeasurementReducer(
  state: WeightMeasurements = INITIALSTATE,
  action: Action
) {
  switch (action.type) {
    // adding a measurement by dispatching this action .
    case "addMessurement":
      let addedMeasurement = action.payload;
      const newMeasurements = [...state.measurements, addedMeasurement];
      return Object.assign({}, state, {
        updating: true,
        measurements: newMeasurements,
      });
      break;
    // deleting a measurement by dispatching this action .
    case "deleteMeasurement":
      console.log(action.payload);
      const deletedMeasurements = state.measurements.filter((measurement) => {
        return (
          measurement.weight !== action.payload.weight &&
          measurement.date !== action.payload.date
        );
      });

      console.log(deletedMeasurements);

      return Object.assign({}, state, {
        updating: true,
        measurements: deletedMeasurements,
      });
      break;
    // updating a measurement by dispatching this action .

    case "updateMeasurement":
      const oldMeasurement = action.payload.oldMeasurement;
      const newMeasurement = action.payload.newMeasurement;

      const updatedMeasurement = state.measurements.filter(
        (measurement: any) => {
          return (
            measurement.weight !== action.payload.oldMeasurement.weight &&
            measurement.date !== action.payload.oldMeasurement.date
          );
        }
      );

      return Object.assign(
        {},
        state,
        { updating: true },
        { measurements: [...updatedMeasurement, newMeasurement] }
      );

      break;
    //  returning  default state
    case "MessurementSuccess":
      return Object.assign({}, state, { updating: false });
      break;
    default:
      return state;
  }
}
export default MeasurementReducer;
