import { useGetAmountCategories } from "@/http/get-amount-categories";

import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Loading } from "@/components/loading";
import { ManageListItem } from "./list-item";

export function ManageAmountCategoryList() {
  const { data: amountCategoriesData, isLoading: isLoadingData } = useGetAmountCategories()

  return (
    <div className="flex flex-col w-full space-y-2">
      <h6 className="font-semibold flex gap-2">
        Listagem {isLoadingData && <Loading />}
      </h6>
      
      {amountCategoriesData ? (
        <div className="rounded-lg border flex">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {amountCategoriesData.map((amountCategory) => (
                <ManageListItem 
                  name={amountCategory.name}
                  id={amountCategory.id}
                  key={amountCategory.id}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (!isLoadingData && (
        <p>Nenhum item foi encontrado.</p>
      ))}
    </div>
  )
}