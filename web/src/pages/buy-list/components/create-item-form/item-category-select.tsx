import { ControllerRenderProps } from "react-hook-form"

import { ItemPostType } from "@/types/item-types"

import { useGetItemCategories } from "@/http/get-item-categories"

import { FormControl, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ColorDisplay } from "@/components/color-display"
import { Loading } from "@/components/loading"

interface SelectProps {
  field: ControllerRenderProps<ItemPostType, 'itemCategoryId'>
}

export function ItemCategorySelect({ field }: SelectProps) {
  const { data: itemCategoriesData, isLoading } = useGetItemCategories()

  return (
    <FormItem className="col-span-2">             
      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
        <FormControl>
          <SelectTrigger>
            {isLoading ? (
              <Loading />
            ) : (
              <SelectValue placeholder="Categoria" />
            )}
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {itemCategoriesData?.map(itemCategory => (
            <SelectItem value={itemCategory.id} key={itemCategory.id}>
              <div className="flex gap-2 items-center pl-1">
                <ColorDisplay 
                  color={itemCategory.color}
                />
                {itemCategory.name}
              </div>
            </SelectItem>
          ))}   
        </SelectContent>
      </Select>
      <FormMessage className="px-1" />
    </FormItem>
  )
}