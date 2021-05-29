import { postParticipantLocationAdd } from '../../../../../../handlers/events/post-participant-location-add';

import { apiRouteHandler } from '../../../../../../utils/api-route-handler';

const route = {
  post: postParticipantLocationAdd,
};
const handler = apiRouteHandler(route);

export default handler;
