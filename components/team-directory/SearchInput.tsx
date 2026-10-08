type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
  };
  
  export default function SearchInput({
    value,
    onChange,
  }: SearchInputProps) {
    return (
      <div className="mb-6">
        <label
          htmlFor="user-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Search team members
        </label>
  
        <input
          id="user-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none
         focus-visible:ring-[#08291F]
         focus-visible:outline-[#08291F]"
        />
      </div>
    );
  }