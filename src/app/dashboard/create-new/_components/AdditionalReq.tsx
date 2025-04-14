import { Textarea } from '@/components/ui/textarea';
import React from 'react'

function AdditionalReq({ selectedAdditionalReq }: { selectedAdditionalReq: (additionalReq: string) => void }) {
  return (
    <div className='mt-5'>
			<label className='text-gray-500'>Ingresa Los Requerimientos Adicionales (Opcional)</label>
      <Textarea className='mt-2' onChange={(e) => selectedAdditionalReq(e.target.value)} />
    </div>
  )
}

export default AdditionalReq;