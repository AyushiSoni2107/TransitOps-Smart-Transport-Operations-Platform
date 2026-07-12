import mongoose from 'mongoose';

const maintenanceRecordSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    vehicle: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    date: { type: String, required: true },
    mechanic: { type: String, trim: true },
    cost: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ['Scheduled', 'Approved', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled'
    },
    notes: { type: String, trim: true }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) },
    toObject: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) }
  }
);

export default mongoose.model('MaintenanceRecord', maintenanceRecordSchema);
