# Bağış Platformu

Next.js 14 (App Router) tabanlı bir bağış / kampanya platformu. Kullanıcı kaydı, kampanya listeleme, bağış ve iyzico ile ödeme akışını içerir.

## Teknoloji Yığını

- **Next.js 14** (App Router, `app/` klasörü)
- **React 18**, **Tailwind CSS**, **Framer Motion** (`components/motion/*`)
- **Drizzle ORM** + **better-sqlite3** (geliştirmede SQLite, üretimde Postgres'e taşınabilir)
- **jose** (JWT) + **bcryptjs** ile kendi oturum/kimlik doğrulama sistemi (NextAuth vb. kullanılmıyor)
- **iyzico** (`iyzipay` paketi) ile ödeme entegrasyonu
- **zod** ile giriş doğrulama

## Uygulamayı Başlatma

```bash
npm install        # bağımlılıklar (node_modules zaten mevcutsa gerekmeyebilir)
npm run dev         # http://localhost:3000 - geliştirme sunucusu
```

Diğer komutlar:

```bash
npm run build        # production build
npm run start         # production sunucusu (build sonrası)
npm run lint           # eslint

npm run db:generate    # schema değişikliğinden migration dosyası üretir (drizzle-kit)
npm run db:migrate      # migration'ları dev.db'ye uygular (tsx db/migrate.ts)
npm run db:seed          # örnek veri ekler (db/seed.ts)
npm run db:studio         # Drizzle Studio - veritabanını tarayıcıdan görüntüle
```

### Ortam Değişkenleri

`.env.example` dosyasını `.env` olarak kopyalayıp doldurun:

- `DATABASE_URL` — geliştirmede `file:./dev.db`
- `AUTH_SECRET` — JWT imzalama anahtarı (`openssl rand -base64 32`)
- `NEXT_PUBLIC_BASE_URL` — iyzico callback URL'i için tam site adresi
- `IYZICO_API_KEY`, `IYZICO_SECRET_KEY`, `IYZICO_BASE_URL` — sandbox hesabı ile alınır

## Proje Yapısı

```
app/                    # Next.js App Router: sayfalar + API route'ları
  api/auth/*             # register, login, logout, me
  api/campaigns/*         # kampanya listeleme / detay
  api/donations/*          # bağış oluşturma, kullanıcının bağışları, iyzico callback
  [sayfa klasörleri]        # giris, kayit, kampanyalar, hesabim, sss, kvkk, ...
components/              # paylaşılan React bileşenleri (PascalCase dosya adı)
  motion/                  # Framer Motion sarmalayıcıları (Reveal, Stagger, Counter)
lib/                     # sunucu tarafı yardımcılar (auth, db, iyzico, format, ...)
db/
  schema.ts               # Drizzle şeması (tek kaynak - tablolar burada tanımlı)
  migrate.ts, seed.ts
  migrations/              # drizzle-kit tarafından üretilen SQL migration'ları
```

## Kod Kuralları / Konvansiyonlar

- **Dil:** Kullanıcıya dönük tüm metinler Türkçe. Route parametreleri de Türkçe olabilir (örn. `?kategori=`, `/kampanyalar/[slug]`).
- **Import alias:** `@/` kök dizine işaret eder (örn. `@/lib/db`, `@/db/schema`, `@/components/Header`) — `tsconfig.json` paths.
- **Veritabanı erişimi:** Her zaman `lib/db.ts`'deki tekil `db` (Drizzle) instance'ı üzerinden, route/sunucu bileşeni içinde. `globalForDb` ile dev'de hot-reload'da tek bağlantı korunur.
- **Şema tek kaynak:** Yeni alan/tablo eklerken önce `db/schema.ts`'i güncelleyip `npm run db:generate` + `npm run db:migrate` çalıştırın. Migration dosyalarını elle düzenlemeyin.
- **Enum'lar:** Durum/kategori gibi alanlar Drizzle `text(..., { enum: [...] })` ile tanımlanıyor ve değerler BÜYÜK_HARF_SNAKE_CASE Türkçe (örn. `BEKLEMEDE`, `ACIL_YARDIM`).
- **Para birimi:** Tutarlar (`amount`, `goalAmount`, `currentAmount`) veritabanında **kuruş** cinsinden tam sayı olarak tutulur; ekranda gösterirken `lib/format.ts` ile biçimlendirin.
- **Kimlik doğrulama:** `lib/auth.ts` — `getSession()` ile mevcut oturumu okuyun, `createSession()`/`destroySession()` ile cookie tabanlı JWT oturumu yönetin. Şifreler `bcryptjs` ile hash'lenir, ham şifre asla saklanmaz/loglanmaz.
- **API route'ları:** `app/api/**/route.ts` içinde `NextResponse.json(...)` dönülür; girişler `zod` ile doğrulanır.
- **Bileşenler:** Fonksiyonel React bileşenleri, dosya adı `PascalCase.tsx`. Sunucu bileşeni varsayılan; interaktif/client-only parçalar `"use client"` ile ayrı dosyada (örn. `Header.tsx` + `HeaderClient.tsx`, `LogoutButton.tsx`).
- **Stil:** Tailwind utility class'ları doğrudan JSX içinde; özel tasarım token'ları (`bg-bg`, `text-ink`, font değişkenleri `--font-display` / `--font-body`) `tailwind.config.ts` ve `app/globals.css` üzerinden tanımlı.
- **Animasyon:** Sayfa/öğe giriş animasyonları için `components/motion/*` sarmalayıcıları (`Reveal`, `Stagger`, `Counter`) kullanılır, ham `framer-motion` çağrıları sayfa içine serpiştirilmez.
- **Yorum yok / minimal yorum:** Kod genelde yorumsuz; yalnızca kuruş/birim gibi anlaşılması zor noktalarda kısa satır yorumu var (`// kuruş cinsinden`).

## Production'a Geçiş Notları

- SQLite (`better-sqlite3`) geliştirme içindir; üretimde `DATABASE_URL`'i bir Postgres bağlantı dizesiyle değiştirip Drizzle adapter'ını (`drizzle-orm/better-sqlite3` → uygun Postgres adapter'ı) güncellemek gerekir.
- iyzico sandbox anahtarları yerine gerçek merchant anahtarları ve `IYZICO_BASE_URL=https://api.iyzipay.com` kullanılmalı.
