'use client'
import Image from "next/image";
import Checklist from "./ui/checklist";
import { AddButton } from "./ui/buttons";
import { useState } from "react";
export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  // 입력 값이 변경될 때마다 버튼 활성화 여부를 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setBtnDisabled(value.trim() === '');  // 입력 값이 없으면 버튼 비활성화
  };

  const handleLogoClick = () => {
    // 페이지 새로고침
    window.location.reload();
  };
  return (
    <div className="w-full flex flex-col items-center">
      <header className="h-[60px] w-full border-b border-b-slate-200 flex justify-center">
        <div className="w-full h-full max-w-[1200px]  flex items-center">
          <button onClick={handleLogoClick}>
            <Image
              src="/images/logo/Large.svg"  // 기본 이미지 (PC 화면에서 사용)
              alt="Logo"
              width={151}  // 이미지 너비
              height={40}  // 이미지 높이
              className="hidden md:block"
            />
            <Image
              src="/images/logo/Small.svg"  // 기본 이미지 (PC 화면에서 사용)
              alt="Logo"
              width={71}  // 이미지 너비
              height={40}  // 이미지 높이
              className="md:hidden"
            />
          </button>
        </div>
      </header>
      <main className="w-full bg-red-50 max-w-[1200px] p-6 flex flex-col ">
        <div className="w-full gap-x-2 md:gap-x-4  flex">
          <input
            className="grow h-14 bg-slate-100 border-2 px-6 text-lg"
            placeholder="할 일을 입력해주세요"
            value={inputValue}
            onChange={handleInputChange}
          />
          <AddButton disabled={btnDisabled} />
        </div>
        <Checklist done={false} content="비타민 챙겨 먹기" />
        <Checklist done={true} content="비타민 챙겨 먹기" />
      </main>
    </div>
  );
}
