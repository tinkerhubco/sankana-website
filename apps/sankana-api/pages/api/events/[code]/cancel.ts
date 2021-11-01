import { postCancel } from '../../../../handlers/events/post-cancel';

import { apiRouteHandler } from '../../../../utils/api-route-handler';

const route = {
  post: postCancel,
};
const handler = apiRouteHandler(route);

export default handler;
