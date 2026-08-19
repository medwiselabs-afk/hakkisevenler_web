"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Donation } from "@/db/schema";

const STATUS_STYLE: Record<Donation["status"], string> = {
  BASARILI: "bg-success-light text-success-dark",
  BEKLEMEDE: "bg-line text-ink/60",
  BASARISIZ: "bg-accent-light text-accent-dark",
  IADE: "bg-accent-light text-accent-dark",
};

export default function DonationStatusSelect({
  donationId,
  status,
}: {
  donationId: string;
  status: Donation["status"];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setBusy(true);
    await fetch(`/api/admin/donations/${donationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: e.target.value }),
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      disabled={busy}
      className={`focus-ring rounded-full border-0 px-2.5 py-1 text-xs font-medium disabled:opacity-50 ${STATUS_STYLE[status]}`}
    >
      <option value="BEKLEMEDE">BEKLEMEDE</option>
      <option value="BASARILI">BASARILI</option>
      <option value="BASARISIZ">BASARISIZ</option>
      <option value="IADE">IADE</option>
    </select>
  );
}
