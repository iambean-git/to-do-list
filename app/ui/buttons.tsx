import { PiPlusBold } from "react-icons/pi";
import clsx from "clsx";

interface btnType {
    isDisabled: boolean,
    onClickEvent: () => void
    type: "add" | "delete" | "modify"
}

export default function Button({ isDisabled, onClickEvent, type }: btnType) {
    const btnStyle = clsx(
        "h-14 border-2 border-slate-900 flex justify-center items-center rounded-3xl disabled:bg-slate-200 ",
        {
            "w-14 md:w-[168px] bg-violet-600 text-white disabled:text-slate-900": type === "add",
            "w-[168px] bg-rose-500 text-white": type === "delete",
            "w-[168px] bg-lime-300 text-slate-900": type === "modify",
        }
    );

    const titleStyle = clsx(
        "ml-1.5",
        {
            "hidden md:block": type === "add"
        }
    )

    return (
        <button className={btnStyle}
            onClick={onClickEvent}
            disabled={isDisabled}
        >

            {
                type === "add" ? <PiPlusBold /> :
                    <img src={
                        type === "delete" ? "/images/icons/X.svg" :
                            type === "modify" ? "/images/icons/check.svg" : ""
                    }
                        alt="btn icon"
                    />
            }

            <span className={titleStyle}>{
                type === "add" ? "추가하기" :
                    type === "delete" ? "삭제하기" :
                        type === "modify" ? "수정하기" : ""
            }</span>

        </button>
    )
}