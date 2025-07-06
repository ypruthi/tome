import { useEffect, useState } from "react";
import { useOsdkClient } from "@osdk/react";
import { B2aCourses } from "@tome/sdk";
import type { Osdk } from "@osdk/client";

export function useCourses() {
  const client = useOsdkClient();
  const [courses, setCourses] = useState<
    Osdk.Instance<typeof B2aCourses>[]
  >([]);

  useEffect(() => {
    (async () => {
      const page = await client(B2aCourses).fetchPage({ $pageSize: 100 });
      setCourses(page.data);
    })();
  }, [client]);

  return courses;
}
