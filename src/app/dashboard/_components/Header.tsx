"use client";
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useContext } from 'react'

function Header() {

	const { userDetail } = useContext(UserDetailContext);

  return (
    <div className='p-5 shadow-xl border-b border-black bg-gray-100'>
      <div className='container mx-auto flex justify-between items-center'>
				<div className='flex gap-5 items-center'>
					<Image src={'/logo.svg'} width={30} height={30} alt='logo' />
					<h2 className='sm:text-lg md:text-xl font-bold'>IA Diseñador De Interiores</h2>
				</div>

				<Button variant="ghost" className='hidden md:flex rounded-full text-primary border-2 text-lg border-black p-5 font-semibold -translate-x-16'>Conseguir Creditos</Button>
				<div className='flex gap-5 items-center'>
					<div className='flex gap-2 p-1 items-center bg-slate-200 px-3 md:px-5 rounded-full'>
						<Image src={'/estrella.png'} width={30} height={30} alt='Credits Icon' />
						<h2 className='font-bold text-lg md:text-xl'>{userDetail?.credits}</h2>
					</div>
					<UserButton />
				</div>
			</div>
    </div>
  )
}

export default Header