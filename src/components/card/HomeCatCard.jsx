
import CatNameTagAuto from "../tag/CatNameTagAuto"
import "./HomeCatCard.scss"

function HomeCatCard() {
    return (
        <>
            <div className="phoneCard">
                <div className="phoneHead">
                    <span>1Y</span>
                    <img src="./images/icon-sex.svg" alt="性別" />
                    <img src="./images/icon-phonehead.svg" alt="手機劉海" className="icon-phonehead" />
                    <img src="./images/icon-wifi.svg" alt="wifi" />
                    <img src="./images/icon-battery.svg" alt="電量" />
                </div>
             <CatNameTagAuto name="豆漿"/>
                <div className="phoneCatPhoto">
                    <img src="./images/phonecat.png" alt="貓照片" />
                </div>
            </div>

        </>
    )
} export default HomeCatCard