import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client, S3_BUCKET, getPublicUrl } from "@/config/S3Config";

export async function POST(req: NextRequest) {
  try {
    const { fileName, contentType } = await req.json();

    if (!fileName || !contentType?.startsWith("image/")) {
      return NextResponse.json({ error: "Archivo inválido" }, { status: 400 });
    }

    // Limpia el nombre para evitar espacios y caracteres raros
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `${Date.now()}_${safeName}`;

    const uploadUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        ContentType: contentType,
      }),
      { expiresIn: 60 }
    );

    console.log("publicUrl:", getPublicUrl(key));

    return NextResponse.json({ uploadUrl, publicUrl: getPublicUrl(key) });
  } catch (error) {
    console.error("Error generando URL prefirmada:", error);
    return NextResponse.json({ error: "No se pudo generar la URL" }, { status: 500 });
  }
}