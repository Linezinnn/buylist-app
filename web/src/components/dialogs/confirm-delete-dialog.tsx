import { useState } from "react";
import { 
  AlertDialog, 
  AlertDialogFooter, 
  AlertDialogHeader,  
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

interface ConstructConfirmDeleteDialogProps {
  onClickConfirm: () => any,
  onClickCancel?: () => any,
}

export function useConfirmDeleteDialog() {
  const [ open, setOpen ] = useState<boolean>(false)

  const [ cancelMethod, setcancelMethod ] = useState({ handle: () => {} })
  const [ confirmMethod, setConfirmMethod ] = useState({ handle: () => {} })

  const handleConfirm = () => {
    setOpen(false)
    confirmMethod.handle()
  }

  const handleCancel = () => {
    setOpen(false)
    cancelMethod.handle()
  }

  function constructConfirmDeleteDialog({ onClickConfirm, onClickCancel = () => {} }: ConstructConfirmDeleteDialogProps) {
    setOpen(true)
    setConfirmMethod({ handle: onClickConfirm})
    setcancelMethod({ handle: onClickCancel })
  }

  const ConfirmDeleteDialogComponent = (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Você confirma que deseja deletar esta categoria? Esta ação é irreversível e será executada após a confirmação.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { constructConfirmDeleteDialog, ConfirmDeleteDialogComponent }
}