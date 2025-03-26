'use client'
import React, { ChangeEvent, useState } from 'react';
import ChecklistBtn from './checklistbtn';

export default function ChecklistDetail({ done, itemName }: { done: boolean, itemName: string }) {
    const [newItemValue, setNewItemValue] = useState(itemName); // itemName을 상태로 관리
    const [isCompleted, setIsComplted] = useState(done);
    const handleClick = () => {setIsComplted(!isCompleted);}

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewItemValue(event.target.value); // input 값이 변경될 때마다 상태 업데이트
        console.log(event.target.value); // 변경된 값 콘솔에 출력
    }

    return (
        <div className={`w-full h-16 rounded-3xl border-2 gap-x-4 border-slate-900 text-xl flex justify-center items-center
        ${isCompleted? "bg-violet-200" : "bg-white"}
        `}>
            <ChecklistBtn done={isCompleted} handleClick={handleClick} />
            <input
                className='text-xl focus:outline-none !rounded-none text-center underline'
                value={newItemValue} // 상태 값으로 설정
                onChange={handleChange} // 상태 업데이트 함수 연결
            />
        </div>
    )
}
