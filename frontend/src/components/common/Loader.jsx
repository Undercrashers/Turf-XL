export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center gap-2 p-4 text-sm text-slate-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      {label}
    </div>
  );
}
