const BuildFormRow = ({ type, name, spec, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        { labelText || name }
      </label>
  
      <input 
        type={type}
        value={spec}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>);
  };
export default BuildFormRow