import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { saveUploadedImage } from "@/lib/uploads";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Sadece JPEG, PNG veya WEBP yükleyebilirsiniz" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Dosya 5MB'dan küçük olmalı" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await saveUploadedImage(buffer, file.type, "kampanyalar");
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Yükleme başarısız oldu" }, { status: 502 });
  }
}
