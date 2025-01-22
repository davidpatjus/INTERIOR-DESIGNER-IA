import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error('La variable de entorno DATABASE_URL no está definida');
}

export const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_URL);