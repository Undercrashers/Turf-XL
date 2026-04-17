import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
      <Link to="/" className="mb-6 text-2xl font-bold text-primary">
        Turf XL Baisakhi
      </Link>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <Outlet />
      </div>
    </div>
  );
}
