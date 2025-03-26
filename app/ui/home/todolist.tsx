import Image from "next/image";
import { fetchTodo } from "@/app/lib/actions";
import Checklist from "../checklist";
import { Item } from "@/app/lib/definitions";
export default async function ToDoList() {

    const { todoList, completedList }: { todoList: Item[]; completedList: Item[] } = await fetchTodo();
    return (
        <div className="w-full mt-10 grid grid-rows-2 gap-12 md:grid-cols-2 md:gap-6">
            <div className="flex flex-col gap-y-4">
                <Image
                    src="/images/icons/todo.svg"
                    alt="Logo"
                    width={101}  // 이미지 너비
                    height={36}  // 이미지 높이
                />

                {
                    todoList.length ?
                        todoList.map((todo) =>
                            <Checklist
                                key={todo.id} id={todo.id}
                                done={todo.isCompleted}
                                content={todo.id + todo.name}
                            />
                        )
                        :
                        <div className="w-full flex flex-col items-center">
                            <Image
                                src="/images/empty/todo_large.svg"
                                alt="Logo"
                                width={240}  // 이미지 너비
                                height={240}  // 이미지 높이
                                className="md:block hidden"
                            />
                            <Image
                                src="/images/empty/todo_small.svg"
                                alt="Logo"
                                width={120}  // 이미지 너비
                                height={120}  // 이미지 높이
                                className="md:hidden"
                            />
                            <div className="font-bold flex flex-col items-center text-slate-400">
                                <span>할 일이 없어요.</span>
                                <span>TODO를 새롭게 추가해주세요!</span>
                            </div>

                        </div>
                }

            </div>

            <div className="flex flex-col gap-y-4">
                <Image
                    src="/images/icons/done.svg"
                    alt="Logo"
                    width={97}  // 이미지 너비
                    height={36}  // 이미지 높이
                />
                {
                    completedList.length ?
                        completedList.map((todo) =>
                            <Checklist
                                key={todo.id} id={todo.id}
                                done={todo.isCompleted}
                                content={todo.id + todo.name}
                            />
                        )
                        :
                        <div className="w-full flex flex-col items-center">
                            <Image
                                src="/images/empty/done_large.svg"
                                alt="Logo"
                                width={240}  // 이미지 너비
                                height={240}  // 이미지 높이
                                className="md:block hidden"
                            />
                            <Image
                                src="/images/empty/done_small.svg"
                                alt="Logo"
                                width={120}  // 이미지 너비
                                height={120}  // 이미지 높이
                                className="md:hidden"
                            />
                            <div className="font-bold flex flex-col items-center text-slate-400">
                                <span>아직 다 한 일이 없어요.</span>
                                <span>해야 할 일을 체크해보세요!</span>
                            </div>

                        </div>
                }
            </div>
        </div>
    )
}
