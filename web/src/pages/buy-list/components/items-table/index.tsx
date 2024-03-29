import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Loading } from "@/components/loading"
import { useGetItems } from "@/http/get-items"
import { ItemCell } from "./item-cell"

export function ItemsTable() {
  const { data: itemsData, isLoading } = useGetItems()

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : <> 
        {itemsData ? (
          <div className="rounded-lg p-2 border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1"></TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Categoria</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  itemsData?.sort((a, b) => {
                    return a.isChecked === b.isChecked ? 
                      new Date(a.createdAt) > new Date(b.createdAt) ?
                        -1 : 1 : a.isChecked ? 1 : -1
                  }).map((item) => (
                    <ItemCell 
                      name={item.name}
                      amount={item.amount}
                      amountCategory={{ name: item.amountCategory.name }}
                      itemCategory={{ name: item.itemCategory.name, color: item.itemCategory.color }}
                      isChecked={item.isChecked}
                      id={item.id}
                      key={item.id}
                    />
                  ))
                }
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="self-center py-4">Nenhum item foi encontrado.</p>
        )}
        </>
      }
    </>
  )
}