import { Schema, model } from 'mongoose';

const deviceSchema = new Schema({
    name: { type: String, required: true }, 
    status: { type: String, enum: ['on', 'off'], default: 'off' },
    hourlyUsage: [ 
      {
        timestamp: { type: Date, required: true },
        powerUsed: { type: Number, required: true } 
      }
    ],
    room: { type: Schema.Types.ObjectId, ref: 'Room' } 
});

export default model('Device', deviceSchema);
