import { useEffect, useState } from "react";
import { useOsdkClient } from "@osdk/react";
import { B2aDeliverables } from "@tome/sdk";
import type { Osdk, PageResult } from "@osdk/client";

export default function DeliverableList() {
  const client = useOsdkClient();
  const [rows, setRows] = useState<Osdk.Instance<typeof B2aDeliverables>[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const page: PageResult<
          Osdk.Instance<typeof B2aDeliverables>
        > = await client(B2aDeliverables).fetchPage({
          $orderBy: { dueDate: "asc" },
          $pageSize: 100,
        });
        setRows(page.data);
      } catch (e: any) {
        setErr(e.message ?? "query failed");
      }
    })();
  }, [client]);

  if (err) return <p style={{ color: "red" }}>Error: {err}</p>;

  return (
    <section>
      <h2>All Deliverables ({rows.length})</h2>
      <ul>
        {rows.map((d) => {
          const rid = d.deliverableId;                      
          const when = d.dueDate
            ? new Date(d.dueDate).toLocaleDateString()   
            : "TBD";

          return (
            <li key={rid}>
              <strong>{d.title}</strong> — due {when} ·{" "}
              {d.status ?? "unknown"}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
