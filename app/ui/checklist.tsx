export default function Checklist({done, content} : {done : boolean, content : string}) {
  return (
    <div className={`w-full h-[50px] border rounded-[27px] shadow-slate
                    ${done ? "bg-violet-100" : "bg-white "}`}>
      {content}
    </div>
  )
}
