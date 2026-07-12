import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ['warning', 'error', 'info', 'success'], required: true },
    message: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    vehicle: { type: String, trim: true },
    read: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) },
    toObject: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) }
  }
);

export default mongoose.model('Alert', alertSchema);
