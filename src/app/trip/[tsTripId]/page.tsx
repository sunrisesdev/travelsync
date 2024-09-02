import { getTrip } from '@/traewelling-sdk/trips';
import { decompressFromEncodedURIComponent } from 'lz-string';

export default async function TripPage({
  params: { tsTripId },
  searchParams: { from, line, operator },
}: {
  params: { tsTripId: string };
  searchParams: { from: string; line: string; operator: string };
}) {
  const hafasTripId = decompressFromEncodedURIComponent(
    decodeURIComponent(tsTripId)
  );

  const trip = await getTrip(hafasTripId, line, from, operator);

  if (!trip) {
    return null;
  }

  return (
    <main>
      {JSON.stringify(trip.line.appearance)}

      <ul>
        {trip.stopovers?.map((stop) => (
          <li key={stop.station.trwlId}>{stop.station.name}</li>
        ))}
      </ul>
    </main>
  );
}
