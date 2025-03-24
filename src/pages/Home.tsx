import { useEffect } from "react"
import './Home.css'
import useNumberStore from "../store/useNumberStore.js"
import RandomNumbers from "../components/randomNumber.js";
import logo from "../assets/logo.png"


const Home = () => {
    const { moveUp, triggerMove, showRandomNumbers } = useNumberStore()

    //글자 올라가고 숫자 표기
    useEffect(() => {
        setTimeout(triggerMove, 1000)
        setTimeout(showRandomNumbers, 2000)
    }, [triggerMove, showRandomNumbers])

    return (
        <div>
            <div>
                <img src={logo} className={`text ${moveUp ? "move-up" : ""}`} alt="Logo" />
                <RandomNumbers />
            </div>
        </div>
    )
}

export default Home