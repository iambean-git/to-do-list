import Image from "next/image";
export default function Checklist({ done, content }: { done: boolean, content: string }) {
  return (
    <div className={`w-full h-[50px] border rounded-[27px] shadow-slate flex items-center px-3
                    ${done ? "bg-violet-100" : "bg-white "}`}>
      <button>
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
      <span className="ml-4">{content}</span>
    </div>
  )
}
