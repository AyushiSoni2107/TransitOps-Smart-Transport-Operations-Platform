import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    license: { type: String, required: true, unique: true, trim: true },
    licenseExpiry: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['On Duty', 'Off Duty', 'On Trip', 'Suspended'],
      default: 'Off Duty'
    },
    safetyScore: { type: Number, default: 80, min: 0, max: 100 },
    assignedVehicle: { type: String, trim: true },
    totalTrips: { type: Number, default: 0, min: 0 },
    avatar: { type: String, trim: true }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) },
    toObject: { transform: (_doc, ret) => ({ ...ret, _id: undefined }) }
  }
);

driverSchema.pre('validate', function setAvatar(next) {
  if (!this.avatar && this.name) {
    this.avatar = this.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
  next();
});

export default mongoose.model('Driver', driverSchema);
