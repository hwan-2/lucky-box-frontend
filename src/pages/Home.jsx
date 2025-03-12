import { useEffect } from "react"
import './Home.css'
import useNumberStore from "../store/useNumberStore.js"
import RandomNumbers from "../components/randomNumber.jsx";


const Home = () => {
    const { moveUp, triggerMove, showRandomNumbers } = useNumberStore()

    //글자 올라가고 숫자 표기
    useEffect(() => {
        setTimeout(triggerMove, 2000)
        setTimeout(showRandomNumbers, 3000)
    }, [])

    return (
        <div>
            <div className="container">
                <h1 className={`text ${moveUp ? "move-up" : ""}`}>안전한 놀이터</h1>
                <RandomNumbers />
            </div>
        </div>
    )
}

export default Home