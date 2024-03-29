function FormRowSelect({ onChange, name, labelText, list, defaultValue = "" }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        onChange={onChange}
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
      >
        {list.map((status) => {
          return (
            <option key={status} value={status}>
              {status}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormRowSelect;
