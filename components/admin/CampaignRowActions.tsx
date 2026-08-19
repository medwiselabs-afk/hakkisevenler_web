"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Campaign } from "@/db/schema";

export default function CampaignRowActions({ campaign }: { campaign: Campaign }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggleActive() {
    setBusy(true);
    await fetch(`/api/admin/campaigns/${campaign.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !campaign.isActive }),
    });
    setBusy(false);
    router.refresh();
  }

  async function remove() {
    if (!confirm(`"${campaign.title}" kampanyasını silmek istediğinize emin misiniz?`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/campaigns/${campaign.id}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Silinemedi");
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={toggleActive}
        disabled={busy}
        className="focus-ring rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-primary hover:text-primary disabled:opacity-50"
      >
        {campaign.isActive ? "Pasif Yap" : "Aktif Yap"}
      </button>
      <Link
        href={`/admin/kampanyalar/${campaign.id}`}
        className="focus-ring rounded-full border border-line p-1.5 text-ink/60 hover:border-primary hover:text-primary"
        aria-label="Düzenle"
      >
        <Pencil size={14} />
      </Link>
      <button
        onClick={remove}
        disabled={busy}
        className="focus-ring rounded-full border border-line p-1.5 text-ink/60 hover:border-accent hover:text-accent disabled:opacity-50"
        aria-label="Sil"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
