import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
});

export const UsersModel =
  mongoose.models.Events || mongoose.model('Users', schema);
export const UsersSchema = schema;

