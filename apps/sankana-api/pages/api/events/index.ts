import { get } from '../../../handlers/events/get';
import { post } from '../../../handlers/events/post';

import { apiRouteHandler } from '../../../utils/api-route-handler';

const route = {
  get,
  post,
};
const handler = apiRouteHandler(route);

export default handler;
