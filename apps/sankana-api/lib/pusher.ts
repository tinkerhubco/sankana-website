import Pusher from 'pusher';

import {
  ENV_PUSHER_API_KEY,
  ENV_PUSHER_APP_ID,
  ENV_PUSHER_CLUSTER,
  ENV_PUSHER_SECRET_KEY,
} from '../constants/envs';

export const pusher = new Pusher({
  appId: ENV_PUSHER_APP_ID,
  key: ENV_PUSHER_API_KEY,
  secret: ENV_PUSHER_SECRET_KEY,
  cluster: ENV_PUSHER_CLUSTER,
});
