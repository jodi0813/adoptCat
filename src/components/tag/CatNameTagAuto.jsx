import { useEffect, useState } from "react";
import "./CatNameTagAuto.scss";

function CatNameTagAuto({ name ,catColor}) {
    const [showAutoCat, setShowAutoCat] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowAutoCat(true);
            setTimeout(() => {
                setShowAutoCat(false);
            }, 1500);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="catNameTagAuto">
            <svg
                className={`catAuto default-auto ${showAutoCat ? "hide-auto" : ""}`}
                viewBox="0 0 231 77"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M21.0452 40.2271C21.0452 26.3492 32.2955 15.0989 46.1735 15.0989H168.74C182.618 15.0989 193.868 26.3492 193.868 40.2271V40.2271C193.868 54.1051 182.618 65.3553 168.74 65.3553H46.1735C32.2955 65.3553 21.0452 54.1051 21.0452 40.2271V40.2271Z" fill={catColor} />
            </svg>

            <svg
                className={`catAuto hover-auto ${showAutoCat ? "show-auto" : ""}`}
                viewBox="0 0 230 77"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M176.798 41.1761C176.798 42.9089 177.783 44.5148 179.381 45.1852C200.758 54.1554 213.481 39.5182 218.756 23.3922C224.241 6.62704 212.145 0.119373 206.953 20.3022C202.216 38.7155 202.226 43.1234 182.92 36.8224C179.927 35.8455 176.798 38.0275 176.798 41.1761Z" fill={catColor} />
                <path d="M20.532 40.0951C20.532 26.2172 31.7823 14.9669 45.6603 14.9669H168.227C182.105 14.9669 193.355 26.2172 193.355 40.0951C193.355 53.9731 182.105 65.2234 168.227 65.2234H45.6603C31.7823 65.2234 20.532 53.9731 20.532 40.0951Z" fill={catColor} />
                <path d="M46.8288 3.07225C47.6247 1.93073 49.3142 1.93073 50.11 3.07225L58.505 15.113C59.4295 16.4389 58.4808 18.2569 56.8644 18.2569H40.0744C38.4581 18.2569 37.5094 16.4389 38.4338 15.113L46.8288 3.07225Z" fill={catColor} />
                <path d="M64.1572 3.18184C64.95 2.00493 66.6821 2.00494 67.4748 3.18185L75.5292 15.1396C76.424 16.468 75.4721 18.2569 73.8704 18.2569H57.7617C56.1599 18.2569 55.2081 16.468 56.1029 15.1396L64.1572 3.18184Z" fill={catColor} />
                <path d="M29.7548 32.397L16.4844 30.886" stroke="#CAB271" />
                <path d="M29.6315 38.804L16.2341 41.3861" stroke="#CAB271" />
                <path d="M29.7548 36.1424L16.111 36.2079" stroke="#CAB271" />
                <path d="M5.9463 62.9462C4.96619 61.4639 4.68768 59.611 5.2943 57.9406C9.73471 45.7139 16.2339 41.4885 32.0261 40.3509C34.0607 40.2043 36.0007 41.2041 37.1257 42.9057V42.9057C40.1225 47.4382 35.646 53.3469 30.2185 53.6052C24.6851 53.8685 21.1437 56.1872 18.8149 60.7168C16.2779 65.6514 9.00649 67.5746 5.9463 62.9462V62.9462Z" fill={catColor} />
            </svg>

            <span className="catTextAuto">{name}</span>
        </div>
    );
}

export default CatNameTagAuto;
