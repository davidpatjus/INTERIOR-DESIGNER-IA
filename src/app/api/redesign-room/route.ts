import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, S3_BUCKET, getPublicUrl } from "@/config/S3Config";
import { AiGeneratedImage } from "@/db/schema";
import { db } from "@/db";
import Replicate from "replicate";
import axios from "axios";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, // sin NEXT_PUBLIC_
});

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, roomType, designType, additionalReq, userEmail } = await req.json();

    const input = {
      image: imageUrl,
      prompt: `A ${roomType} with a ${designType} style interior design. ${additionalReq}`,
    };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    // Descargar la imagen generada como buffer
    const resp = await axios.get(output as unknown as string, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(resp.data);

    // Subir al bucket S3
    const key = `${Date.now()}_${roomType}_${designType}.png`.replace(/[^a-zA-Z0-9._-]/g, "_");

    await s3Client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: "image/png",
      })
    );

    const publicImageUrl = getPublicUrl(key);

    const dbResult = await db
      .insert(AiGeneratedImage)
      .values({
        roomType,
        designType,
        orgImage: imageUrl,
        aiImage: publicImageUrl,
        userEmail,
      })
      .returning({ id: AiGeneratedImage.id });

    console.log("dbResult:", dbResult);

    return NextResponse.json({
      imageUrl,
      roomType,
      designType,
      additionalReq,
      output,
      result: publicImageUrl,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json({ error: "Error procesando la solicitud." }, { status: 500 });
  }
}