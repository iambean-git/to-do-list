import Header from "./ui/home/header";
import InputTodo from "./ui/home/inputtodo";
import Checklist from "./ui/checklist";
import ToDoList from "./ui/home/todolist";
export default function Home() {

  // const { todoList, completedList } = await fetchTodo();

  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <main className="w-full max-w-[1200px] p-4 md:p-6 flex flex-col ">
        {/* 서치바 영역 */}
        <InputTodo />
        
        {/* to-do-list 영역 */}
        <ToDoList />

      </main>
    </div>
  );
}
