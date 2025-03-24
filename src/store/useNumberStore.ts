import { create } from "zustand"

interface NumberStore {
    moveUp: boolean
    showNumbers: boolean
    showNumbersH: boolean
    numbers: number[]
    hundredTriedNumbers: number[][]
    triggerMove: () => void
    showRandomNumbers: () => void
    showHundredTriedNumbers: () => void
    getBallColor: (num: number) => string
    generateRandomNumbers: ()=> number[]
}

//랜덤 숫자 관련
const useNumberStore = create<NumberStore>((set) => ({
    moveUp: false,
    showNumbers: false,
    showNumbersH: false,
    numbers: [],
    hundredTriedNumbers: [],
    triggerMove: () => set({ moveUp: true }),

    //랜덤숫자 6개 뽑기
    generateRandomNumbers: () => {
        let numbers = new Set<number>()
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1)
        }
        return Array.from(numbers).sort((a:number, b:number) => a - b)
    },
    
    //1번 뽑기
    showRandomNumbers: () => {
        const numbers = useNumberStore.getState().generateRandomNumbers()
        set({ showNumbers: true, numbers: Array.from(numbers) })
    },
    
    //100번 반복하기
    showHundredTriedNumbers: () => {
        const results: number[][] = []
        for (let i = 0; i < 100; i++) {
            const numbers = useNumberStore.getState().generateRandomNumbers()
            results.push(numbers)
        }

        set({ showNumbers: true, showNumbersH: true, hundredTriedNumbers: results })
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