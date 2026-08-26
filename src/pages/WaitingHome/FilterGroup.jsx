function FilterGroup({ title, options, selected, onSelect, selectedList = [], isMulti = false }) {
  const isSelected = (option) => {
    return isMulti ? selectedList.includes(option) : selected === option;
  };

  return (
    <div className="flex w-full items-center gap-1 flex-row lg:flex-col">
      <label className="text-left w-1/4 text-base leading-normal font-normal tracking-[2.16px] text-[#3a2c19] lg:text-center lg:w-auto">
        {title}
      </label>
      <div className="flex flex-wrap w-[70%] justify-start gap-1 lg:w-auto lg:justify-center lg:gap-2">
        {options.map((option, i) => (
          <button
            key={i}
            className={`min-w-[100px] cursor-pointer rounded-full border border-[#ffa134] bg-white py-1 text-center text-base leading-normal font-normal tracking-[2.16px] text-[#604d32] hover:bg-[#fff6e0] px-[7px] lg:px-3 ${
              isSelected(option) ? "border-[#e09e30] bg-[#f1ca87] font-semibold text-[#3a2c19]" : ""
            }`}
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
