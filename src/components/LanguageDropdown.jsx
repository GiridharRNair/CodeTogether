import React from "react";
import Select from "react-select";
import { languageOptions } from "../data/languageOptions.js";

const LanguagesDropdown = ({ onSelectChange, currValue }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#334454' : 'transparent',
      marginBottom: 5,
      border: state.isFocused ? '2px solid blue' : '2px solid gray', // Customize the border styles
      borderRadius: 5,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'blue' : 'white',
      color: state.isSelected ? 'white' : 'black',
      fontWeight: 'bold',
      ':hover': {
        backgroundColor: state.isSelected ? 'blue' : 'lightblue',
        color: 'white',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
      fontWeight: 'bold',
    }),
  };
  

  return (
    <Select
      //styles={customStyles}
      placeholder="Filter By Category"
      options={languageOptions}
      value={currValue ? currValue : null}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
