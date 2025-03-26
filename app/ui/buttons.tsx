import { PiPlusBold } from "react-icons/pi";

export function AddButton(
    { disabled, handleClick }:
        {
            disabled: boolean,
            handleClick : () => void
        }) {
    return (
        <button
            className="w-14 md:w-[168px] h-14 rounded-3xl bg-violet-600 disabled:bg-slate-200 
                            border-2 border-slate-900 flex justify-center items-center text-white disabled:text-slate-900"
            disabled={disabled}
            onClick={handleClick}
        >
            <PiPlusBold />
            <span className="ml-0.5 hidden md:block">
                추가하기
            </span>
        </button>
    )
}

