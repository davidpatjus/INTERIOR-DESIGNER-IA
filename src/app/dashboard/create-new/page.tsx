"use client";
import React, { useEffect, useState } from 'react'
import ImageSelectionSection from './_components/ImageSelectionSection';
import RoomType from './_components/RoomType';
import DesignType from './_components/DesignType';
import AdditionalReq from './_components/AdditionalReq';
import { Button } from '@/components/ui/button';

function CreateNew() {

  const [formData, setFormData]=useState([  ]);

  const onHandleInputChange = (value, fieldName) => {
    setFormData(prev=>({
      ...prev,
      [fieldName]: value
    }))
  }
  
  // Para depuración (ver cambios en formData)
  useEffect(() => {
    console.log("formData actualizado:", formData);
  }, [formData]);

  return (
    <div>
      
      {/* Primary Section */}
      <h2 className='font-bold text-4xl text-primary text-center'>Experimenta la magia de la remodelación con IA</h2>
      <p className='text-center text-gray-500'>Transforme cualquier habitación con un clic. Selecciona un espacio, elige un estilo y observa cómo la IA reimagina tu entorno al instante.</p>

      {/* Grid Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>

        {/* Image Selection */}
        <ImageSelectionSection selectedImage={(value) => onHandleInputChange(value, 'image')} />

        {/* Form Input Section */}
        <div>

          {/* Room Type */}
          <RoomType selectedRoomType={(value)=> onHandleInputChange(value, 'roomType')} />

          {/* Design Type */}
          <DesignType selectedDesignType={(value)=> onHandleInputChange(value, 'designType')} />

          {/* Additional Requeriment TextArea (Optional) */}
          <AdditionalReq selectedAdditionalReq={(value)=> onHandleInputChange(value, 'additionalReq')} />

          {/* Button to Generate Image */}
          <Button className='w-full mt-5'>Generar</Button>
          <p className='text-sm text-gray-400 mb-20 mt-1'>NOTA: Se usara 1 credito por cada generación</p>

        </div>

      </div>

    </div>
  )
}

export default CreateNew;