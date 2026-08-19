"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import type { Campaign } from "@/db/schema";

const CATEGORIES: { value: Campaign["category"]; label: string }[] = [
  { value: "ACIL_YARDIM", label: "Acil Yardım" },
  { value: "KURBAN", label: "Kurban" },
  { value: "SU_KUYUSU", label: "Su Kuyusu" },
  { value: "YETIM", label: "Yetim" },
  { value: "EGITIM", label: "Eğitim" },
  { value: "SAGLIK", label: "Sağlık" },
  { value: "GENEL", label: "Genel" },
];

export default function CampaignForm({ campaign }: { campaign?: Campaign }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!campaign;

  const [imageUrl, setImageUrl] = useState(campaign?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: campaign?.slug ?? "",
    title: campaign?.title ?? "",
    summary: campaign?.summary ?? "",
    description: campaign?.description ?? "",
    category: campaign?.category ?? "GENEL",
    goalAmountTl: campaign ? campaign.goalAmount / 100 : 0,
    isShareBased: campaign?.isShareBased ?? false,
    totalShares: campaign?.totalShares ?? undefined,
    isActive: campaign?.isActive ?? true,
  });

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json();
    setUploading(false);

    if (!res.ok) {
      setError(data.error ?? "Görsel yüklenemedi");
      return;
    }
    setImageUrl(data.url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!imageUrl) {
      setError("Lütfen bir kampanya görseli yükleyin");
      return;
    }

    setSaving(true);
    const payload = { ...form, imageUrl };
    const res = await fetch(
      isEdit ? `/api/admin/campaigns/${campaign!.id}` : "/api/admin/campaigns",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Kaydedilemedi");
      return;
    }

    router.push("/admin/kampanyalar");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-ink">Kampanya Görseli</label>
        <div className="flex items-center gap-4">
          <div className="relative h-28 w-40 flex-shrink-0 overflow-hidden rounded-xl border border-line bg-sand">
            {imageUrl ? (
              <Image src={imageUrl} alt="Önizleme" fill className="object-cover" sizes="160px" />
            ) : (
              <div className="flex h-full items-center justify-center text-ink/30">
                <UploadCloud size={24} />
              </div>
            )}
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink/70 hover:border-primary hover:text-primary disabled:opacity-50"
            >
              {uploading ? <Loader2 size={15} className="animate-spin" /> : <UploadCloud size={15} />}
              {uploading ? "Yükleniyor…" : imageUrl ? "Görseli Değiştir" : "Görsel Yükle"}
            </button>
            <p className="mt-1.5 text-xs text-ink/50">JPEG, PNG veya WEBP, en fazla 5MB.</p>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Başlık</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Slug (URL) {isEdit && <span className="text-ink/40">— değiştirilemez</span>}
        </label>
        <input
          required
          disabled={isEdit}
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          placeholder="ornek-kampanya-adi"
          className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm disabled:bg-sand disabled:text-ink/50"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Kısa Özet</label>
        <input
          required
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Detaylı Açıklama</label>
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Kategori</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Campaign["category"] })}
            className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Hedef Tutar (TL)</label>
          <input
            required
            type="number"
            min={1}
            step="0.01"
            value={form.goalAmountTl}
            onChange={(e) => setForm({ ...form, goalAmountTl: Number(e.target.value) })}
            className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="isShareBased"
          type="checkbox"
          checked={form.isShareBased}
          onChange={(e) => setForm({ ...form, isShareBased: e.target.checked })}
          className="h-4 w-4 rounded border-line text-primary focus-ring"
        />
        <label htmlFor="isShareBased" className="text-sm text-ink">
          Hisseli kampanya
        </label>
      </div>

      {form.isShareBased && (
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Toplam Hisse Sayısı</label>
          <input
            type="number"
            min={1}
            value={form.totalShares ?? ""}
            onChange={(e) => setForm({ ...form, totalShares: Number(e.target.value) || undefined })}
            className="focus-ring w-full max-w-xs rounded-lg border border-line px-3 py-2 text-sm"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          id="isActive"
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          className="h-4 w-4 rounded border-line text-primary focus-ring"
        />
        <label htmlFor="isActive" className="text-sm text-ink">
          Sitede yayında (aktif)
        </label>
      </div>

      {error && <p className="text-sm text-accent">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          disabled={saving || uploading}
          className="focus-ring rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {saving ? "Kaydediliyor…" : isEdit ? "Değişiklikleri Kaydet" : "Kampanyayı Oluştur"}
        </button>
      </div>
    </form>
  );
}
