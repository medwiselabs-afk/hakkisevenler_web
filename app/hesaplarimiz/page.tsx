export default function AccountsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-3xl text-ink">Hesaplarımız</h1>
      <p className="mt-4 text-ink/70">
        EFT/Havale ile bağış yapmak isteyenler için banka hesap numaraları burada listelenir.
      </p>
      <div className="mt-6 space-y-3 rounded-2xl border border-line bg-white p-5 font-mono text-sm">
        <p>Banka: Örnek Banka A.Ş.</p>
        <p>Hesap Adı: Hakkı Sevenler Derneği</p>
        <p>IBAN: TR00 0000 0000 0000 0000 0000 00</p>
      </div>
    </div>
  );
}
