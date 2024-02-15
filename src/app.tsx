import { ToggleThemeMenu } from "./components/toggle-theme-menu"

import { CreateItemForm } from "./pages/buy-list/components/create-item-form"
import { ItemsTable } from "./pages/buy-list/components/items-table"

function App() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col py-8 px-6 gap-4">
      <div className="flex justify-between">
        <h1 className="text-4xl md:text-3xl">Lista de Compras</h1>
        <ToggleThemeMenu />
      </div>

      <CreateItemForm />
      <ItemsTable />
    </div>
  )
}

export default App
