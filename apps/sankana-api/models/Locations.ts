import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

export const LocationsModel =
  mongoose.models.Locations || mongoose.model('Locations', schema);
export const LocationsSchema = schema;
