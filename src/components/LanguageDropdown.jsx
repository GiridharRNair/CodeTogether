import React, { memo } from "react";
import Select from "react-select";
import { languageOptions } from "../data/languageOptions.js";

const LanguagesDropdown = memo(({ onSelectChange, currValue }) => {

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '1px solid black',
      '&:hover': {
        border: '1px solid black',
      },
      boxShadow: 'none'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'grey' : 'transparent', // Set hover and focus background color
      color: state.isFocused ? 'white' : 'black', // Set hover and focus text color
      cursor: 'pointer', // Show pointer cursor on hover
    }),
  };

  return (
    <Select
      aria-label="Language Dropdown"
      placeholder="Filter By Category"
      styles={customStyles}
      options={languageOptions}
      value={currValue ? currValue : null}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
});

export default LanguagesDropdown;
