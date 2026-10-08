export default function UserCardSkeleton() {
    return (
      <div
        aria-hidden="true"
        className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div className="mb-5 h-5 w-3/5 rounded bg-gray-200" />
        <div className="mb-4 h-4 w-4/5 rounded bg-gray-200" />
        <div className="h-4 w-2/5 rounded bg-gray-200" />
      </div>
    );
  }