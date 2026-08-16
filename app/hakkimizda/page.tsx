import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Hakkımızda | Hakkı Sevenler Uluslararası Yardım Derneği",
  description:
    "Ankara Keçiören merkezli; hafızlık eğitimi, aşevi ve yurt içi/yurt dışı insani yardım faaliyetleri yürüten yardım kuruluşu.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24">
      <Reveal>
        <h1 className="font-display text-4xl text-ink">Hakkımızda</h1>

        <div className="mt-6 space-y-5 leading-relaxed text-ink/70">
          <p>
            Hakkı Sevenler Uluslararası Yardım Derneği, yurt içinde ve yurt dışında eğitimden sıcak
            yemeğe, hafızlık hizmetlerinden insani yardıma kadar birçok alanda faaliyet gösteren bir
            yardım kuruluşudur.
          </p>
          <p>
            Derneğimizin temel gayesi; hayır sahiplerimizin emanetlerini ihtiyaç sahiplerine
            ulaştırmak, Kur'an ve hafızlık hizmetlerini desteklemek, ihtiyaç sahibi ailelerin
            yanında olmak ve dünyanın farklı bölgelerinde mazlum ve mağdur insanlara yardım
            ulaştırmaktır.
          </p>
          <p>
            Ankara Keçiören merkezli yürüttüğümüz çalışmalarımızda, Keçiören Müftülüğüne bağlı Hacı
            Mikdat Hafızlık Kur'an Kursumuzun ihtiyaç ve giderlerinin karşılanmasına önemli ölçüde
            destek oluyor; ayrıca Türkiye Diyanet Vakfı Keçiören Şubesi ile iş birliği içerisinde
            çeşitli sosyal yardım ve aşevi faaliyetleri gerçekleştiriyoruz.
          </p>
          <p>
            Derneğimiz yalnızca belirli dönemlerde yardım yapan bir yapı değil; eğitim, hafızlık,
            aşevi, mobil ikram, sosyal yardım ve uluslararası insani yardım alanlarında yıl boyunca
            hizmet üretmeye çalışan geniş kapsamlı bir hayır kuruluşudur.
          </p>
          <p className="font-display text-lg italic text-ink">
            Türkiye'den Gazze'ye, Afrika'dan ihtiyaç sahibi bir öğrencimize kadar… İyiliğin ulaştığı
            her yerde olmaya gayret ediyoruz.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
