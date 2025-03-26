
export async function fetchTodo() {
    const url = "https://assignment-todolist-api.vercel.app/api/joeunbean/items?page=1&pageSize=10";
    const resp = await fetch(url);
    const data = await resp.json();
    // console.log("✅fetchTodo resp : ", data);
    
    // isCompleted 기준으로 분류
    const completedList = data.filter((item: { isCompleted: boolean }) => item.isCompleted);
    const todoList = data.filter((item: { isCompleted: boolean }) => !item.isCompleted);

    return { todoList, completedList };
}
