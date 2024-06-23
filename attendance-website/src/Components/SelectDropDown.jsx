import React from "react";
import { useState } from "react";

const SelectDropDown = ({ onBlur, onChange, errors, touched, options, ...props }) => {
  const { id, name, placeholder,icon ,value,filter,label} = props;
  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  return (
<div className="input-big-container">
{label ? ( <label htmlFor={id}>  {label}  </label> ) : null}
<div className="select-container input-container">
      <div className="input-wrapper w-full flex gap-x-2 items-center p-2" style={{borderColor:errors && touched ? "red" : ""}}>
      {icon ? <label htmlFor={id} className="icon">{icon}</label> : null}
      <select
        className="outline-none w-full border-none"
        id={id}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={ !filter?  onChange : handleSelectChange }
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options?.map((option) => (
          <option className=" text-sm text-gray-600"
          key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>
      {errors && touched ? <p className="text-red-500 text-sm mt-2">{errors}</p> : null}
    </div>
</div>
  );
};

export default SelectDropDown;
