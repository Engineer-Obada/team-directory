"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@/lib/users";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserSelection } from "@/hooks/useUserSelection";

import SearchInput from "./SearchInput";
import DirectoryControls from "./DirectoryControls";
import DirectoryError from "./DirectoryError";
import UserList from "./UserList";

type SortOrder = "asc" | "desc";

export default function TeamDirectory() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const debouncedSearch = useDebounce(search, 300);

  const {
    selectedIds,
    toggleSelection,
    clearSelection,
  } = useUserSelection();

  const {
    data: users = [],
    isPending,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => getUsers(signal),
  });

  const filteredAndSortedUsers = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      )
      .sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  }, [users, debouncedSearch, sortOrder]);

  return (
    <section aria-label="Team members">
      <SearchInput
        value={search}
        onChange={setSearch}
      />

      <DirectoryControls
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        selectedCount={selectedIds.length}
        onClearSelection={clearSelection}
      />

      {isError ? (
        <DirectoryError
          message={error.message}
          onRetry={() => {
            void refetch();
          }}
          isRetrying={isFetching}
        />
      ) : (
        <UserList
          users={filteredAndSortedUsers}
          selectedIds={selectedIds}
          onToggleSelection={toggleSelection}
          isLoading={isPending}
        />
      )}
    </section>
  );
}