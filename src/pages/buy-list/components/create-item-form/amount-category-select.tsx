import { ControllerRenderProps } from "react-hook-form";

import { ItemPostType } from "@/types/item-types";

import { useGetAmountCategories } from "@/http/get-amount-categories";

import { FormControl, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loading } from "@/components/loading"

interface SelectProps {
  field: ControllerRenderProps<ItemPostType, 'amountCategoryId'>
}

export function AmountCategorySelect({ field }: SelectProps) {
  const { data: amountCategoriesData, isLoading } = useGetAmountCategories()
    
  return (
    <FormItem className="w-full">             
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            {isLoading ? (
              <Loading />
            ) : (
              <SelectValue 
                placeholder="Medida"
              />
            )}
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="aaa" >AAAA</SelectItem>
          {amountCategoriesData?.map(amountCategory => (
            <SelectItem value={amountCategory.id} key={amountCategory.id}>
              {amountCategory.name}
            </SelectItem>
          ))}   
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )
}