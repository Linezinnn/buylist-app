import { ToggleThemeMenu } from "../../components/toggle-theme-menu"

import { CreateItemForm } from "./components/create-item-form"
import { ItemsTable } from "./components/items-table"

export function BuyListPage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col py-8 px-6 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-3xl">Lista de Compras</h1>
        <ToggleThemeMenu />
      </div>

      <CreateItemForm />
      <ItemsTable />
    </div>
  )
}