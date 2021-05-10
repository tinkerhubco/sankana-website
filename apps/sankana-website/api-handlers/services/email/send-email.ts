import * as sendGrid from '@sendgrid/mail';
// https://github.com/sendgrid/sendgrid-nodejs/issues/903

import { ENV_SEND_GRID_API_KEY } from '../../../constants/envs';
import { SUBSCRIBED_TEMPLATE_ID } from '../../../constants/email-templates';

export type SendEmailArgs = Omit<sendGrid.MailDataRequired, 'to' | 'from' | 'subject'> & {
  to?: string | string[];
};
export const sendEmail = ({
  to,
  ...rest
}: SendEmailArgs) => {
  sendGrid.setApiKey(ENV_SEND_GRID_API_KEY);

  const mailData: sendGrid.MailDataRequired = {
    to,
    from: 'johnmichaelubas.santos@gmail.com', // TODO - remove later
    ...rest,
    templateId: SUBSCRIBED_TEMPLATE_ID
  };

  if (Array.isArray(to)) {
    const mails = to.map((toEmail) => ({
      ...mailData,
      to: toEmail,
    }));
    return sendGrid.send(mails);
  }

  return sendGrid.send(mailData);
};
