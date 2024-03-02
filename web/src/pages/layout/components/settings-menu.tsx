import { LucideSettings, Plus } from "lucide-react"

import { useManageItemCategorySheet } from "./sheets/manage-item-category"
import { useManageAmountCategorySheet } from "./sheets/manage-amount-category"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function SettingsMenu() {
  const { ManageItemCategorySheet, handleOpenCallback: openManageItemCategorySheet } = useManageItemCategorySheet()
  const { ManageAmountCategorySheet, handleOpenCallback: openManageAmountCategorySheet } = useManageAmountCategorySheet()

  return (
    <>
      {ManageItemCategorySheet}
      {ManageAmountCategorySheet}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <LucideSettings size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex gap-2" onClick={openManageItemCategorySheet}>
            <Plus size={16} />
            Cateogrias de item
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2" onClick={openManageAmountCategorySheet}>
            <Plus size={16} />
            Categorias de quantidade
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}