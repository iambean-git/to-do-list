"use client";

import { Item } from "@/app/lib/definitions";
import { useState } from "react";

import ChecklistDetail from "@/app/ui/checklistdetail";
import { DeleteButton } from "../buttons";
export default function ChecklistDetailPage({ data }: { data: Item}) {
    const [memo, setMemo] = useState(data.memo || "");

    return (
        <div className="w-full max-w-[996px] flex flex-col gap-y-4 md:gap-y-6">
            <ChecklistDetail itemName={data.name} done={data.isCompleted} />
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                {/* 이미지 */}
                <div className="h-[310px] w-full md:w-96 rounded-3xl bg-slate-50 border-2 border-slate-300 border-dashed">
                    사진
                </div>

                {/* 메모 */}
                <div className="h-[310px] md:grow p-6 rounded-3xl bg-[url('/images/memo.svg')] bg-cover bg-center flex flex-col">
                    <div className="w-full text-center font-extrabold text-amber-800 mb-6">Memo</div>
                    <textarea 
                        className="w-full grow text-center align-middle overflow-y-auto"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <DeleteButton handleClick={()=>{}} />
        </div>
    );
}
