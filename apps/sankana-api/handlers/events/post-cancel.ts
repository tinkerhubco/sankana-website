import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import * as Yup from 'yup';
import { Events } from '../../constants/events';
import { Status } from '../../constants/status';

import { connect } from '../../lib/mongoose-connect';
import { pusher } from '../../lib/pusher';

import { EventsModel } from '../../models/Events';
import { tryCatch, tryCatchSync } from '../../utils/try-catch';

const validationSchema = Yup.object({
  userId: Yup.string().required(),
});

/**
 * A simple middleware to prevent from joining when the event is already
 * cancelled or completed
 */
const runMiddleware = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  await connect();

  const event = await EventsModel.findOne({
    code,
    status: {
      $in: [Status.Cancelled, Status.Completed],
    },
  });

  if (event?.status === Status.Cancelled) {
    throw new Error(`Event ${code} is already cancelled`);
  }

  if (event?.status === Status.Completed) {
    throw new Error(`Event ${code} is already completed`);
  }

  return event;
};

export const postCancel: NextApiHandler = async (req, res) => {
  const [, middlewareErr] = await tryCatch(() => runMiddleware(req, res));

  if (middlewareErr) {
    return res.status(400).send(middlewareErr.message);
  }

  const { code } = req.query;
  const [data, err] = tryCatchSync(() =>
    validationSchema.validateSync(req.body)
  );

  if (err) {
    return res.status(400).send(err);
  }

  await connect();

  const event = await EventsModel.findOneAndUpdate(
    {
      code,
      'createdBy.uuid': data.userId,
      status: {
        // Do not update if the status is already completed or cancelled
        $in: [Status.Pending, Status.Started, Status.InProgress],
      },
    },
    {
      status: Status.Cancelled,
    },
    {
      new: true,
    }
  );

  if (!event) {
    return res.status(400).send(`No event code found for ${code}`);
  }

  // Broadcast data `event` to all the subscribers of `code`

  await pusher.trigger(code, Events.EventCancelled, event);

  res.status(200).send(event);
};
