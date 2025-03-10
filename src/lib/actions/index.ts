import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';
import { DomainError } from '../ddd/core/domain-error';
import { authMiddleware } from './middlewares/auth';
import { loggerMiddleware } from './middlewares/logger';

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof DomainError) {
      return e.message;
    }
    return 'Internal server error';
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
}).use(loggerMiddleware);

export const authActionClient = actionClient.use(authMiddleware);
