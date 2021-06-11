import { NextApiHandler } from 'next';

import crypto from 'crypto';

import * as Yup from 'yup';

import { connect } from '../../lib/mongoose-connect';
import { EventsModel } from '../../models/Events';
import { tryCatchSync } from '../../utils/try-catch';

const validationSchema = Yup.object({
  destination: Yup.object({
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
  }),
  createdBy: Yup.object({
    name: Yup.string().required(),
    location: Yup.object({
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    }),
  }),
});

export const post: NextApiHandler = async (req, res) => {
  const [data, err] = tryCatchSync(() => validationSchema.validateSync(req.body));

  if (err) {
    return res.status(400).send(err)
  }

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
        user: {
          name: data.createdBy.name,
        },
        locations: [
          data.createdBy.location,
        ],
      },
    ],
  });

  res.status(200).send(event);
};
