import { useGetItemCategories } from "@/http/get-item-categories"

import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Loading } from "@/components/loading";
import { ManageListItem } from "./list-item";

export function ManageItemCategoryList() {
  const { data: itemCategoriesData, isLoading: isLoadingData } = useGetItemCategories()

  return (
    <div className="flex flex-col w-full space-y-2">
      <h6 className="font-semibold flex gap-2">
        Listagem {isLoadingData && <Loading />}
      </h6>
      
      {itemCategoriesData ? (
        <div className="rounded-lg border flex">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cor</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {itemCategoriesData.map((itemCategory) => (
                <ManageListItem 
                  color={itemCategory.color}
                  name={itemCategory.name}
                  id={itemCategory.id}
                  key={itemCategory.id}
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