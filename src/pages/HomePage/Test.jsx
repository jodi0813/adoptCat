function Test() {
    const questions = [
        {
            question: "你心目中想要領養的貓咪個性是？",
            options: ["很親人常常對我撒嬌", "像室友一樣靜靜在旁邊陪伴，但不要過多打擾", "習慣及性格穩定比較重要"],
            scores: ["黏人", "獨立", "穩定"],
        },
        {
            question: "家中是否有其他貓咪?",
            options: ["否", "是", "目前沒有但未來有打算養第二隻貓"],
            scores: ["單貓", "多貓", "多貓"],
        },
        {
            question: "你是否有養貓經驗?",
            options: ["否", "是"],
            scores: ["沒養過貓", "有養過貓"],
        },
        {
            question: "你想要領養多大的貓?",
            options: ["我只想養幼貓", "我想要個性穩定的成貓","我願意給老貓一個晚年安心的家"],
            scores: ["0~1歲", "1~3歲"||"3~5歲", "5歲以上"],
        }
    ];








    return (
        <>

            <div>
                <img src="./images/screen.png" alt="" />
            </div>
            <button className="testBt" onClick={() => navigate("/quiz")}>
                <img src="./images/testbt.png" alt="" />
            </button>
        </>
    )


} export default Test