import Image from 'next/image';
import React, { useState } from 'react'

function DesignType({ selectedDesignType }) {

	const Designs = [
		{
			name: 'Modern',
			image: '/modern.webp',
		},
		{
			name: 'Industrial',
			image: '/industrial.webp',
		},
		{
			name: 'Bohemian',
			image: '/bohemian.webp',
		},
		{
			name: 'Traditional',
			image: '/traditional.webp',
		},
		{
			name: 'Rustic',
			image: '/rustic.webp',
		},
		{
			name: 'Minimalist',
			image: '/minimalist.webp',
		},
	]

	const [selectedOption, setSelectedOption] = useState('')

  return (
    <div className='mt-5'>
			<label className='text-gray-500'>Selecciona El Tipo De Diseño *</label>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-y-4'>
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