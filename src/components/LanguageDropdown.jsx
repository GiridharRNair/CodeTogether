import React, { memo } from "react";
import Select from "react-select";
import { languageOptions } from "../data/languageOptions.js";

const LanguagesDropdown = memo(({ onSelectChange, currValue }) => {

  return (
    <Select
      aria-label="Language Dropdown"
      placeholder="Filter By Category"
      options={languageOptions}
      value={currValue ? currValue : null}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
});

export default LanguagesDropdown;
