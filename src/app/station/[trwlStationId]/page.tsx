import { getDeparturesFromStation } from '@/traewelling-sdk/trips';
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
        searchParams.set('at', trip.plannedWhen);
        searchParams.set('from', trip.station.ibnr.toString());
        searchParams.set('line', trip.line.name);

        return (
          <Link
            href={`/trip/${encodeURIComponent(trip.tripId)}?${searchParams.toString()}`}
            key={trip.tripId}
          >
            <div>{trip.direction}</div>
          </Link>
        );
      })}
    </main>
  );
}
