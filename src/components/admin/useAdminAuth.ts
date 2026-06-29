"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => {
        if (!r.ok) throw new Error();
        setReady(true);
      })
      .catch(() => router.push("/admin/login"));
  }, [router]);

  return ready;
}
