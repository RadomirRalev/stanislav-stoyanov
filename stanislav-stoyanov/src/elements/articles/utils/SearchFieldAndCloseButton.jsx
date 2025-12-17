import { CloseButton } from "../../common/Buttons";
import { SearchField } from "../../common/Fields";

export const SearchFieldAndCloseButton = ({
  query,
  onQueryChange,
  onSearch,
  onClose,
}) => (
  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <SearchField
      value={query}
      onChange={onQueryChange}
      onSearch={onSearch}
      autoFocus
    />
    <CloseButton onClickAction={onClose} />
  </div>
);
