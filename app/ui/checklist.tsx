'use client'
import Link from "next/link";
import { patchCompleted } from "../lib/actions";
import ChecklistBtn from "./checklistbtn";
export default function Checklist({ id, done, content }: { id: number, done: boolean, content: string }) {

  const handleClick = async () => {
    const result = await patchCompleted(id, done);
  }

  return (

    <div className={`w-full h-[50px] border rounded-[27px] shadow-slate flex items-center px-3
                    ${done ? "bg-violet-100" : "bg-white "}`}
    >
      <ChecklistBtn done={done} handleClick={handleClick} />
      <Link className="grow mx-4"
        href={`items/${id}`}
      >
        {content}
      </Link>
    </div>
  )
}
