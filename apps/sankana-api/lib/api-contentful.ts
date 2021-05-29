import * as contentful from 'contentful-management';

import {
  ENV_CONTENTFUL_PERSONAL_ACCESS_TOKEN,
  ENV_CONTENTFUL_SPACE_ID,
} from '../constants/envs';

import { CONTENTFUL_ENVIRONMENT } from '../constants/contentful';

export const client = contentful.createClient(
  {
    accessToken: ENV_CONTENTFUL_PERSONAL_ACCESS_TOKEN,
  },
  {
    type: 'plain',
    defaults: {
      environmentId: CONTENTFUL_ENVIRONMENT,
      spaceId: ENV_CONTENTFUL_SPACE_ID,
    },
  }
);

export const Models = {
  Events: {
    add: (data) =>
      client.entry.create(
        {
          contentTypeId: 'events',
        },
        {
          fields: data,
        }
      ),
  },
};

export const toContentfulFields = (obj) => {
  return Object.entries(obj).reduce((accumulator, currentValue) => {
    const [key, value] = currentValue;

    accumulator[key] = {
      'en-US': value,
    };

    return accumulator;
  }, {});
};
