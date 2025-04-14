import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/config/SupabaseConfig';
import { AiGeneratedImage } from '@/db/schema';
import { db } from '@/db';
import Replicate from "replicate";
import axios from 'axios';

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  
  try {    
    // Get Input From User
    const { imageUrl, roomType, designType, additionalReq, userEmail } = await req.json();
    
    // Convert Image To AI Image
    const input = {
      image: imageUrl,
      prompt: `A ${roomType} with a ${designType} style interior design. ${additionalReq}`,
    };

    // Generate AI Image
    const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
    
    // Convert Output Url to BASE64 Image
    
    // @ts-expect-error - Ignorando error debido a que output es un string y no un objeto
    const base64Image = await convertToBase64(output as string);
    
    if (!base64Image) {
      throw new Error("No se pudo convertir la imagen a base64");
    }
    
    // Generate File Name
    const fileName = `${Date.now()}_${roomType}_${designType}.png`;
    
    // convert base64 to Blob
    const base64Data = base64Image.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, { type: 'image/png' });
    
    // Upload Blob To Supabase
    const { error } = await supabase.storage
      .from("InteriorDesignerBucket")
      .upload(fileName, blob, {
        contentType: 'image/png',
        upsert: true
      });

    // Check If Error
    if (error) {
      console.error("Error subiendo la imagen:", error.message);
      throw new Error("No se pudo subir la imagen a Supabase.");
    }

    // Get Public Url
    const { data: publicUrlData } = supabase.storage
    .from("InteriorDesignerBucket")
    .getPublicUrl(fileName);

    // Check If Error
    if (!publicUrlData) {
      throw new Error("No se pudo obtener la URL pública de la imagen.");
    }

    // Get Public Image Url
    const publicImageUrl = publicUrlData.publicUrl;
    console.log("publicImageUrl:", publicImageUrl);
    
    // Save All To Database Neon
    const dbResult = await db.insert(AiGeneratedImage).values({
      roomType: roomType,
      designType: designType,
      orgImage: imageUrl,
      aiImage: publicImageUrl,
      userEmail: userEmail
    }).returning({ id: AiGeneratedImage.id });
    
    console.log("dbResult:", dbResult);
    return NextResponse.json({ imageUrl, roomType, designType, additionalReq, output, result: publicImageUrl });
       
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json({ error: "Error procesando la solicitud." + error });
  }
}

async function convertToBase64 (imageUrl: string) {
  try {

    // Get Image From Url
    const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Convert Image To Base64
    const base64ImageRaw = Buffer.from(resp.data).toString('base64');

    // Return Base64 Image
    return `data:image/png;base64,${base64ImageRaw}`;

  } catch (error) {
    console.error("Error al convertir la imagen a base64:", error);
    return null;
  }
}