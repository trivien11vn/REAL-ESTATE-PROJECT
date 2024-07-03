import clsx from 'clsx';
import React from 'react';
import Select from 'react-select';
import { twMerge } from 'tailwind-merge';

const SelectLibrary = ({
  containerClassname,
  label,
  id,
  register,
  errors = {},
  validate,
  placeholder,
  options = [],
  onChange
}) => {
  // Define custom styles for react-select
  const customStyles = {
    placeholder: (provided) => ({
      ...provided,
      display: '-webkit-box',
      WebkitLineClamp: '1',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
  };

  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname))}>
      {label && (
        <label className="font-medium text-main-700" htmlFor={id}>
          {label}
        </label>
      )}
      <Select
        {...register(id, validate)}
        placeholder={placeholder}
        isClearable
        options={options}
        isSearchable
        onChange={(val) => onChange(val)}
        formatOptionLabel={(option) => (
          <div className="flex items-center px-6 gap-2">
            <img src={option?.image} alt="" className="w-5 h-5 object-cover" />
            <span>{option?.name}</span>
          </div>
        )}
        className={{
          control: () => clsx(''),
          input: () => '',
          option: () => '',
        }}
        styles={customStyles} // Apply custom styles
      />
      {errors[id] && <small className="italic text-red-500">{errors[id]?.message}</small>}
    </div>
  );
};

export default SelectLibrary;
