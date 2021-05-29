import { getParticipant } from '../../../../../../handlers/events/get-participant';

import { apiRouteHandler } from '../../../../../../utils/api-route-handler';

const route = {
  get: getParticipant,
};
const handler = apiRouteHandler(route);

export default handler;
