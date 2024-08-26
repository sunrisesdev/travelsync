import { getTripsFromStation } from '@/traewelling-sdk/trips';

export default async function StationPage({
  params: { trwlStationId },
}: {
  params: { trwlStationId: string };
}) {
  const response = await getTripsFromStation(trwlStationId);

  if (!response) {
    return null;
  }

  return (
    <main>
      {response.trips.map((trip) => (
        <div key={trip.tripId}>{trip.direction}</div>
      ))}
    </main>
  );
}
