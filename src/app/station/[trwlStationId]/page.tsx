import { getDeparturesFromStation } from '@/traewelling-sdk/trips';
import { compressToEncodedURIComponent } from 'lz-string';
import Link from 'next/link';

export default async function StationPage({
  params: { trwlStationId },
}: {
  params: { trwlStationId: string };
}) {
  const response = await getDeparturesFromStation(trwlStationId);

  if (!response) {
    return null;
  }

  return (
    <main>
      {response.trips.map((trip) => {
        const searchParams = new URLSearchParams();
        searchParams.set(
          'at',
          trip.departure?.planned ?? trip.departure?.actual ?? ''
        );
        searchParams.set('from', trip.departureStation?.ibnr?.toString() ?? '');
        searchParams.set('line', trip.line.name);
        searchParams.set('operator', trip.line.operator.id);

        const tsTripId = compressToEncodedURIComponent(trip.hafasId!);

        return (
          <Link
            href={`/trip/${tsTripId}?${searchParams.toString()}`}
            key={trip.hafasId}
          >
            <div>{trip.designation}</div>
          </Link>
        );
      })}
    </main>
  );
}
