// env variables available on server only

export const ENV_SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY;
export const ENV_CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
export const ENV_CONTENTFUL_DELIVERY_API_KEY =
  process.env.CONTENTFUL_DELIVERY_API_KEY;
export const ENV_CONTENTFUL_PREEVIEW_API_KEY =
  process.env.CONTENTFUL_PREVIEW_API_KEY;
export const ENV_CONTENTFUL_PERSONAL_ACCESS_TOKEN =
  process.env.CONTENT_PERSONAL_ACCESS_TOKEN;
export const ENV_MONGODB_URI = process.env.MONGODB_URI;

export const ENV_PUSHER_APP_ID = process.env.PUSHER_APP_ID;
export const ENV_PUSHER_SECRET_KEY = process.env.PUSHER_SECRET_KEY;

// env variables available on both browser and server

export const ENV_PUSHER_API_KEY = process.env.NEXT_PUBLIC_PUSHER_API_KEY;
export const ENV_PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
export const ENV_TOMTOM_API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;
