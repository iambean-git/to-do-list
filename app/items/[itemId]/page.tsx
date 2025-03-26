import { fethcTodoItem } from "@/app/lib/actions";
export default async function page({ params }: { params: { itemId: string } }) {
    const { itemId } = await params;
    const data = await fethcTodoItem(itemId);
    // console.log("data : ", data);
    return (
        <div>
            상세 페이지: {data.id}
        </div>
    )
}
