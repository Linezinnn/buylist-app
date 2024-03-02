import { useState } from "react";
import { Trash } from "lucide-react";

import { useConfirmDialog } from "@/components/dialogs";

import { ColorDisplay } from "@/components/color-display";
import { Loading } from "@/components/loading";
import { TableCell, TableRow } from "@/components/ui/table";
import { useDeleteItemCategory } from "@/http/delete-item-category";

interface ManageListItemProps {
  color: string,
  name: string,
  id: string,
}

export function ManageListItem({ color, id, name }: ManageListItemProps) {
  const [isLoadingDeleting, setIsLoadingDeleting] = useState<boolean>(false)

  const { ConfirmDialogComponent, constructConfirmDialog } = useConfirmDialog()
  const { deleteItemCategory } = useDeleteItemCategory()

  function handleDeleteItemCategory(id: string) {
    constructConfirmDialog({
      title: 'Você tem certeza?',
      description: 'Você confirma que deseja deletar esta categoria? Esta ação é irreversível e será executada após a confirmação.',
      onClickConfirm: () => {
        setIsLoadingDeleting(true)
    
        deleteItemCategory.mutate({ params: { id }, data: { skipChecks: true } }, {
          onSuccess: () => setIsLoadingDeleting(false)
        })
      },
    })
  }

  return (
    <>
      {ConfirmDialogComponent}
      <TableRow>
        <TableCell className="flex gap-2 items-center p-auto">
          <ColorDisplay 
            color={color} 
          />
          {color}
        </TableCell>
        <TableCell>
          {name}
        </TableCell>
        <TableCell>
          <button onClick={() => handleDeleteItemCategory(id)}>
            {isLoadingDeleting ? <Loading /> : (
              <Trash size={16} className="cursor-pointer text-red-500" />
            )}
          </button>
        </TableCell>
      </TableRow>
    </>
  )
}