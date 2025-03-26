import Image from "next/image";
export default function ChecklistBtn({done, handleClick} : {done:boolean, handleClick:()=>void}) {
    return (
        <button onClick={handleClick}>
            {
                done ?
                    <Image
                        src="/images/icons/check_completed.svg"
                        alt="chekced"
                        width={32}  // 이미지 너비
                        height={32}  // 이미지 높이
                    />
                    :
                    <Image
                        src="/images/icons/check_default.svg"
                        alt="unchecked"
                        width={32}  // 이미지 너비
                        height={32}  // 이미지 높이
                    />
            }
        </button>
    )
}
