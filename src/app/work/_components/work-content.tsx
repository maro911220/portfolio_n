import { getDatabase } from "@/utils/database";
import WorkList from "@/components/ui/work-list";
import type { WorkData } from "@/types/work";

// WorkContent
export default async function WorkContent() {
  try {
    const db = await getDatabase("mydata");
    const works = await db.collection<WorkData>("work").find().toArray();

    const workData = works.map((work) => {
      return {
        ...work,
        _id: work._id.toString(),
      };
    });

    return <WorkList workData={workData} useFilter />;
  } catch (error) {
    console.error("Failed to fetch works:", error);
    return <WorkError />;
  }
}

// WorkError
function WorkError() {
  return (
    <div className="text-center py-10">
      <p className="text-red-500 font-semibold">
        작업 목록을 불러오는데 실패했습니다.
      </p>
      <p className="text-sm text-foreground/60 mt-2">
        잠시 후 다시 시도해주세요.
      </p>
    </div>
  );
}
