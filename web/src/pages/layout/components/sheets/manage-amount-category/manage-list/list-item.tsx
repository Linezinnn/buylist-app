import { useState } from "react";
import { Trash } from "lucide-react";

import { useDeleteAmountCategory } from "@/http/delete-amount-category";

import { useConfirmDialog } from "@/components/dialogs";
import { Loading } from "@/components/loading";
import { TableCell, TableRow } from "@/components/ui/table";

interface ManageListItemProps {
  name: string,
  id: string,
}

export function ManageListItem({ id, name }: ManageListItemProps) {
  const [isLoadingDeleting, setIsLoadingDeleting] = useState<boolean>(false)

  const { ConfirmDialogComponent, constructConfirmDialog } = useConfirmDialog()
  const { deleteAmountCategory } = useDeleteAmountCategory()

  function handleDeleteItemCategory(id: string) {
    constructConfirmDialog({
      title: 'Você tem certeza?',
      description: 'Você confirma que deseja deletar esta categoria? Esta ação é irreversível e será executada após a confirmação.',
      onClickConfirm: () => {
        setIsLoadingDeleting(true)
    
        deleteAmountCategory.mutate({ params: { id }, data: { skipChecks: true } }, {
          onSuccess: () => setIsLoadingDeleting(false)
        })
      },
    })
  }

  return (
    <>
      {ConfirmDialogComponent}
      <TableRow>
        <TableCell>
          {name}
        </TableCell>
        <TableCell className="flex justify-end">
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