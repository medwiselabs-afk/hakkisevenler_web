import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// Bağış Platformu - Veritabanı Şeması (Drizzle ORM / SQLite)
// Geliştirmede SQLite dosyası, üretimde Postgres'e taşınabilir
// (bkz. README "Production'a geçiş" bölümü).

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  role: text("role", { enum: ["USER", "ADMIN"] }).notNull().default("USER"),
  kvkkConsent: integer("kvkk_consent", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const campaigns = sqliteTable("campaigns", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category", {
    enum: ["ACIL_YARDIM", "KURBAN", "SU_KUYUSU", "YETIM", "EGITIM", "SAGLIK", "GENEL"],
  }).notNull(),
  goalAmount: integer("goal_amount").notNull(), // kuruş cinsinden
  currentAmount: integer("current_amount").notNull().default(0),
  isShareBased: integer("is_share_based", { mode: "boolean" }).notNull().default(false),
  totalShares: integer("total_shares"),
  takenShares: integer("taken_shares").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const donations = sqliteTable("donations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  amount: integer("amount").notNull(), // kuruş cinsinden
  status: text("status", {
    enum: ["BEKLEMEDE", "BASARILI", "BASARISIZ", "IADE"],
  })
    .notNull()
    .default("BEKLEMEDE"),
  isRecurring: integer("is_recurring", { mode: "boolean" }).notNull().default(false),
  isAnonymous: integer("is_anonymous", { mode: "boolean" }).notNull().default(false),
  donorName: text("donor_name"),
  donorEmail: text("donor_email"),
  donorPhone: text("donor_phone"),
  shareCount: integer("share_count"),
  paymentProvider: text("payment_provider").notNull().default("iyzico"),
  providerPaymentId: text("provider_payment_id"),
  providerRawResult: text("provider_raw_result"),
  proofVideoUrl: text("proof_video_url"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  userId: text("user_id").references(() => users.id),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => campaigns.id),
});

export const usersRelations = relations(users, ({ many }) => ({
  donations: many(donations),
}));

export const campaignsRelations = relations(campaigns, ({ many }) => ({
  donations: many(donations),
}));

export const donationsRelations = relations(donations, ({ one }) => ({
  user: one(users, { fields: [donations.userId], references: [users.id] }),
  campaign: one(campaigns, { fields: [donations.campaignId], references: [campaigns.id] }),
}));

export type User = typeof users.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type Donation = typeof donations.$inferSelect;
