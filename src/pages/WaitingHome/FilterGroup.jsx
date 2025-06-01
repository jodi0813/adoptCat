function FilterGroup({ title, options }) {
  return (
    <div className="filter-group">
      <label>{title}</label>
      <div className="options">
        {options.map((option, i) => (
          <button key={i}>{option}</button>
        ))}
      </div>
    </div>
  );
}

export default FilterGroup;
