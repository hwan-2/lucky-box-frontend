import useNumberStore from "../store/useNumberStore.js";
import React, {useState} from "react";

const RandomNumbers = () => {

    const { showNumbers, numbers, getBallColor, showRandomNumbers } = useNumberStore()
    const [isFading, setIsFading] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)

    //리롤 함수 리롤중에는 버튼 활성화 막기
    const isReroll = () => {
        setIsFading(true)
        setIsButtonDisabled(true)

        setTimeout(() => {
            showRandomNumbers()
            setIsFading(false)
        }, 500)

        //버튼 시간 수정
        setTimeout(()=>{
            setIsButtonDisabled(false)
        }, 1000)
    }

    return (
        <div>
            <div className={`numbers ${showNumbers ? "show" : ""} ${isFading ? "fade" : ""}`}>
                {showNumbers &&
                    numbers.map((num:number, index:number) => (
                        <span key={index} className="number" style={{backgroundColor: getBallColor(num)}}>
                            {num}
                        </span>))}
            </div>
            <div>
                <button className={`reroll-btn ${showNumbers ? "show" : ""}`} onClick={isReroll} disabled={isButtonDisabled}>다시 돌리실래요?</button>
            </div>
            <div>
                <a className={`link-text ${showNumbers ? "show" : ""}`} href="/expert">혹시 100번을 한번에 돌려보고 싶으신가요? →</a>
            </div>

        </div>
    );
};

export default RandomNumbers
