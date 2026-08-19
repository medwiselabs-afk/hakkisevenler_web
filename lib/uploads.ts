import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

// Render'da bu klasörün kalıcı olması için disk/volume'ü tam olarak
// "public/uploads" yoluna bağlayın (bkz. README "Görsel Depolama").
const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function saveUploadedImage(buffer: Buffer, mimeType: string, folder: string) {
  const extension = EXTENSION_BY_MIME[mimeType];
  if (!extension) throw new Error("Desteklenmeyen dosya türü");

  const dir = path.join(UPLOAD_ROOT, folder);
  await mkdir(dir, { recursive: true });

  const filename = `${crypto.randomUUID()}.${extension}`;
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}
