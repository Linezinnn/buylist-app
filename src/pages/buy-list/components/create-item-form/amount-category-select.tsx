import { useEffect } from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";

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
  
  const { setValue } = useFormContext()

  useEffect(() => {
    const defaultValue = amountCategoriesData?.find(amountCategory => amountCategory.name === 'Unidades')
    
    if(defaultValue) {
      setValue("amountCategoryId", defaultValue.id)
    }
  }, [setValue, amountCategoriesData])

  return (
    <FormItem className="w-full">             
      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
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
          {amountCategoriesData?.map(amountCategory => (
            <SelectItem value={amountCategory.id} key={amountCategory.id}>
              {amountCategory.name}
            </SelectItem>
          ))}   
        </SelectContent>
      </Select>
      <FormMessage className="px-1" />
    </FormItem>
  )
}