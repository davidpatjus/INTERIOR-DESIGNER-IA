import { S3Client } from "@aws-sdk/client-s3";

if (
  !process.env.AWS_ENDPOINT_URL_S3 ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_REGION ||
  !process.env.S3_BUCKET
) {
  throw new Error("Faltan variables de entorno de S3");
}

export const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true, // bucket en la ruta, no como subdominio
    requestChecksumCalculation: "WHEN_REQUIRED", // ver nota abajo
    responseChecksumValidation: "WHEN_REQUIRED",
});

export const getPublicUrl = (key: string) => `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.S3_BUCKET}/${encodeURIComponent(key)}`;

export const S3_BUCKET = process.env.S3_BUCKET;