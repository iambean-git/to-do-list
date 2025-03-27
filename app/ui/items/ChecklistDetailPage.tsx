"use client";
import Image from 'next/image';
import { Item, ModifyItem } from "@/app/lib/definitions";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // useRouter 추가
import clsx from "clsx";
import ChecklistDetail from "@/app/ui/checklistdetail";
import Button, { ImageBtn } from "../buttons";
import { deleteTodo, modifyTodo, uploadImg } from "@/app/lib/actions";
export default function ChecklistDetailPage({ data }: { data: Item }) {
    const router = useRouter(); // useRouter 초기화
    const [name, setName] = useState(data.name || "");
    const [memo, setMemo] = useState(data.memo || "");
    const [imgUrl, setImgUrl] = useState(data.imageUrl || "");
    const [isCompleted, setIsCompleted] = useState(data.isCompleted);

    // 초기값을 저장하는 상태 변수들
    const [initialName] = useState(data.name || "");
    const [initialMemo] = useState(data.memo || "");
    const [initialImgUrl] = useState(data.imageUrl || "");
    const [initialIsCompleted] = useState(data.isCompleted);

    // 수정하기 버튼 활성화 조건
    const isModifyDisabled = name === initialName && memo === initialMemo && imgUrl === initialImgUrl && isCompleted === initialIsCompleted;

    // 삭제 버튼 클릭
    const handleDeleteClick = async () => {
        const result = await deleteTodo(data.id);
        if (result?.success !== false) { // 삭제가 성공했을 때만 이동
            router.replace("/"); // "/"로 이동하고 뒤로 가기 불가능
        }
    }

    //수정 버튼 클릭
    const handleModifyClick = async () => {
        const modifyData: ModifyItem = {
            name: name,
            memo: memo,
            imageUrl: imgUrl,
            isCompleted: isCompleted
        };
        const result = await modifyTodo({ id: data.id, modifiedItem: modifyData });
        if (result.success) {
            router.replace("/"); // "/"로 이동하고 뒤로 가기 불가능
        } else { console.error(result.error); }
    }

    // useRef를 사용하여 input 요소에 접근
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    //이미지 입력 처리
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // 선택된 파일을 가져옴

        if (file) {
            // 파일 이름이 영어인지 확인 (정규 표현식으로 알파벳과 숫자만 허용)
            const fileNameRegex = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/;
            if (!fileNameRegex.test(file.name)) {
                alert("파일 이름은 영어만 포함해야 합니다.");
                return;
            }

            // 파일 크기가 50MB 이하인지 확인
            const maxSizeInBytes = 50 * 1024 * 1024; // 50MB
            if (file.size > maxSizeInBytes) {
                alert("파일 크기는 50MB 이하이어야 합니다.");
                return;
            }

            console.log("파일 url 가져오기");
            uploadImage(file);
        }
    };

    const uploadImage = async (file: File) => {
        const url = await uploadImg(file);
        setImgUrl(url);
    }

    return (
        <div className="w-full max-w-[996px] flex flex-col gap-y-4 md:gap-y-6 font-bold">
            <ChecklistDetail itemName={name} done={isCompleted} setName={setName} setIsCompleted={setIsCompleted} />
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* 이미지 */}
                <div
                    className={clsx(
                        "h-[310px] w-full lg:w-96 rounded-3xl flex justify-end items-end p-4",
                        {
                            "bg-slate-50 border-2 border-slate-300 border-dashed": !imgUrl, // imgUrl이 없으면 기본 스타일
                            "bg-cover bg-center" : imgUrl
                        }
                    )}
                    style={{ backgroundImage: imgUrl ? `url(${imgUrl})` : undefined }}
                >
                    <ImageBtn isNew={!imgUrl} onClickEvent={() => document.getElementById('imageInput')?.click()} />
                </div>
                {/* 이미지 입력 (숨김) */}
                <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }} // input은 숨겨두고 버튼으로 트리거
                />

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

            {/* 버튼 */}
            <div className="w-full flex justify-center gap-2 sm:gap-x-4 lg:justify-end">
                <Button isDisabled={false} onClickEvent={handleDeleteClick} type="delete" />
                <Button isDisabled={isModifyDisabled} onClickEvent={handleModifyClick} type="modify" />
            </div>
        </div>
    );
}
