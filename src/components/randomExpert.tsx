import useNumberStore from "../store/useNumberStore.js";
import React, {useState} from "react";

const RandomExpert = () => {

    const { showNumbersH, mostFrequency, hundredTriedNumbers, getBallColor, showHundredTriedNumbers } = useNumberStore()
    const [isFading, setIsFading] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)

    const isHundredReroll = () => {
        setIsFading(true)
        setIsButtonDisabled(true)

        setTimeout(() => {
            showHundredTriedNumbers()
            setIsFading(false)
        }, 500)

        //버튼 시간 수정
        setTimeout(()=>{
            setIsButtonDisabled(false)
        }, 1000)
    }

    return (
        <div>
            <div>
                <button className={`reroll-btn show`} onClick={isHundredReroll} disabled={isButtonDisabled}>100번을 돌리고 평균을 보실래요?</button>
            </div>
            <div className={`numbers numbers-list ${showNumbersH ? "show" : ""} ${isFading ? "fade" : ""}`}>
                {showNumbersH &&
                    hundredTriedNumbers.map((numbers: number[], rowIndex: number) => (
                        <div key={rowIndex} className="numbers-row">
                            {numbers.map((num: number, index: number) => (
                                <span key={index} className="number-hundred" style={{backgroundColor: getBallColor(num)}}>
                                    {num}
                                </span>))}
                        </div>
                    ))}
            </div>
            <div className={"need-margin"}>
                <a className={`link-text ${showNumbersH ? "show" : ""}`} >100번 돌려서 가장 많이 나온 수는</a>
            </div>
            <div className={`numbers ${showNumbersH ? "show" : ""} ${isFading ? "fade" : ""}`}>
                {showNumbersH &&
                    mostFrequency.map((num:number, index:number) => (
                        <span key={index} className="number" style={{backgroundColor: getBallColor(num)}}>
                            {num}
                        </span>))}
            </div>
        </div>
    );
};

export default RandomExpert
