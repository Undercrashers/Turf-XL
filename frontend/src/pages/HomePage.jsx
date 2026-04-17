import { Link } from 'react-router-dom';
import Button from '../components/common/Button.jsx';

export default function HomePage() {
  return (
    <section className="flex flex-col items-center gap-6 py-12 text-center">
      <h1 className="text-4xl font-bold">Welcome to Turf XL Baisakhi</h1>
      <p className="max-w-xl text-slate-600">
        Book your favourite turf slot in a few taps. Football, cricket and more.
      </p>
      <Link to="/login">
        <Button>Book a Slot</Button>
      </Link>
    </section>
  );
}
