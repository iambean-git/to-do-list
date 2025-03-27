import { fethcTodoItem } from "@/app/lib/actions";
import ChecklistDetailPage from "@/app/ui/items/ChecklistDetailPage";

type PageParams = Promise<{ itemId: string }>;

export default async function Page({ params }: {params : PageParams}) {
    const { itemId } = await params;
    const data = await fethcTodoItem(itemId);
    // console.log("data :", data);
    return <ChecklistDetailPage data={data} />;
}