'use client'
import { useState } from "react";
import Button from "../buttons";
import { postTodo } from "@/app/lib/actions";
export default function InputTodo() {
    const [inputValue, setInputValue] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);

    // 입력 값이 변경될 때마다 버튼 활성화 여부를 업데이트
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setBtnDisabled(value.trim() === '');  // 입력 값이 없으면 버튼 비활성화
    };

    const addTodo = async () => {
        // 입력값이 비어있으면 실행하지 않음
        if (inputValue.trim() === '') return;

        const result = await postTodo(inputValue);

        if (result.success) {
            // 성공 시 input 비우기
            setInputValue('');
            setBtnDisabled(true);
        } else {
            // 실패 시
            alert(result.error || '할 일 추가에 실패했습니다.');
        }
    }

    // 엔터키 입력 처리
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Enter 키를 눌렀을 때 addTodo 실행
        if (e.key === 'Enter') {
            addTodo();
        }
    }

    return (
        <div className="w-full gap-x-2 md:gap-x-4  flex">
            <input
                className="grow h-14 bg-slate-100 border-2 px-6 text-lg"
                placeholder="할 일을 입력해주세요"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <Button isDisabled={btnDisabled} onClickEvent={addTodo} type="add" />
        </div>
    )
}
