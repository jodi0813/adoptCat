import CatPawRating from "./CatPawRating";
import "./CatProfile.scss";
import CatNameTagAuto from "../../components/tag/CatNameTagAuto";
import { useState } from "react";

function CatProfile() {
    const [bigCat, setBigCat] = useState("/images/jodicat3.jpg");
    const [smallCats, setSmallCats] = useState([
        "/images/jodicat4.jpg",
        "/images/jodicat2.jpg",
    ]);
    function handleClick(idx) {
        const cat = smallCats[idx];
        const newSmallCats = [...smallCats];
        newSmallCats[idx] = bigCat;
        setSmallCats(newSmallCats);
        setBigCat(cat);
    }
    return (
        <>
            <section id="catProfile">
                <div className="profilehead">
                    <div className="profileLeft">
                        <header className="profileHeader">
                            <div className="profileTitle">
                                <img src="./images/catpawbrown.svg" alt="標題圖示" />
                                <h2>搗灰</h2>
                                <img src="./images/catpawbrown.svg" alt="標題圖示" />
                            </div>
                            <div className="profileSubTitle">弟弟/ 2歲/ 白貓</div>
                        </header>
                        <div className="profilePhotoThree">
                            <img
                                src={bigCat}
                                alt="貓咪頭貼"
                                className="profilePhoto maskBig"
                            />
                            <div className="maskSmallPhoto">
                                {smallCats.map((cat, idx) => (
                                    <img
                                        key={idx}
                                        src={cat}
                                        alt="貓咪頭貼"
                                        className="profilePhoto maskSmall"
                                        onClick={() => handleClick(idx)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="profileRight">
                        <CatNameTagAuto name="貓咪性格" catColor="#CAB271" />
                        <div className="catPawRatingBox">
                            <div>
                                <CatPawRating
                                    attribute="活動力"
                                    low="文靜"
                                    hight="活潑"
                                    level1="#FFC37D"
                                    level2="#FFC37D"
                                    level3="#FFC37D"
                                />
                                <CatPawRating
                                    attribute="適應力"
                                    low="低"
                                    hight="高"
                                    level1="#FFC37D"
                                    level2="#FFC37D"
                                />
                            </div>
                            <div>
                                <CatPawRating
                                    attribute="社交力"
                                    low="不親貓"
                                    hight="親貓"
                                    level1="#FFC37D"
                                    level2="#FFC37D"
                                />
                                <CatPawRating
                                    attribute="依賴力"
                                    low="獨立"
                                    hight="黏人"
                                    level1="#FFC37D"
                                    level2="#FFC37D"
                                    level3="#FFC37D"
                                    level4="#FFC37D"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profileMain">
                    <div className="profileMainBox">
                        <div className="profileBox">
                            <CatNameTagAuto name="背景故事" catColor="#CAB271" />
                            <div className="profileDetail">
                                搗灰是一隻在廢棄空地被發現的小白貓，當時牠孤零零地躲在一個紙箱裡，身上還有一點小擦傷。我們救援人員靠近時，牠沒有逃跑，只用那雙圓圓的眼睛靜靜望著大家，
                                彷彿一直在等待著我們來救牠。
                            </div>
                        </div>
                        <div className="profileBox">
                            <CatNameTagAuto name="貓咪個性" catColor="#CAB271" />
                            <div className="profileDetail">
                                搗灰個性比較膽小，剛開始雖然對陌生人會保持距離觀察，但沒有攻擊的行為，也經常喵喵叫希望得到關注，相信只要多花時間陪伴牠，牠會是一隻非常黏人的小可愛。
                            </div>
                        </div>
                    </div>
                    <div className="profileMainBox">
                        <div className="profileBox">
                            <CatNameTagAuto name="領養條件" catColor="#CAB271" />
                            <div className="profileDetail">
                                <ol >
                                    <li>23歲以上</li>
                                    <li>有穩定收入</li>
                                    <li>適合新手</li>
                                    <li>可以多貓家庭</li>
                                </ol>

                            </div>
                        </div>

                        <div className="profileBox">
                            <CatNameTagAuto name="健康狀態" catColor="#CAB271" />
                            <div className="profileDetail">結紮</div>
                        </div>
                    </div>
                    <div className="profileMainBox">
                        <div className="profileBox">
                            <CatNameTagAuto name="貓咪喜好" catColor="#CAB271" />
                            <div className="profileDetail">貓肉泥、髮圈、海綿</div>
                        </div>
                        <div className="profileBox">
                            <CatNameTagAuto name="領貓想說..." catColor="#CAB271" />
                            <div className="profileDetail">
                                搗灰剛開始可能不會像其他親人的貓咪一樣熱情，希望領養人可以多給他一點時間適應熟悉，讓他能夠也有被愛的機會!
                            </div>
                        </div></div>
                </div>
            </section>
        </>
    );
}
export default CatProfile;
