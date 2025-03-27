import { fethcTodoItem } from "@/app/lib/actions";
import ChecklistDetailPage from "@/app/ui/items/ChecklistDetailPage";

export default async function Page({ params }: { params: { itemId: string } }) {
    const { itemId } = await params;
    const data = await fethcTodoItem(itemId);
    // console.log("data :", data);
    return <ChecklistDetailPage data={data} />;
}