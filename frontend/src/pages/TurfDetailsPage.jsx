import { useParams, Link } from 'react-router-dom';

export default function TurfDetailsPage() {
  const { turfId } = useParams();
  return (
    <section>
      <h1 className="text-2xl font-bold">Turf #{turfId}</h1>
      <p className="text-slate-600">Images, amenities, pricing and reviews go here.</p>
      <Link to={`/turfs/${turfId}/book`} className="mt-4 inline-block text-primary underline">
        Book a slot →
      </Link>
    </section>
  );
}
