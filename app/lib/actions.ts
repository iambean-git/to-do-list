'use server'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
/** to-do-list 불러와서 완료/미완료 분리해서 리턴 */
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

/** to-do-list 추가하기 (POST) */
export async function postTodo(name: string) {
    const url = "https://assignment-todolist-api.vercel.app/api/joeunbean/items";
    const data = { name: name };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return { success: false, error: `서버 오류: ${response.status}` };
        }

        revalidatePath('/');    // 최신 데이터 표시
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : '알 수 없는 오류 발생' 
        };
    }
}
/** 
 * to-do-list 완료 여부 수정 (PATCH) 
 * 입력1 : id (number),
 * 입력2 : prevCompleted (boolean)
*/
export async function patchCompleted(id: number, prevCompleted:boolean){
    const url = `https://assignment-todolist-api.vercel.app/api/joeunbean/items/${id}`;
    const data = {isCompleted : !prevCompleted};

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return { success: false, error: `서버 오류: ${response.status}` };
        }

        revalidatePath('/');    // 최신 데이터 표시
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : '알 수 없는 오류 발생' 
        };
    }
}