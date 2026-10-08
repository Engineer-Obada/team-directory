import type { User } from "@/types/user";

type UserCardProps = {
  user: User;
  isSelected: boolean;
  onToggle: (id: number) => void;
};

export default function UserCard({
  user,
  isSelected,
  onToggle,
}: UserCardProps) {
  return (
    <label
      className={`
        flex cursor-pointer flex-col gap-3
        rounded-xl border border-t-4 p-5
        shadow-sm transition-all duration-200
      
        ${
          isSelected
            ? "border-[#C2A96B] border-t-[#5E6B3F] bg-[#F3EBD8]"
            : "border-[#D8D4C8] border-t-[#5E6B3F] bg-[#FCFBF7] hover:border-[#C2A96B] hover:shadow-md"
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#4C5733]">
          {user.name}
        </h2>

        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(user.id)}
          aria-label={`Select ${user.name}`}
          className="mt-1 h-5 w-5 shrink-0 accent-[#5E6B3F]"
        />
      </div>

      <p className="break-all text-sm text-[#6C6A5E]">
        {user.email}
      </p>

      <p className="text-sm font-medium text-[#8C7440]">
        {user.company.name}
      </p>

      {isSelected && (
        <span className="text-sm font-semibold text-[#5E6B3F]">
          ✓ Selected
        </span>
      )}
    </label>
  );
}