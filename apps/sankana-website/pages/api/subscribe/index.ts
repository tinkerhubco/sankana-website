import {
  NextApiHandler,
} from 'next';

import { post } from '../../../api-handlers/subscribe/post';

const handler: NextApiHandler = (req, res) => {
  const routeHandler = route[req.method.toLowerCase()];

  if (!routeHandler) {
    return res.send('400');
  }

  return routeHandler(req, res);
};
const route = {
  post,
};

export default handler;
