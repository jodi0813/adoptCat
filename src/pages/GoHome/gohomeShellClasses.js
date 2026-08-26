// 共用於 GoHome / Follow / Adopt 三個頁面的外層容器樣式（原本共用 #gohome, #follow, #adopt 選擇器）
export const gohomeSectionClass =
  "relative flex w-full items-center justify-center px-[5%] pb-0 pt-[20%] md:pt-[15%] lg:pb-[200px] lg:pt-[200px]";

export const gohomeEarClass =
  "absolute top-[10%] z-0 hidden lg:block";
export const gohomeLeftEarClass = `${gohomeEarClass} left-[20%]`;
export const gohomeRightEarClass = `${gohomeEarClass} right-[20%]`;

export const gohomeBoxClass =
  "relative z-1 flex w-[min(100%,1500px)] gap-5 rounded-full bg-white p-[5%] h-full flex-col lg:h-[90%] lg:flex-row";
