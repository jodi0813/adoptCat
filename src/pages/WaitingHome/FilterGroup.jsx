function FilterGroup({ title, options, selected, onSelect, selectedList = [], isMulti = false }) {
  const isSelected = (option) => {
    return isMulti ? selectedList.includes(option) : selected === option;
  };

  return (
    <div className="flex w-full flex-col items-center gap-1 max-[1024px]:flex-row">
      <label className="text-center text-base leading-normal font-normal tracking-[2.16px] text-[#3a2c19] max-[1024px]:w-1/4 max-[1024px]:text-left">
        {title}
      </label>
      <div className="flex flex-wrap justify-center gap-2 max-[1024px]:w-[70%] max-[1024px]:justify-start max-[1024px]:gap-1">
        {options.map((option, i) => (
          <button
            key={i}
            className={`min-w-[100px] cursor-pointer rounded-full border border-[#ffa134] bg-white px-3 py-1 text-center text-base leading-normal font-normal tracking-[2.16px] text-[#604d32] hover:bg-[#fff6e0] max-[1024px]:px-[7px] max-[1024px]:py-1 ${
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
