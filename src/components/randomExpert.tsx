import useNumberStore from "../store/useNumberStore.js";
import FrequencyCharts from "./FrequencyCharts";
import React, {useState, useEffect, useRef} from "react";
import {BeatLoader} from 'react-spinners'

const RandomExpert = () => {

    const { showNumbersH, mostFrequency, hundredTriedNumbers, visibleCount, getBallColor, showHundredTriedNumbers, increaseVisibleCount, allResults } = useNumberStore()
    const [isFading, setIsFading] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const loaderRef = useRef<any>(null)
    const {frequencyMap} = useNumberStore()

    const isHundredReroll = () => {
        setIsFading(true)
        setIsButtonDisabled(true)
        setIsLoading(true)

        setTimeout(() => {
            showHundredTriedNumbers()
            setIsFading(false)
            setIsLoading(false)
        }, 500)

        //버튼 시간 수정
        setTimeout(()=>{
            setIsButtonDisabled(false)
        }, 1000)
    }

    //무한 스크롤
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    increaseVisibleCount()
                }
            },
            { rootMargin: '100px' }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current)
            }
        };
    }, [])

    return (
        <div>
            <div>
                <button className={`reroll-btn show`} onClick={isHundredReroll} disabled={isButtonDisabled}>10000번을 돌리고 평균을 보실래요?</button>
            </div>
            <div style={{minHeight: '16px'}}>
                {isLoading && (
                    <div className={"loader"}>
                        <BeatLoader size={12} />
                    </div>
                )}
            </div>
            <div className="result-container">
                <ul className={"result-list-outside"}>
                    <h3 className={`numbers ${showNumbersH ? "show" : ""} ${isFading ? "fade" : ""}`}>숫자 리스트</h3>
                    <div className={`numbers numbers-list result-list ${showNumbersH ? "show" : ""} ${isFading ? "fade" : ""}`}>
                        {showNumbersH &&
                            allResults.slice(0, visibleCount).map((numbers: number[], rowIndex: number) => (
                                <div key={rowIndex} className="numbers-row">
                                    {numbers.map((num: number, index: number) => (
                                        <span key={index} className="number-hundred" style={{backgroundColor: getBallColor(num)}}>
                                    {num}
                                </span>))}
                                </div>
                            ))}
                        <div ref={loaderRef} style={{ height: "1px" }}></div>
                    </div>
                </ul>
                <div className={`result-chart ${showNumbersH ? "show" : ""} ${isFading ? "fade" : ""}`}>
                    {showNumbersH && <FrequencyCharts frequencyMap={frequencyMap} />}
                </div>
            </div>
            <div className={"need-margin"}>
                <a className={`link-text ${showNumbersH ? "show" : ""} ${isFading ? "fade" : ""}`} >10000번 돌려서 가장 많이 나온 수는</a>
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
