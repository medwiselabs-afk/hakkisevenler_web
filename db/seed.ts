import { db } from "@/lib/db";
import { campaigns } from "./schema";
import { sql } from "drizzle-orm";

async function main() {
  const rows: (typeof campaigns.$inferInsert)[] = [
    {
      slug: "acil-gida-kolisi",
      title: "Acil Gıda Kolisi Yardımı",
      summary: "İhtiyaç sahibi ailelere temel gıda kolisi ulaştırıyoruz.",
      description:
        "Bölgedeki ihtiyaç sahibi ailelere un, bakliyat, yağ ve temel gıda maddelerinden oluşan koliler hazırlıyor ve adreslerine kadar ulaştırıyoruz. Her teslimat fotoğraf ve konum kaydıyla belgelenir.",
      imageUrl: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&q=80",
      category: "ACIL_YARDIM",
      goalAmount: 45000_00,
      currentAmount: 22950_00,
      isShareBased: false,
    },
    {
      slug: "afrika-su-kuyusu-hisseli",
      title: "Afrika Su Kuyusu - Hisseli",
      summary: "Temiz suya erişimi olmayan köylere kalıcı su kuyusu açıyoruz.",
      description:
        "Derin sondajlı, depolu ve çok çeşmeli su kuyuları açarak yüzlerce haneye kalıcı temiz su erişimi sağlıyoruz. Kuyu açılış anı video ile bağışçıya iletilir.",
      imageUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80",
      category: "SU_KUYUSU",
      goalAmount: 112500_00,
      currentAmount: 36750_00,
      isShareBased: true,
      totalShares: 150,
      takenShares: 45,
    },
    {
      slug: "yetim-egitim-bursu",
      title: "Yetim Eğitim Bursu",
      summary: "Yetim çocukların eğitimine aylık düzenli destek.",
      description:
        "Yetim çocukların okul masraflarını, kırtasiye ihtiyaçlarını ve eğitim bursunu karşılıyoruz. Aylık düzenli bağış ile sürdürülebilir destek sağlanır.",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
      category: "EGITIM",
      goalAmount: 60000_00,
      currentAmount: 14500_00,
      isShareBased: false,
    },
    {
      slug: "katarakt-ameliyati",
      title: "Katarakt Ameliyatı Desteği",
      summary: "Görme engelli hastalara ameliyatla umut oluyoruz.",
      description:
        "Katarakt nedeniyle görme kaybı yaşayan hastaların ameliyat masraflarını karşılayarak yeniden görmelerine vesile oluyoruz.",
      imageUrl: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80",
      category: "SAGLIK",
      goalAmount: 90000_00,
      currentAmount: 65750_00,
      isShareBased: false,
    },
  ];

  for (const row of rows) {
    await db
      .insert(campaigns)
      .values(row)
      .onConflictDoUpdate({
        target: campaigns.slug,
        set: { title: sql`excluded.title`, imageUrl: sql`excluded.image_url` },
      });
  }

  console.log(`${rows.length} örnek kampanya yüklendi.`);
}

main();
