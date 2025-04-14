import Image from 'next/image';
import React, { useState } from 'react'

function DesignType({ selectedDesignType }: { selectedDesignType: (design: string) => void }) {

	const Designs = [
		{
			name: 'Moderno',
			image: '/modern.webp',
		},
		{
			name: 'Industrial',
			image: '/industrial.webp',
		},
		{
			name: 'Bohemio',
			image: '/bohemian.webp',
		},
		{
			name: 'Tradicional',
			image: '/traditional.webp',
		},
		{
			name: 'Rustico',
			image: '/rustic.webp',
		},
		{
			name: 'Minimalista',
			image: '/minimalist.webp',
		},
		{
			name: 'Vintage',
			image: '/vintage.jpg',
		},
		{
			name: 'Bohemio',
			image: '/bohemian.webp',
		},
		{
			name: 'Hipster',
			image: '/hipster.jpg',
		},
		{
			name: 'Escandinavo',
			image: '/scandinavian.jpg',
		},
		{
			name: 'Japones',
			image: '/japones.jpg',
		},
		{
			name: 'Hip Hop',
			image: '/hiphop.jpg',
		},
		{
			name: 'Gotico',
			image: '/gotic.jpg',
		},
		{
			name: 'Neoclasico',
			image: '/neoclassic.jpg',
		},
	]

	const [selectedOption, setSelectedOption] = useState('')

  return (
    <div className='mt-5'>
			<label className='text-gray-500'>Selecciona El Tipo De Diseño *</label>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-y-4 gap-x-2'>
				{Designs.map((design, index) => (
					<div key={index} onClick={() => {setSelectedOption(design.name);selectedDesignType(design.name)}} className='cursor-pointer flex flex-col items-center'>
						<Image src={design.image} width={100} height={100} alt={design.name} className={`h-[80px] rounded-md hover:scale-105 transition-all cursor-pointer ${design.name == selectedOption && 'border-2 border-primary rounded-md p-1'}`} />
						<h2>{design.name}</h2>
					</div>
				))}
			</div>
		</div>
  )
}

export default DesignType;