import { getDatabase } from "@/utils/database";
import type { HistorySection } from "@/types/about";
import HistoryList from "./history-list";

// AboutHistory
export default async function AboutHistory() {
  try {
    const db = await getDatabase("mydata");
    const history = await db
      .collection<HistorySection>("history")
      .find()
      .toArray();

    const historyData = history.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
    return <HistoryList history={historyData} />;
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return <HistoryError />;
  }
}

// HistoryError
function HistoryError() {
  return (
    <div className="text-center py-10">
      <p className="text-red-500 font-semibold">
        히스토리를 불러오는데 실패했습니다.
      </p>
      <p className="text-sm text-foreground/60 mt-2">
        잠시 후 다시 시도해주세요.
      </p>
    </div>
  );
}
