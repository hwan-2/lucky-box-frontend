import { create } from "zustand"

//랜덤 숫자 관련
const useNumberStore = create((set) => ({
    moveUp: false,
    showNumbers: false,
    numbers: [],
    triggerMove: () => set({ moveUp: true }),
    
    //랜덤숫자 6개 뽑기
    showRandomNumbers: () => {
        let numbers = new Set()
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1)
        }
        //오름차순 정렬
        const sortNumbers = Array.from(numbers).sort((a,b) => a-b)
        set({ showNumbers: true, numbers: Array.from(sortNumbers) })
    },

    //공 색
    getBallColor: (num) => {
        if (num <= 9) return "#fbc400"
        if (num <= 19) return "#69c8f2"
        if (num <= 29) return "#ff7272"
        if (num <= 39) return "#aaaaaa"
        return "#b0d840"
    }
}))

export default useNumberStore;