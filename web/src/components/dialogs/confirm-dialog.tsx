import { ReactNode, useState } from "react";
import { 
  AlertDialog, 
  AlertDialogFooter, 
  AlertDialogHeader,  
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogTitle, 
} from "@/components/ui/alert-dialog";

interface ConstructConfirmDialogProps {
  onClickConfirm: () => any,
  onClickCancel?: () => any,
  title: ReactNode,
  description: ReactNode,
}

export function useConfirmDialog() {
  const [ open, setOpen ] = useState<boolean>(false)

  const [ cancelMethod, setcancelMethod ] = useState({ handle: () => {} })
  const [ confirmMethod, setConfirmMethod ] = useState({ handle: () => {} })
  const [ title, setTitle ] = useState<ReactNode>(null)
  const [ description, setDescription ] = useState<ReactNode>(null)

  const handleConfirm = () => {
    setOpen(false)
    confirmMethod.handle()
  }

  const handleCancel = () => {
    setOpen(false)
    cancelMethod.handle()
  }

  function constructConfirmDialog({ 
    onClickConfirm, 
    onClickCancel = () => {}, 
    title, 
    description 
  }: ConstructConfirmDialogProps) {
    setOpen(true)
    setConfirmMethod({ handle: onClickConfirm})
    setcancelMethod({ handle: onClickCancel })
    setTitle(title)
    setDescription(description)
  }

  const ConfirmDialogComponent = (
    <AlertDialog open={open}>
      <AlertDialogContent handleChangeOpen={handleCancel}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { constructConfirmDialog, ConfirmDialogComponent }
}