import { useEffect, useState } from "react";
import { useOsdkClient } from "@osdk/react";
import { B2aDeliverables } from "@tome/sdk";
import type { Osdk, PageResult } from "@osdk/client";

export function useDeliverables() {
  const client = useOsdkClient();
  const [rows, setRows] = useState<
    Osdk.Instance<typeof B2aDeliverables>[]
  >([]);

  useEffect(() => {
    (async () => {
      const page: PageResult<
        Osdk.Instance<typeof B2aDeliverables>
      > = await client(B2aDeliverables).fetchPage({
        $orderBy: { dueDate: "asc" },
        $pageSize: 500,
      });
      setRows(page.data);
    })();
  }, [client]);

  return rows;
}
