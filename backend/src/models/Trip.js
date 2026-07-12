import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    driver: { type: String, required: true, trim: true },
    vehicle: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled'
    },
    date: { type: String, required: true },
    duration: { type: String, default: '-' },
    distance: { type: String, default: '-' },
    routeType: { type: String, default: 'Standard Route' }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) },
    toObject: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) }
  }
);

export default mongoose.model('Trip', tripSchema);
