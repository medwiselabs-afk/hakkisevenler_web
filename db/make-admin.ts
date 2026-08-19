import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "./schema";

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Kullanım: npm run db:make-admin -- kullanici@ornek.com");
    process.exit(1);
  }

  const [user] = await db
    .update(users)
    .set({ role: "ADMIN" })
    .where(eq(users.email, email))
    .returning();

  if (!user) {
    console.error(`"${email}" adresiyle kayıtlı kullanıcı bulunamadı. Önce siteden üye olun.`);
    process.exit(1);
  }

  console.log(`${user.fullName} (${user.email}) artık yönetici. /admin adresinden giriş yapabilir.`);
}

main();
