import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

function AiOutputDialog({
  openDialog,
  closeDialog,
  orgImageUrl,
  aiImageUrl,
}: {
  openDialog: boolean;
  closeDialog: () => void;
  orgImageUrl: string;
  aiImageUrl: string;
}) {
  return (
    <div>
      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resultado de la generación</AlertDialogTitle>
            <ReactBeforeSliderComponent
              firstImage={{
                imageUrl: orgImageUrl,
              }}
              secondImage={{
                imageUrl: aiImageUrl,
              }}
            />
            <Button onClick={() => closeDialog()}>Cerrar</Button>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AiOutputDialog;
