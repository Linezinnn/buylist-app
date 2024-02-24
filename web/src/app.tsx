import { BuyListPage } from "./pages/buy-list"
import { LayoutHeader } from "./pages/layout/header"

import { ConnectionErrorAlert } from "./components/alerts"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <>
      <LayoutHeader>
        <ConnectionErrorAlert />
        <BuyListPage />
      </LayoutHeader>
      <Toaster />
    </>
  )
}

export default App
