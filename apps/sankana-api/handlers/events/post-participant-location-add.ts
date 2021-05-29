import { NextApiHandler } from 'next';

import * as Yup from 'yup';

import { Events } from '../../constants/events';
import { pusher } from '../../lib/pusher';

import { EventsModel } from '../../models/Events';

const validationSchema = Yup.object({
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
});

export const postParticipantLocationAdd: NextApiHandler = async (req, res) => {
  const data = validationSchema.validateSync(req.body);
  const { code, participantId } = req.query;

  const event = await EventsModel.findOneAndUpdate(
    {
      code,
      'participants._id': participantId,
    },
    {
      $push: {
        'participants.0.locations': data,
      },
    },
    {
      new: true,
    }
  );

  // Broadcast data `event` to all the subscribers of `code`
  await pusher.trigger(code, Events.EventParticipantJoin, event);

  res.status(200).send(event);
};
