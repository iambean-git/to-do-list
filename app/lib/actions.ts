'use server'
import { revalidatePath } from 'next/cache';
import { ModifyItem } from './definitions';
/** to-do-list 불러와서 완료/미완료 분리해서 리턴 */
export async function fetchTodo() {
    const url = `${process.env.SERVER_URL}/items?page=1&pageSize=10`;
    const resp = await fetch(url);
    const data = await resp.json();
    // console.log("✅fetchTodo resp : ", data);

    // isCompleted 기준으로 분류
    const completedList = data.filter((item: { isCompleted: boolean }) => item.isCompleted);
    const todoList = data.filter((item: { isCompleted: boolean }) => !item.isCompleted);

    return { todoList, completedList };
}

export async function fethcTodoItem(itemId: string) {
    const url = `${process.env.SERVER_URL}/items/${itemId}`;
    const resp = await fetch(url);
    const data = await resp.json();

    return data;
}

/** to-do-list 추가하기 (POST) */
export async function postTodo(name: string) {
    const url = `${process.env.SERVER_URL}/items`;
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
export async function patchCompleted(id: number, prevCompleted: boolean) {
    const url = `${process.env.SERVER_URL}/items/${id}`;
    const data = { isCompleted: !prevCompleted };

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

/** 삭제하기 */
export async function deleteTodo(id: number) {
    const url = `${process.env.SERVER_URL}/items/${id}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        if (!response.ok) {
            return { success: false, error: `서버 오류 (Delete): ${response.status}` };
        }
        const data = await response.json();
        if (data.message === "Item successfully deleted") {
            revalidatePath("/");
            return { success: true };
        }

    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Delete 알 수 없는 오류 발생'
        };
    }
}

/** 수정하기 */
export async function modifyTodo({ id, modifiedItem }: { id: number, modifiedItem: ModifyItem }) {
    const url = `${process.env.SERVER_URL}/items/${id}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(modifiedItem),
        });

        if (!response.ok) {
            return { success: false, error: `서버 오류: ${response.status}` };
        }

        revalidatePath('/');    // 최신 데이터 표시
        console.log("수정 성공");
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : '알 수 없는 오류 발생'
        };
    }

}

/** 이미지 업로드해서 url 가져오기 */
export async function uploadImg(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const url = `${process.env.SERVER_URL}/images/upload`;
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("이미지 업로드 실패");
        }   

        const data = await response.json();
        return data.url;
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : '알 수 없는 오류 발생'
        };
    }
}