function Maintitle({ en, cn }) {
  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-center font-['Huninn',cursive] text-[4rem] leading-normal font-normal tracking-[5.76px] text-[#dfc681] max-[767px]:text-[1.8rem]">
          {en}
        </span>
        <span className="flex items-center justify-center text-center text-[2rem] leading-normal font-normal tracking-[0.72px] text-[#461b03] [&_img]:h-[20%] [&_img]:w-[20%]">
          <img src="./images/catpawbrown.svg" alt="標題裝飾" />
          <h1>{cn}</h1>
          <img src="./images/catpawbrown.svg" alt="標題裝飾" />
        </span>
      </div>
    </>
  );
}
export default Maintitle;
