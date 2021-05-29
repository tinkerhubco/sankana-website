import { NextApiHandler } from 'next';

import * as Yup from 'yup';
import { Events } from '../../constants/events';

import { connect } from '../../lib/mongoose-connect';
import { pusher } from '../../lib/pusher';

import { EventsModel } from '../../models/Events';

const validationSchema = Yup.object({
  name: Yup.string().required(),
  location: Yup.object({
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
  }),
});

export const postJoin: NextApiHandler = async (req, res) => {
  const { code } = req.query;
  const data = validationSchema.validateSync(req.body);

  await connect();

  // const event = await EventsModel.findOneAndUpdate(
  //   {
  //     code,
  //   },
  //   {
  //     $push: {
  //       participants: {
  //         user: {
  //           name: data.name,
  //         },
  //         locations: [
  //           data.location,
  //         ],
  //       },
  //     },
  //   },
  //   {
  //     new: true,
  //   }
  // );
  const event = await EventsModel.findOne(
    {
      code,
    },
  );

  const testEvent = {
    ...event,
    participants: [
      ...event.participants,
      {
        user: {
          name: data.name,
        },
        locations: [
          data.location
        ]
      },
    ],
  };

  // Broadcast data `event` to all the subscribers of `code`

  // await pusher.trigger(code, 'event-participant:join', event);
  await pusher.trigger(code, Events.EventParticipantJoin, testEvent);

  res.status(200).send(event);
};
