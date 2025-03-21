import { auth, getSession } from '@/lib/auth/server';
import payments from '@/lib/payments';
import { products } from '@/lib/payments/products';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ plan: string }> }) => {
  const session = await getSession();

  if (!session) {
    throw new Error('unauthorized');
  }

  const organization = await auth.api.getFullOrganization({
    headers: await headers(),
  });

  if (!organization) {
    throw new Error('No organization');
  }

  const { plan } = await params;
  const product = products.find((p) => p.slug === plan);

  if (!product) {
    throw new Error('No product founded');
  }

  const successUrl = new URL('/', req.nextUrl.origin);
  const checkout = await payments.checkouts.create({
    productId: product?.productId,
    successUrl: successUrl.toString(),
    customerExternalId: organization.id,
    customerName: session.user.name,
    customerEmail: session.user.email,
    metadata: {
      type: plan,
      orgId: organization.id,
    },
  });

  return NextResponse.redirect(checkout.url);
};
