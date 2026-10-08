import UserCardSkeleton from "./UserCardSkeleton";

interface UserListSkeletonProps {
  count?: number;
}

export default function UserListSkeleton({
  count = 6,
}: UserListSkeletonProps) {
  return (
    <div role="status" aria-label="Loading team members">
      <span className="sr-only">
        Loading team members...
      </span>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}