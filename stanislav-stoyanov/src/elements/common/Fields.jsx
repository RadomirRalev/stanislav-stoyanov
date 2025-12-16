import { Search } from "lucide-react";

export const SearchField = ({
  value,
  onChange,
  onSearch,
  placeholder = "D›ĄSĄ?Ą?D,...",
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch?.();
    }
  };

  return (
    <div className="relative w-full max-w-sm sm:-mt-6">
      <input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="h-11 w-full border border-emerald-200 px-3 text-emerald-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      />
      <button
        type="button"
        onClick={onSearch}
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        aria-label="Search"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};
