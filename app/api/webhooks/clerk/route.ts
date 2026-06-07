import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { ROLES } from '@/lib/constants';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred – no svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', { status: 400 });
  }

  const { id, email_addresses, first_name, last_name } = evt.data;

  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    await prisma.user.upsert({
      where: { id },
      update: {
        email: email_addresses[0].email_address,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
      },
      create: {
        id,
        email: email_addresses[0].email_address,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        role: ROLES.CUSTOMER,
      },
    });
  }

  return new Response('Webhook processed', { status: 200 });
}
