import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    plate: { type: String, required: true, unique: true, trim: true, uppercase: true },
    model: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1980 },
    capacity: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['Available', 'In Trip', 'Maintenance'],
      default: 'Available'
    },
    driver: { type: String, trim: true },
    mileage: { type: Number, default: 0, min: 0 },
    fuelLevel: { type: Number, default: 100, min: 0, max: 100 },
    lastService: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) },
    toObject: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) }
  }
);

export default mongoose.model('Vehicle', vehicleSchema);
