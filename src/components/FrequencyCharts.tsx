import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell} from 'recharts';
import React from 'react';
import useNumberStore from "../store/useNumberStore";

type FrequencyChartProps = {
    frequencyMap: Map<number, number>
}

const FrequencyCharts = ({ frequencyMap }: FrequencyChartProps) => {
    const {mostFrequency, minFrequency} = useNumberStore()

    const data = Array.from({ length: 45 }, (_, i) => ({
        number: i + 1,
        count: frequencyMap.get(i + 1) || 0
    }));

    //나중에 YAxis 도메인값 비례로 바꾸기
    return (
        <div style={{width: '100%', height: 300, marginTop: '5rem', marginBottom: '5rem'}}>
            <h3>등장 횟수 통계</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="number" textAnchor="end" tick={{ fontSize: 7 }}
                           ticks={[1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45]}
                           label={{ value: '번호', position: 'insideBottomRight', offset: -1}} />
                    <YAxis domain={[minFrequency - 500, 'dataMax + 500']} tick={{ fontSize: 9 }} label={{ value: '등장 횟수', angle: -90, position: 'insideLeft', offset: 2}} />
                    <Tooltip contentStyle={{ fontSize: '12px' }} formatter={(value: number, name: string) => [`${value}회 등장`, '등장 횟수']} />
                    <Bar dataKey="count" fill="#8884d8">
                        {
                            //가장 높은 숫자 6개는 색 다르게 칠하기
                            data.map((count, index:number) => {
                                const isTop: boolean = mostFrequency.includes(count.number)
                                return (<Cell key={`cell-${index}`} fill={isTop ? 'rgba(255,107,107,0.8)' : '#8884d8'}/>)
                            })
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FrequencyCharts