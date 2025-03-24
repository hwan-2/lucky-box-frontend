import { create } from "zustand"

interface NumberStore {
    moveUp: boolean
    showNumbers: boolean
    showNumbersH: boolean
    numbers: number[]
    hundredTriedNumbers: number[][]
    mostFrequency: number[]
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
    mostFrequency: [],

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
        const frequencyMap = new Map<number, number>()

        for (let i = 0; i < 100; i++) {
            const numbers:number[] = useNumberStore.getState().generateRandomNumbers()
            results.push(numbers)

            //평균을 내기 위한 빈도 저장
            numbers.forEach(num => {
                frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1)
            })
        }

        //가장 높은 6개 추출
        const mostFrequencyNumbers:number[] = [...frequencyMap.entries()]
            .sort((a:[number, number], b:[number, number]) => b[1] - a[1]) //내림차순 분류
            .slice(0, 6) // 가장높은 6개 자르기
            .map(entry => entry[0])
            .sort((a:number, b:number) => a - b) // 보기좋게 오름차순 분류

        set({ showNumbersH: true, hundredTriedNumbers: results, mostFrequency: mostFrequencyNumbers })
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