import { Polar } from '@polar-sh/sdk';
import { env } from '../env';

const client = new Polar({
  accessToken: env.POLAR_SECRET_KEY,
  server: env.NODE_ENV === 'production' ? 'production' : 'sandbox',
});

export default client;
