const RadioGroup = ({ label, name, options, onChange, value, errors, touched }) => (
    <div className="radio-group">
      <label className="radio-group-label" style={{ fontWeight: "bold" }}>
        {label}
      </label>
      <div className="radio-options">
        {options.map((option, index) => (
          <div key={index} className="radio-option">
            <input
              className="radio-input"
              type="radio"
              name={name}
              id={`${name}_${index}`}
              value={option}
              checked={value === option}
              onChange={onChange}
            />
            <label className="radio-label" htmlFor={`${name}_${index}`}>
              {option}
            </label>
          </div>
        ))}
      </div>
      {errors && touched && (
        <div className="radio-error" style={{ fontSize: "0.875em" }}>
          {errors}
        </div>
      )}
    </div>
  );
  
  export default RadioGroup;
  