// 共用於 GoHome / Follow / Adopt 三個頁面的外層容器樣式（原本共用 #gohome, #follow, #adopt 選擇器）
export const gohomeSectionClass =
  "relative flex w-full items-center justify-center px-[5%] py-[200px] max-[1024px]:px-[5%] max-[1024px]:pt-[15%] max-[1024px]:pb-0 max-[768px]:pt-[20%]";

export const gohomeEarClass =
  "absolute top-[10%] z-0 max-[1024px]:hidden";
export const gohomeLeftEarClass = `${gohomeEarClass} left-[20%]`;
export const gohomeRightEarClass = `${gohomeEarClass} right-[20%]`;

export const gohomeBoxClass =
  "relative z-1 flex w-full max-w-[1500px] h-[90%] gap-5 rounded-full bg-white p-[5%] max-[1024px]:h-full max-[1024px]:flex-col";
