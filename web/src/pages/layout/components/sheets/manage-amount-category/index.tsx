import { useState } from "react";

import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { CreateAmountCategoryForm } from "./create-amount-category-form";
import { ManageAmountCategoryList } from "./manage-list";

export function useManageAmountCategorySheet() {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenCallback = () => setOpen(!open)

  return {
    ManageAmountCategorySheet: (
      <Sheet open={open}>
        <SheetContent handleChangeOpen={handleOpenCallback} className="space-y-6 overflow-y-scroll">
          <SheetHeader>
            <SheetTitle className="flex">
              Categorias de Quantidade
            </SheetTitle>
            <SheetDescription className="flex text-left">
              Gerencie a remoção, listagem e criação de categorias de quantidade.
            </SheetDescription>
          </SheetHeader>

          <SheetFooter>
            <div className="flex flex-col space-y-6 w-full">
              <CreateAmountCategoryForm />
              <ManageAmountCategoryList />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
    handleOpenCallback,
  }
}