import { useParams } from 'react-router-dom';

export default function SlotBookingPage() {
  const { turfId } = useParams();
  return (
    <section>
      <h1 className="text-2xl font-bold">Book a Slot – Turf #{turfId}</h1>
      <p className="text-slate-600">Date picker, slot grid and payment confirm go here.</p>
    </section>
  );
}
