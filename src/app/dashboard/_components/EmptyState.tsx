import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function EmptyState() {
  return (
    <div className='flex items-center justify-center mt-10 md:mt-16 flex-col'>
        <Image src={'/placeholder.webp'} width={200} height={200} alt='Placeholder Room' />
        <h2 className='font-medium text-lg text-gray-500'>Crea un nuevo diseño de interior con IA</h2>
        <Link href='/dashboard/create-new'>
          <Button className='mt-5'>+ Rediseña tu Habitación</Button>
        </Link>
    </div>
  )
}

export default EmptyState;