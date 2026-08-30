// align="center"（預設）維持原本帶我回家頁面的置中排法；
// align="left" 給收容所領養頁面用，標籤跟按鈕都靠左排整齊。
function FilterGroup({
  title,
  options,
  selected,
  onSelect,
  selectedList = [],
  isMulti = false,
  align = "center",
}) {
  const isSelected = (option) => {
    return isMulti ? selectedList.includes(option) : selected === option;
  };

  const itemsClass = align === "left" ? "lg:items-center" : "";
  const labelAlignClass = align === "left" ? "lg:text-left" : "lg:text-center";
  const optionsJustifyClass = align === "left" ? "lg:justify-start" : "lg:justify-center";

  return (
    <div className={`flex w-full items-center gap-1 ${itemsClass}`}>
      <label className={`text-left w-1/2 text-base leading-normal font-normal tracking-[2.16px] text-[#3a2c19] whitespace-nowrap lg:w-auto ${labelAlignClass}`}>
        {title}
      </label>
      <div className={`flex flex-wrap w-[70%] justify-start gap-1 lg:w-auto lg:gap-2 ${optionsJustifyClass}`}>
        {options.map((option, i) => (
          <button
            key={i}
            className={`min-w-[100px] cursor-pointer rounded-full border px-[7px] py-1 text-center text-base leading-normal font-normal tracking-[2.16px] transition-colors duration-200 lg:px-3 ${
              isSelected(option)
                ? "border-[#e09e30] bg-[#ffa134] font-semibold text-white hover:bg-[#e9bd6e]"
                : "border-[#ffa134] bg-white text-[#604d32] hover:bg-[#fff6e0]"
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
