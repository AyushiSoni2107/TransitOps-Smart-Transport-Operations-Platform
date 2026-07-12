import mongoose from 'mongoose';

const fuelLogSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    vehicle: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    liters: { type: Number, required: true, min: 0 },
    cost: { type: Number, required: true, min: 0 },
    station: { type: String, required: true, trim: true },
    odometer: { type: Number, min: 0 }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) },
    toObject: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) }
  }
);

export default mongoose.model('FuelLog', fuelLogSchema);
