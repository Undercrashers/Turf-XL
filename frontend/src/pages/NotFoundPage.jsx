import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2 text-slate-600">Page not found</p>
      <Link to="/" className="mt-6 text-primary underline">
        Go home
      </Link>
    </section>
  );
}
