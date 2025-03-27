'use client'
import React, { ChangeEvent, useState } from 'react';
import ChecklistBtn from './checklistbtn';

interface detailPropsType {
    done : boolean,
    itemName : string,
    setName : (str:string) => void
    setIsCompleted : (bool:boolean) => void
}

export default function ChecklistDetail({ done, itemName, setName, setIsCompleted }: detailPropsType) {
    const handleClick = () => {setIsCompleted(!done);}

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value); // input 값이 변경될 때마다 상태 업데이트
    }

    return (
        <div className={`w-full h-16 rounded-3xl border-2 gap-x-4 border-slate-900 text-xl flex justify-center items-center
        ${done? "bg-violet-200" : "bg-white"}
        `}>
            <ChecklistBtn done={done} handleClick={handleClick} />
            <input
                className='text-xl focus:outline-none !rounded-none text-center underline'
                value={itemName} // 상태 값으로 설정
                onChange={handleChange} // 상태 업데이트 함수 연결
            />
        </div>
    )
}
