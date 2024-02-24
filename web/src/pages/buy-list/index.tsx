import { CreateItemForm } from "./components/create-item-form"
import { ItemsTable } from "./components/items-table"

export function BuyListPage() {
  return (
    <>
      <CreateItemForm />
      <ItemsTable />
    </>
  )
}