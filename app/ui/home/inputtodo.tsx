'use client'
import { useState } from "react";
import { AddButton } from "../buttons";
export default function InputTodo() {
    const [inputValue, setInputValue] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    // 입력 값이 변경될 때마다 버튼 활성화 여부를 업데이트
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setBtnDisabled(value.trim() === '');  // 입력 값이 없으면 버튼 비활성화
    };
    return (
        <div className="w-full gap-x-2 md:gap-x-4  flex">
            <input
                className="grow h-14 bg-slate-100 border-2 px-6 text-lg"
                placeholder="할 일을 입력해주세요"
                value={inputValue}
                onChange={handleInputChange}
            />
            <AddButton disabled={btnDisabled} />
        </div>
    )
}
