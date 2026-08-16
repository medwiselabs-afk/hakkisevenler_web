"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
        router.refresh();
      }}
      className="focus-ring rounded-full border border-line px-4 py-2 text-sm font-medium text-ink/70 hover:border-primary hover:text-primary"
    >
      Çıkış Yap
    </button>
  );
}
