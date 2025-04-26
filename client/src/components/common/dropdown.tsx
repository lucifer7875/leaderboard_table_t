import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Select, { Props } from "react-select";

interface DropdownProps extends Props {
  list: any;
}

const customStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "hsl(210, 16%, 93%)",
  }),
};

/**
 * @interface DropdownProps
 * @property {Array<ColumnDef>} columns - Array of column definitions used to configure the table structure and behavior.
 * @property {Array} data - Array of data objects to be displayed in the table.
 */
function Selectable({
  list,
  className,
  value,
  isMulti,
  ...props
}: DropdownProps) {
  const [ddOptions, setDdOptions] = useState([]);
  const [dropdownThreshold, setDropdownThreshold] = useState(50);

  /**
   * Will update threshold value of dropdown to add next 50 users
   */

  const updateThreshold = () => {
    setDdOptions(list?.slice(0, dropdownThreshold + 50));
    setDropdownThreshold((prev) => prev + 50);
  };

  /**
   * Will search user from list
   * @param inputValue input value to search into user's data
   */
  const handleSearch = (inputValue: string) => {
    if (inputValue.length > 2) {
      const filteredData = ddOptions.filter((user: any) =>
        user.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setDdOptions(filteredData);
    } else {
      setDdOptions(list?.slice(0, 50));
    }
  };
  useEffect(() => {
    setDdOptions(list);
  }, [list]);

  return (
      <Select
        styles={customStyles}
        className={cn(
          `border-gray-300 c-text-16px react-select-container ${
            isMulti && (value as any)?.length > 0
              ? ""
              : "c-react-select-container"
          }`,
          className
        )}
        value={
          isMulti && (value as any)?.length > 0
            ? value
            : isMulti && (value as any)?.length === 0
            ? []
            : (value as any)?.value === "" ||
              (value as any)?.value === undefined
            ? null
            : value
        }
        options={ddOptions}
        onMenuScrollToBottom={updateThreshold}
        isSearchable={true}
        isMulti={isMulti}
        onInputChange={handleSearch}
        {...props}
      />
  );
}

export default Selectable;
