'use server';

import { getSession } from '@/lib/auth/server';
import payments from '@/lib/payments';

export async function getSubscriptions() {
  const session = await getSession();

  if (!session) {
    throw new Error('unauthorized');
  }

  const customer = await payments.customers.getExternal({ externalId: session.user.id });
  const subscriptions = await payments.subscriptions.list({ customerId: customer.id });

  console.log(customer);

  return subscriptions;
}
