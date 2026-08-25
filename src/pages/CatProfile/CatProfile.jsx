import CatPawRating from "./CatPawRating";
import CatNameTagAuto from "../../components/tag/CatNameTagAuto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { getCat } from "../../services/catsService";

// personality 欄位還沒 backfill 完成的舊資料，或漏掉某個屬性時的保底值：
// 4 根手指裡填 2 根，代表「普通/中等」，避免整隻手空白看起來像壞掉。
const NEUTRAL_LEVEL = 2;

// cat.personality.<key> 對應到畫面上四個 CatPawRating 的屬性文字。
const PAW_ATTRIBUTES = [
    { key: "activity", attribute: "活動力", low: "文靜", hight: "活潑" },
    { key: "adaptability", attribute: "適應力", low: "低", hight: "高" },
    { key: "sociability", attribute: "社交力", low: "不親貓", hight: "親貓" },
    { key: "dependency", attribute: "依賴力", low: "獨立", hight: "黏人" },
];

function getPawLevel(cat, key) {
    const level = cat?.personality?.[key];
    if (typeof level !== "number" || Number.isNaN(level)) return NEUTRAL_LEVEL;
    return Math.max(0, Math.min(4, level));
}

// 下面六個區塊（背景故事/貓咪個性/領養條件/健康狀態/貓咪喜好/領貓想說）
// 的文案現在都應該來自 Firestore 的對應欄位。這裡的預設值只在文件還沒
// backfill、欄位確實不存在時當保底，避免畫面出現空白框，不應該被當成
// 真正的資料來源。
const FALLBACK_TEXT = {
    story: "這隻貓咪的完整身世還在整理中，牠正安全地待在中途之家等待有緣人。",
    personalityNote: "個性資料整理中，歡迎聯繫收容所進一步了解這隻貓咪的個性。",
    healthStatus: "健康狀態確認中",
    favorites: "喜好資料整理中",
    adopterMessage: "希望領養人可以多給我一點時間適應熟悉，讓我也有被愛的機會!",
};
const FALLBACK_ADOPTION_REQUIREMENTS = ["23歲以上", "有穩定收入"];

