import { getByCode } from '../../../../handlers/events/get-by-code';

import { apiRouteHandler } from '../../../../utils/api-route-handler';

const route = {
  get: getByCode,
};
const handler = apiRouteHandler(route);

export default handler;
