import { getTrip } from '@/traewelling-sdk/trips';

export default async function StationPage({
  params: { hafasTripId },
  searchParams: { from, line },
}: {
  params: { hafasTripId: string };
  searchParams: { from: string; line: string };
}) {
  const trip = await getTrip(
    decodeURIComponent(hafasTripId),
    decodeURIComponent(line),
    from
  );

  if (!trip) {
    return null;
  }

  return (
    <main>
      <ul>
        {trip.stopovers.map((stop) => (
          <li key={stop.id}>{stop.name}</li>
        ))}
      </ul>
    </main>
  );
}
