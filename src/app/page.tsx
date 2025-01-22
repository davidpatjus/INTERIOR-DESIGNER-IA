import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto flex items-center flex-col justify-center h-screen gap-4">
      <h2 className='text-red-600 text-5xl font-bold'> Hola Mundo </h2>
      <Link href="/dashboard">
        <Button>Ready</Button>
      </Link>
    </div>
  );
}
