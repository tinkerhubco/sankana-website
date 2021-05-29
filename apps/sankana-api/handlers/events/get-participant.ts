import { NextApiHandler } from 'next';

import { EventsModel } from '../../models/Events';

export const getParticipant: NextApiHandler = async (req, res) => {
  const { code, participantId } = req.query;

  const projections = {
    'participants.$': 1,
  };

  const event = await EventsModel.findOne(
    {
      code,
      'participants._id': participantId,
    },
    projections
  );

  if (!event || !event.participants.length) {
    res.status(400).send('No participant found');
    return;
  }
  res.status(200).send(event.participants[0]);
};
