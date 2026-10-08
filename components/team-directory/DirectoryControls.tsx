type SortOrder = "asc" | "desc";

interface DirectoryControlsProps {
  sortOrder: SortOrder;
  onSortChange: (value: SortOrder) => void;
  selectedCount: number;
  onClearSelection: () => void;
}

export default function DirectoryControls({
  sortOrder,
  onSortChange,
  selectedCount,
  onClearSelection,
}: DirectoryControlsProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <label
          htmlFor="sort-order"
          className="text-sm font-medium text-gray-700"
        >
          Sort by:
        </label>

        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) =>
            onSortChange(e.target.value as SortOrder)
          }
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          <option value="asc">Name (A–Z)</option>
          <option value="desc">Name (Z–A)</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <p role="status" className="text-sm font-medium text-gray-700">
          {selectedCount} selected
        </p>

        <button
          type="button"
          onClick={onClearSelection}
          disabled={selectedCount === 0}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear selection
        </button>
      </div>
    </div>
  );
}