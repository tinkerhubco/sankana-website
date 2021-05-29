import { NextApiHandler } from 'next';

import { connect } from '../../lib/mongoose-connect';
import { EventsModel } from '../../models/Events';

export const get: NextApiHandler = async (req, res) => {
  await connect();

  const event = await EventsModel.find();

  res.status(200).send(event);
};
