
'use client'
import Image from "next/image";
export default function Header() {
    const handleLogoClick = () => {
        // 페이지 새로고침
        window.location.reload();
    };
    return (
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
    )
}
