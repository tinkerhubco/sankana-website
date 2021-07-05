import { NextApiHandler } from 'next';

import * as Yup from 'yup';
import { Events } from '../../constants/events';

import { connect } from '../../lib/mongoose-connect';
import { pusher } from '../../lib/pusher';

import { EventsModel } from '../../models/Events';
import { tryCatchSync } from '../../utils/try-catch';

const validationSchema = Yup.object({
  user: Yup.object({
    name: Yup.string().required(),
    uuid: Yup.string().required(),
  }),
  location: Yup.object({
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
  }),
});

export const postJoin: NextApiHandler = async (req, res) => {
  const { code } = req.query;
  const [data, err] = tryCatchSync(() => validationSchema.validateSync(req.body));

  if (err) {
    return res.status(400).send(err);
  }

  await connect();

  const event = await EventsModel.findOneAndUpdate(
    {
      code,
    },
    {
      $push: {
        participants: {
          user: data.user,
          locations: [
            data.location,
          ],
        },
      },
    },
    {
      new: true,
    }
  );
  // const event = await EventsModel.findOne(
  //   {
  //     code,
  //   },
  // );

  if (!event) {
    return res.status(400).send(`No event code found for ${code}`);
  }

  // const testEvent = {
  //   ...event,
  //   participants: [
  //     ...event.participants,
  //     {
  //       user: {
  //         name: data.name,
  //       },
  //       locations: [
  //         data.location
  //       ]
  //     },
  //   ],
  // };

  // Broadcast data `event` to all the subscribers of `code`

  await pusher.trigger(code, Events.EventParticipantJoin, event);
  // await pusher.trigger(code, Events.EventParticipantJoin, testEvent);

  res.status(200).send(event);
};
