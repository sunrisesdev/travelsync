import { getLastStations } from '@/traewelling-sdk/stations';
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
          {stations?.map((station) => <li key={station.id}>{station.name}</li>)}
        </ul>
      )}
    </div>
  );
}
