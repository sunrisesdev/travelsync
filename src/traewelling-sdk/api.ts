import { auth } from '@/auth';
import ky from 'ky';

export async function getTrwlAPI() {
  const session = await auth();

  return ky.create({
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    prefixUrl: 'https://traewelling.de/api/v1',
  });
}
