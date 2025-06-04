function FilterGroup({ title, options, selected, onSelect, selectedList = [], isMulti = false }) {
  const isSelected = (option) => {
    return isMulti ? selectedList.includes(option) : selected === option;
  };

  return (
    <div className="filter-group">
      <label>{title}</label>
      <div className="options">
        {options.map((option, i) => (
          <button
            key={i}
            className={isSelected(option) ? "selected" : ""}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterGroup;
