import { postJoin } from '../../../../handlers/events/post-join';

import { apiRouteHandler } from '../../../../utils/api-route-handler';

const route = {
  post: postJoin,
};
const handler = apiRouteHandler(route);

export default handler;
