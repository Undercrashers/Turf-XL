export default function AdminDashboardPage() {
  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-on-surface tracking-tight">
            Admin Overview
          </h2>
          <p className="font-body text-secondary mt-2">
            Metrics and operational controls for platform admins.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-12 text-center text-on-surface-variant border border-outline-variant/15">
        Admin analytics are not yet wired to the backend. Stats will appear here once the admin endpoints are live.
      </div>
    </div>
  );
}
