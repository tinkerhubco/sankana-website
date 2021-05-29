import { NextApiHandler } from 'next';

export type ApiRouteHandlerRoutes = Record<string, NextApiHandler>;
export const apiRouteHandler = (
  routes: ApiRouteHandlerRoutes
): NextApiHandler => (req, res) => {
  const routeHandler = routes[req.method.toLowerCase()];

  if (!routeHandler) {
    return res.send('400');
  }

  return routeHandler(req, res);
};
