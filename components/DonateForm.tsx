"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const QUICK_AMOUNTS = [100, 250, 500, 1000];

export default function DonateForm({
  campaignSlug,
  isLoggedIn,
}: {
  campaignSlug: string;
  isLoggedIn: boolean;
}) {
  const searchParams = useSearchParams();
  const prefillAmount = Number(searchParams.get("tutar"));
  const initialAmount = prefillAmount > 0 ? prefillAmount : 250;

  const [amount, setAmount] = useState(initialAmount);
  const [customAmount, setCustomAmount] = useState(
    QUICK_AMOUNTS.includes(initialAmount) ? "" : String(initialAmount)
  );
  const [isRecurring, setIsRecurring] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [guest, setGuest] = useState({ name: "", surname: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const finalAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!finalAmount || finalAmount <= 0) {
      setError("Geçerli bir tutar girin");
      return;
    }
    if (!isLoggedIn && (!guest.name || !guest.surname || !guest.email || !guest.phone)) {
      setError("Misafir bağışçı bilgilerini eksiksiz doldurun");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignSlug,
          amountTl: finalAmount,
          isRecurring,
          isAnonymous,
          ...(isLoggedIn ? {} : { guest }),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Bir hata oluştu");
        setLoading(false);
        return;
      }

      setShowCheckout(true);
      // iyzico'nun döndürdüğü checkoutFormContent bir <script> içerir.
      // innerHTML ile eklenen scriptler tarayıcıda çalışmadığından
      // manuel olarak yeni bir <script> elemanı oluşturup DOM'a ekliyoruz.
      requestAnimationFrame(() => {
        const container = document.getElementById("iyzipay-checkout-form");
        if (container) container.innerHTML = "";

        const scriptMatch = data.checkoutFormContent.match(/<script[^>]*>([\s\S]*?)<\/script>/);
        if (scriptMatch) {
          const script = document.createElement("script");
          script.text = scriptMatch[1];
          document.body.appendChild(script);
        }
      });
    } catch {
      setError("Sunucuya ulaşılamadı, lütfen tekrar deneyin");
    } finally {
      setLoading(false);
    }
  }

  if (showCheckout) {
    return (
      <div className="rounded-2xl border border-line bg-white p-5">
        <p className="mb-4 text-sm text-ink/60">
          Güvenli ödeme formu iyzico tarafından sağlanmaktadır. Kart bilgileriniz bu formda kalır.
        </p>
        <div id="iyzipay-checkout-form" className="min-h-[400px]" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-line bg-white p-6">
      <div>
        <p className="mb-2 text-sm font-medium text-ink">Bağış Tutarı</p>
        <div className="grid grid-cols-4 gap-2">
          {QUICK_AMOUNTS.map((a) => (
            <button
              type="button"
              key={a}
              onClick={() => {
                setAmount(a);
                setCustomAmount("");
              }}
              className={`focus-ring rounded-lg border py-2 text-sm font-semibold transition-colors ${
                !customAmount && amount === a
                  ? "border-primary bg-primary-light text-primary-dark"
                  : "border-line text-ink/70 hover:border-primary"
              }`}
            >
              {a}₺
            </button>
          ))}
        </div>
        <input
          type="number"
          min={1}
          placeholder="Farklı tutar girin (₺)"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="focus-ring mt-2 w-full rounded-lg border border-line px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
        Her ay düzenli bağışla
      </label>
      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
        İsmim gizli kalsın
      </label>

      {!isLoggedIn && (
        <div className="space-y-3 border-t border-dashed border-line pt-4">
          <p className="text-sm font-medium text-ink">Misafir Bağışçı Bilgileri</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Ad"
              value={guest.name}
              onChange={(e) => setGuest({ ...guest, name: e.target.value })}
              className="focus-ring rounded-lg border border-line px-3 py-2 text-sm"
            />
            <input
              placeholder="Soyad"
              value={guest.surname}
              onChange={(e) => setGuest({ ...guest, surname: e.target.value })}
              className="focus-ring rounded-lg border border-line px-3 py-2 text-sm"
            />
          </div>
          <input
            placeholder="E-posta"
            type="email"
            value={guest.email}
            onChange={(e) => setGuest({ ...guest, email: e.target.value })}
            className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm"
          />
          <input
            placeholder="Telefon"
            value={guest.phone}
            onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
            className="focus-ring w-full rounded-lg border border-line px-3 py-2 text-sm"
          />
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="focus-ring w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-accent-dark disabled:opacity-60"
      >
        {loading ? "Hazırlanıyor…" : `${finalAmount || 0}₺ Bağışla`}
      </button>
    </form>
  );
}
