import { NextApiHandler } from 'next';

import { connect } from '../../lib/mongoose-connect';

import { EventsModel } from '../../models/Events';

export const getByCode: NextApiHandler = async (req, res) => {
  const { code } = req.query;

  await connect();

  const event = await EventsModel.findOne({
    code,
  });

  res.status(200).send(event);
};
