import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog"
import Image from "next/image"

function CustomLoading({ loading }: { loading: boolean }) {
  return (
		<AlertDialog open={loading}>
			<AlertDialogContent>
				<div className="bg-white flex flex-col my-10 items-center justify-center">
					<Image src={'/customLoader.gif'} alt="Loading" width={100} height={100} />
					<h2 className="text-2xl font-bold">Generando... no recargues la pagina.</h2>
				</div>
			</AlertDialogContent>
		</AlertDialog>
  )
}

export default CustomLoading