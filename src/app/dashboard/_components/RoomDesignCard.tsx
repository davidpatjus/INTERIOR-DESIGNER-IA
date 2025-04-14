import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import { RoomType } from "./Listing"
import { useState } from 'react';
import AiOutputDialog from './AiOutputDialog';
function RoomDesignCard({ room }: { room: RoomType }) {

  const [openDialog, setOpenDialog] = useState(false);

  // const onClickHandler = () => {
  //   setOpenDialog(true);
  // }

  const closeDialog = () => {
    setOpenDialog(false);
  }

  return (
    // TODO: Add onClick handler
    <div className='shadow-md rounded-md cursor-pointer'> 
      <ReactBeforeSliderComponent
        firstImage={{
          imageUrl: room.orgImage,
        }}
        secondImage={{
          imageUrl: room.aiImage,
        }}
      />
      <div className='p-4'>
        <h2 className="text-primary text-md font-medium mb-1">🏠 Interior de {room.roomType}</h2>
        <h2 className='text-sm font-medium'>🎨 Diseño de {room.designType}</h2>
      </div>

      <AiOutputDialog
        aiImageUrl={room.aiImage}
        orgImageUrl={room.orgImage}
        openDialog={openDialog}
        closeDialog={closeDialog}
      />

    </div>
  )
}

export default RoomDesignCard