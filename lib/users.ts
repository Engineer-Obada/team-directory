import type { User } from "@/types/user";

const API_URL =
  "https://jsonplaceholder.typicode.com/users";

export async function getUsers(
  signal?: AbortSignal
): Promise<User[]> {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch users: ${response.status}`
    );
  }

  return response.json();
}