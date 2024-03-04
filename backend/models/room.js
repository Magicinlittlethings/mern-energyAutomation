import { Schema, model } from 'mongoose';

const roomSchema = new Schema({
  name: { type: String, required: true },
  devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }],
  dailyUsage: { type: Number, default: 0 },
  monthlyLimit: { type: Number, default: 0 },
});

export default model('Room', roomSchema);
