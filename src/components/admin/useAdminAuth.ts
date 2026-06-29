"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) throw new Error("unauthorized");
        if (!r.ok) throw new Error("server");
        setReady(true);
      })
      .catch((err) => {
        if (err instanceof Error && err.message === "unauthorized") {
          router.push("/admin/login");
        }
      });
  }, [router]);

  return ready;
}
