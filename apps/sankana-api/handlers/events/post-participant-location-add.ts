import { NextApiHandler } from 'next';

import * as Yup from 'yup';

import { Events } from '../../constants/events';
import { connect } from '../../lib/mongoose-connect';
import { pusher } from '../../lib/pusher';

import { EventsModel } from '../../models/Events';

const validationSchema = Yup.object({
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
});

export const postParticipantLocationAdd: NextApiHandler = async (req, res) => {
  const data = validationSchema.validateSync(req.body);
  const { code, participantId } = req.query;

  await connect();

  const event = await EventsModel.findOneAndUpdate(
    {
      code,
      /**
       * This is a new challenge on this API. Originally, to update a participant's location
       * is through participant id. However, there has been a new change whereas we
       * should use user's UUID (participant.user.uuid) as the determinator.
       *
       * This is a note on why we use user's uuid
       */
      'participants.user.uuid': participantId,
    },
    {
      $push: {
        'participants.$.locations': data,
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
