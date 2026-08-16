import FaqAccordion from "@/components/FaqAccordion";

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-3xl text-ink">Sık Sorulan Sorular</h1>
      <div className="mt-6">
        <FaqAccordion />
      </div>
    </div>
  );
}
