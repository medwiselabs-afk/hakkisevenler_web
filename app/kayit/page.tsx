"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    kvkkConsent: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error);
      return;
    }
    router.push("/hesabim");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="font-display text-2xl text-ink">Üye Ol</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          required
          placeholder="Ad Soyad"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm"
        />
        <input
          type="email"
          required
          placeholder="E-posta"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm"
        />
        <input
          placeholder="Telefon"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          placeholder="Şifre (en az 8 karakter)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm"
        />
        <label className="flex items-start gap-2 text-xs text-ink/60">
          <input
            type="checkbox"
            checked={form.kvkkConsent}
            onChange={(e) => setForm({ ...form, kvkkConsent: e.target.checked })}
            className="mt-0.5"
          />
          <Link href="/kvkk" className="underline">
            KVKK Aydınlatma Metni
          </Link>
          &apos;ni okudum, kabul ediyorum.
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="focus-ring w-full rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {loading ? "Kaydediliyor…" : "Üye Ol"}
        </button>
      </form>
      <p className="mt-4 text-sm text-ink/60">
        Zaten üye misin?{" "}
        <Link href="/giris" className="font-medium text-primary hover:underline">
          Giriş yap
        </Link>
      </p>
    </div>
  );
}
