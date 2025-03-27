import { fethcTodoItem } from "@/app/lib/actions";
import ChecklistDetailPage from "@/app/ui/items/ChecklistDetailPage";

interface PageProps {
    params: {
      itemId: string;
    };
  }

export default async function Page({ params }: PageProps) {
    const { itemId } = await params;
    const data = await fethcTodoItem(itemId);
    // console.log("data :", data);
    return <ChecklistDetailPage data={data} />;
}