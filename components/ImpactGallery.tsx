import Image from "next/image";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&h=1000&fit=crop&auto=format&q=80",
    caption: "Gıda kolisi teslimatı",
    span: "sm:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=600&fit=crop&auto=format&q=80",
    caption: "Temiz su desteği",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop&auto=format&q=80",
    caption: "Eğitim bursu desteği",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=1000&fit=crop&auto=format&q=80",
    caption: "Gönüllü saha ekibi",
    span: "sm:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=600&fit=crop&auto=format&q=80",
    caption: "Sağlık tarama günü",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop&auto=format&q=80",
    caption: "Çocuklarla buluşma",
    span: "",
  },
];

export default function ImpactGallery() {
  return (
    <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {PHOTOS.map((p, i) => (
        <StaggerItem key={i} className={`group relative overflow-hidden rounded-2xl bg-sand ${p.span}`}>
          <div className="relative h-40 w-full sm:h-full sm:min-h-[160px]">
            <Image
              src={p.src}
              alt={p.caption}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(min-width: 640px) 33vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
            <p className="absolute bottom-3 left-3 right-3 translate-y-1 text-sm font-medium text-white opacity-90 transition-transform duration-300 group-hover:translate-y-0">
              {p.caption}
            </p>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