function CatProfile() {
    const { id } = useParams();

    const [cat, setCat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [bigCat, setBigCat] = useState(null);
    const [smallCats, setSmallCats] = useState([]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);

        getCat(id)
            .then((data) => {
                if (cancelled) return;
                setCat(data);
                const photos = (data?.png ? [data.png] : []).filter(Boolean);
                setBigCat(photos[0] ?? "/images/jodicat3.jpg");
                setSmallCats(
                    photos.length > 1
                        ? photos.slice(1)
                        : ["/images/jodicat4.jpg", "/images/jodicat2.jpg"],
                );
            })
            .catch((err) => {
                console.error("讀取貓咪資料失敗:", err);
                if (!cancelled) setError(err);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    function handleClick(idx) {
        const clicked = smallCats[idx];
        const newSmallCats = [...smallCats];
        newSmallCats[idx] = bigCat;
        setSmallCats(newSmallCats);
        setBigCat(clicked);
    }

    if (loading) {
        return (
            <section id="catProfile" className="flex w-full items-center justify-center px-[5%] py-[100px]">
                <p className="text-[1.2rem] text-[#604d32]">貓咪資料載入中...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section id="catProfile" className="flex w-full items-center justify-center px-[5%] py-[100px]">
                <p className="text-[1.2rem] text-[#604d32]">貓咪資料載入失敗，請稍後再試一次。</p>
            </section>
        );
    }

    if (!cat) {
        return (
            <section id="catProfile" className="flex w-full items-center justify-center px-[5%] py-[100px]">
                <p className="text-[1.2rem] text-[#604d32]">找不到這隻貓咪，牠可能已經被領養囉！</p>
            </section>
        );
    }

    return (
        <>
            <section id="catProfile" className="flex flex-col gap-[150px] px-[5%] py-[100px]">
                <div className="flex w-full max-[767px]:flex-col">
                    <div className="flex flex-1 flex-col items-center gap-5 pt-[50px]">
                        <header className="flex flex-col items-center justify-center gap-[10px]">

                            <div className="flex items-center gap-[15px]">
                                {/* <img src="./images/catpawbrown.svg" alt="標題圖示" /> */}
                                <span className="text-center text-[3rem] font-medium text-[#604d32]">{cat.name}</span>
                                <Button text="申請領養" link="/gohome/adopt" />
                                {/* <img src="./images/catpawbrown.svg" alt="標題圖示" /> */}

                            </div>
                            <div className="text-[1.5rem] leading-normal font-normal text-[#604d32]">{cat.sex}/ {cat.years}/ {cat.color}貓</div>
                        </header>
                        <div className="flex flex-col items-center">
                            <img
                                src={bigCat}
                                alt="貓咪頭貼"
                                className="w-[70%] object-cover [mask-image:url('/images/maskcatsmall.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/images/maskcatsmall.svg')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
                            />
                            <div className="flex justify-between gap-5 p-[5%]">
                                {smallCats.map((catPhoto, idx) => (
                                    <img
                                        key={idx}
                                        src={catPhoto}
                                        alt="貓咪頭貼"
                                        className="w-[48%] object-cover [mask-image:url('/images/maskcatsmall.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/images/maskcatsmall.svg')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
                                        onClick={() => handleClick(idx)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-17.5 pt-12.5">

                        <CatNameTagAuto name="貓咪性格" catColor="#CAB271" />


                        <div className="flex w-full justify-center gap-[5%] rounded-[30px]">
                            <div>
                                {PAW_ATTRIBUTES.slice(0, 2).map(({ key, attribute, low, hight }) => (
                                    <CatPawRating
                                        key={key}
                                        attribute={attribute}
                                        low={low}
                                        hight={hight}
                                        activeLevel={getPawLevel(cat, key)}
                                        animate
                                        width="100%"
                                    />
                                ))}
                            </div>
                            <div>
                                {PAW_ATTRIBUTES.slice(2).map(({ key, attribute, low, hight }) => (
                                    <CatPawRating
                                        key={key}
                                        attribute={attribute}
                                        low={low}
                                        hight={hight}
                                        activeLevel={getPawLevel(cat, key)}
                                        animate
                                        width="100%"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-1 flex-col gap-[1%]">
                    <div className="flex max-[767px]:flex-col">
                        <div className="flex w-full flex-1 flex-col items-center [&_.profileDetail]:flex [&_.profileDetail]:h-[300px] [&_.profileDetail]:w-4/5 [&_.profileDetail]:shrink-0 [&_.profileDetail]:items-center [&_.profileDetail]:justify-center [&_.profileDetail]:rounded-[25px] [&_.profileDetail]:bg-white/50 [&_.profileDetail]:px-[39px] [&_.profileDetail]:py-4 [&_.profileDetail]:text-justify [&_.profileDetail]:text-[1.2rem] [&_.profileDetail]:leading-[150%] [&_.profileDetail]:font-normal [&_.profileDetail]:tracking-[2.64px] [&_.profileDetail]:text-[#604d32] max-[767px]:[&_.profileDetail]:w-full">
                            <CatNameTagAuto name="背景故事" catColor="#CAB271" />
                            <div className="profileDetail">
                                {cat.story ?? FALLBACK_TEXT.story}
                            </div>
                        </div>
                        <div className="flex w-full flex-1 flex-col items-center [&_.profileDetail]:flex [&_.profileDetail]:h-[300px] [&_.profileDetail]:w-4/5 [&_.profileDetail]:shrink-0 [&_.profileDetail]:items-center [&_.profileDetail]:justify-center [&_.profileDetail]:rounded-[25px] [&_.profileDetail]:bg-white/50 [&_.profileDetail]:px-[39px] [&_.profileDetail]:py-4 [&_.profileDetail]:text-justify [&_.profileDetail]:text-[1.2rem] [&_.profileDetail]:leading-[150%] [&_.profileDetail]:font-normal [&_.profileDetail]:tracking-[2.64px] [&_.profileDetail]:text-[#604d32] max-[767px]:[&_.profileDetail]:w-full">
                            <CatNameTagAuto name="貓咪個性" catColor="#CAB271" />
                            <div className="profileDetail">
                                {cat.personalityNote ?? FALLBACK_TEXT.personalityNote}
                            </div>
                        </div>
                    </div>
                    <div className="flex max-[767px]:flex-col">
                        <div className="flex w-full flex-1 flex-col items-center [&_.profileDetail]:flex [&_.profileDetail]:h-[300px] [&_.profileDetail]:w-4/5 [&_.profileDetail]:shrink-0 [&_.profileDetail]:items-center [&_.profileDetail]:justify-center [&_.profileDetail]:rounded-[25px] [&_.profileDetail]:bg-white/50 [&_.profileDetail]:px-[39px] [&_.profileDetail]:py-4 [&_.profileDetail]:text-justify [&_.profileDetail]:text-[1.2rem] [&_.profileDetail]:leading-[150%] [&_.profileDetail]:font-normal [&_.profileDetail]:tracking-[2.64px] [&_.profileDetail]:text-[#604d32] max-[767px]:[&_.profileDetail]:w-full">
                            <CatNameTagAuto name="領養條件" catColor="#CAB271" />
                            <div className="profileDetail">
                                <ol>
                                    {(cat.adoptionRequirements?.length
                                        ? cat.adoptionRequirements
                                        : FALLBACK_ADOPTION_REQUIREMENTS
                                    ).map((requirement, idx) => (
                                        <li key={idx}>{requirement}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        <div className="flex w-full flex-1 flex-col items-center [&_.profileDetail]:flex [&_.profileDetail]:h-[300px] [&_.profileDetail]:w-4/5 [&_.profileDetail]:shrink-0 [&_.profileDetail]:items-center [&_.profileDetail]:justify-center [&_.profileDetail]:rounded-[25px] [&_.profileDetail]:bg-white/50 [&_.profileDetail]:px-[39px] [&_.profileDetail]:py-4 [&_.profileDetail]:text-justify [&_.profileDetail]:text-[1.2rem] [&_.profileDetail]:leading-[150%] [&_.profileDetail]:font-normal [&_.profileDetail]:tracking-[2.64px] [&_.profileDetail]:text-[#604d32] max-[767px]:[&_.profileDetail]:w-full">
                            <CatNameTagAuto name="健康狀態" catColor="#CAB271" />
                            <div className="profileDetail">{cat.healthStatus ?? FALLBACK_TEXT.healthStatus}</div>
                        </div>
                    </div>
                    <div className="flex max-[767px]:flex-col">
                        <div className="flex w-full flex-1 flex-col items-center [&_.profileDetail]:flex [&_.profileDetail]:h-[300px] [&_.profileDetail]:w-4/5 [&_.profileDetail]:shrink-0 [&_.profileDetail]:items-center [&_.profileDetail]:justify-center [&_.profileDetail]:rounded-[25px] [&_.profileDetail]:bg-white/50 [&_.profileDetail]:px-[39px] [&_.profileDetail]:py-4 [&_.profileDetail]:text-justify [&_.profileDetail]:text-[1.2rem] [&_.profileDetail]:leading-[150%] [&_.profileDetail]:font-normal [&_.profileDetail]:tracking-[2.64px] [&_.profileDetail]:text-[#604d32] max-[767px]:[&_.profileDetail]:w-full">
                            <CatNameTagAuto name="貓咪喜好" catColor="#CAB271" />
                            <div className="profileDetail">{cat.favorites ?? FALLBACK_TEXT.favorites}</div>
                        </div>
                        <div className="flex w-full flex-1 flex-col items-center [&_.profileDetail]:flex [&_.profileDetail]:h-[300px] [&_.profileDetail]:w-4/5 [&_.profileDetail]:shrink-0 [&_.profileDetail]:items-center [&_.profileDetail]:justify-center [&_.profileDetail]:rounded-[25px] [&_.profileDetail]:bg-white/50 [&_.profileDetail]:px-[39px] [&_.profileDetail]:py-4 [&_.profileDetail]:text-justify [&_.profileDetail]:text-[1.2rem] [&_.profileDetail]:leading-[150%] [&_.profileDetail]:font-normal [&_.profileDetail]:tracking-[2.64px] [&_.profileDetail]:text-[#604d32] max-[767px]:[&_.profileDetail]:w-full">
                            <CatNameTagAuto name="領貓想說..." catColor="#CAB271" />
                            <div className="profileDetail">
                                {cat.adopterMessage ?? FALLBACK_TEXT.adopterMessage}
                            </div>
                        </div></div>
                </div>
            </section>
        </>
    );
}
export default CatProfile;
