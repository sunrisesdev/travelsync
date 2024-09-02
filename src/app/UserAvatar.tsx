import { SignOut } from '@/app/SignOut';
import { getLastStations } from '@/traewelling-sdk/stations';
import Link from 'next/link';
import { auth } from '../auth';

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  const stations = await getLastStations();

  return (
    <div>
      <img src={session.user.image || ''} alt="User Avatar" />

      {stations?.length && (
        <ul>
          {stations?.map((station) => (
            <li key={station.trwlId}>
              <Link href={`/station/${station.trwlId}`}>{station.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <SignOut />
    </div>
  );
}
