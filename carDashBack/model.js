import mongoose, { Schema } from "mongoose";

const datsSchema = new mongoose.Schema({
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: "CarInfo",
    required: true,
    index: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  fuelLevel: {
    type: Number,
    required: true,
  },
  engineTemp: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
  alerts: [
    {
      type: String,
      enum: ["HIGH_TEMP", "LOW_FUEL", "SPEED_ALERT"],
      default: [],
    },
  ],
});
const InfoSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true,
    index: true,
  },
  ownerName: {
    type: String,
    required: true,
    index: true,
  },
});
export const CarData = mongoose.model("CarData", datsSchema);
export const CarInfo = mongoose.model("CarInfo", InfoSchema);
