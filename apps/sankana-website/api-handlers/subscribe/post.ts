import { NextApiHandler } from 'next';

import { sendEmail } from '../services/email/send-email';

export const post: NextApiHandler = async (req, res) => {
  const {
    body: {
      email,
    }
  } = req;

  if (!email) {
    res.status(400).send('Sorry, no email found');
    return;
  }

  await sendEmail({
    to: email,
  });

  res.status(200).send('Success');
};
