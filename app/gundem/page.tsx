export default function NewsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-3xl text-ink">Gündem</h1>
      <p className="mt-4 text-ink/70">
        Duyurular ve faaliyet haberleri burada listelenecek. (Bir sonraki aşamada bir
        `NewsPost` modeli eklenerek dinamikleştirilebilir.)
      </p>
    </div>
  );
}
