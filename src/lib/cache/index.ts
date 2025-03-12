import 'server-only';

import { env } from '@/lib/env';
import { Redis } from '@upstash/redis';

export const client = new Redis({
  url: env.UPSTASH_REDIS_REST_URL!,
  token: env.UPSTASH_REDIS_REST_TOKEN!,
});
