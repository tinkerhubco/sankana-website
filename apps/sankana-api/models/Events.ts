import mongoose from 'mongoose';

import { LocationsSchema } from './Locations';
import { UsersSchema } from './Users';

const schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  createdBy: UsersSchema,
  destination: LocationsSchema,
  status: {
    type: Number,
    default: 0,
  },
  participants: [
    {
      user: UsersSchema,
      locations: [LocationsSchema],
    },
  ],
});

export const EventsModel =
  mongoose.models.Events || mongoose.model('Events', schema);
