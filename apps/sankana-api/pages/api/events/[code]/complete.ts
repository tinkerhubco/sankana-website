import { postComplete } from '../../../../handlers/events/post-complete';

import { apiRouteHandler } from '../../../../utils/api-route-handler';

const route = {
  post: postComplete,
};
const handler = apiRouteHandler(route);

export default handler;
