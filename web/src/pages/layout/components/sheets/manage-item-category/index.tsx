import { useState } from "react";

import { ManageItemCategoryList } from "./manage-list";
import { CreateItemCategoryForm } from "./create-item-category-form";

import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";

export function useManageItemCategorySheet() {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenCallback = () => setOpen(!open)

  return {
    ManageItemCategorySheet: (
      <Sheet open={open}>
        <SheetContent handleChangeOpen={handleOpenCallback} className="space-y-6 overflow-y-scroll">
          <SheetHeader>
            <SheetTitle className="flex">
              Categorias de Item
            </SheetTitle>
            <SheetDescription className="flex text-left">
              Gerencie a remoção, listagem e criação de categorias de item.
            </SheetDescription>
          </SheetHeader>

          <SheetFooter>
            <div className="flex flex-col space-y-6 w-full">
              <CreateItemCategoryForm />
              <ManageItemCategoryList />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
    handleOpenCallback,
  }
}