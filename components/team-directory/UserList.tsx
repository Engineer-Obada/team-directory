import type { User } from "@/types/user";

import UserCard from "./UserCard";
import UserListSkeleton from "@/components/skeletons/UserListSkeleton";

interface UserListProps {
  users: User[];
  selectedIds: number[];
  onToggleSelection: (id: number) => void;
  isLoading?: boolean;
}

export default function UserList({
  users,
  selectedIds,
  onToggleSelection,
  isLoading = false,
}: UserListProps) {
  if (isLoading) {
    return <UserListSkeleton count={6} />;
  }

  if (users.length === 0) {
    return (
      <p
        role="status"
        className="py-12 text-center text-gray-600"
      >
        No results
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={selectedIds.includes(user.id)}
          onToggle={onToggleSelection}
        />
      ))}
    </div>
  );
}