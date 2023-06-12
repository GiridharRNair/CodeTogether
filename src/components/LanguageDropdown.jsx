import React from "react";
import Select from "react-select";
import { languageOptions } from "../data/languageOptions.js";

const LanguagesDropdown = ({ onSelectChange, currValue }) => {
  // const customStyles = {
  //   control: (provided) => ({
  //     ...provided,
  //     backgroundColor: '#334454',
  //     marginTop: 10, 
  //     marginBottom: 10
  //   }),
  //   option: provided => ({
  //     ...provided,
  //     color: 'black'
  //   }),
  //   singleValue: provided => ({
  //     ...provided,
  //     color: 'black'
  //   }),
  // };

  return (
    <Select
      // styles={customStyles}
      placeholder="Filter By Category"
      options={languageOptions}
      value={currValue ? currValue : null}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
