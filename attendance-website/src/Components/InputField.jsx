
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const InputField = ({
  onBlur,
  onChange,
  errors,
  touched,
  id,
  name,
  icon,
  type,
  placeholder,
  value,
  disabled,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="input-big-container">
      {label ? ( <label htmlFor={id}>  {label}  </label> ) : null}
      <div className="input-container">
        <div
          className={`
          input-wrapper w-full flex gap-x-2 items-center p-2,
          ${disabled ? "bg-[#F9FAFA] hover:pointer-events-none" : ""}`}
          style={{ borderColor: errors && touched ? "red" : "" }}
        >
          {icon ? (
            <label htmlFor={id} className="icon">
              {icon}
            </label>
          ) : null}
          <input
            className="outline-none w-full border-none"
            type={showPassword ? "text" : type ? type : "text"}
            id={id}
            name={name}
            placeholder={placeholder ? placeholder : "Enter....."}
            onBlur={onBlur}
            onChange={onChange}
            value={value ? value : ""}
            disabled={disabled}
          />
          {type === "password" ? (
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <IoEyeOffOutline size={22} color="gray" />
              ) : (
                <IoEyeOutline size={22} color="gray" />
              )}
            </span>
          ) : null}
        </div>
      </div>
      <div>
      <p style={{ color: "red" ,fontSize:"12px"}}>{errors && touched ?errors : null }</p>
      </div>
      {/* {errors && touched ? (
          <p style={{ color: "red" ,fontSize:"12px"}}>{errors}</p>
        ) : null} */}
    </div>
  );
};



InputField.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.string,
  touched: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.element,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string
};

export default InputField;
