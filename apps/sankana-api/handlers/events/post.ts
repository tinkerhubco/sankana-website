import { NextApiHandler } from 'next';

import crypto from 'crypto';

import * as Yup from 'yup';

import { connect } from '../../lib/mongoose-connect';
import { EventsModel } from '../../models/Events';

const validationSchema = Yup.object({
  destination: Yup.object({
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
  }),
  createdBy: Yup.object({
    name: Yup.string().required(),
  }),
});

export const post: NextApiHandler = async (req, res) => {
  const data = validationSchema.validateSync(req.body);

  const eventCode = crypto
    .randomBytes(6)
    .toString('hex')
    .slice(0, 6)
    .toUpperCase();

  await connect();

  const event = await EventsModel.create({
    ...data,
    code: eventCode,
    participants: [
      {
        user: data.createdBy,
        locations: [
          // Use as the initial location
          data.destination,
        ],
      },
    ],
  });

  res.status(200).send(event);
};
