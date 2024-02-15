import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Button } from "../../../components/ui/button"
import { ItemDTOPostSchema } from "@/packages/@buylist-api/schemas/item-schema"
import { ItemPostType } from "@/types/item-types"

export function CreateItemForm() { 
  const createItemForm = useForm<ItemPostType>({
    resolver: zodResolver(ItemDTOPostSchema),
    defaultValues: {
      name: '',
      amount: 0,
      amountCategoryId: 'un',
      itemCategoryId: '',
    }
  })

  function handleSubmit(data: ItemPostType) {
    console.log(data)
  }

  return (
    <Form {...createItemForm}>
        <form onSubmit={createItemForm.handleSubmit(handleSubmit)} className="flex flex-col gap-3 md:grid md:grid-cols-8 md:gap-2">
          <FormField 
            control={createItemForm.control}
            name="name"
            render={({field}) => (
              <FormItem className="col-span-3">
                <FormControl>
                  <Input 
                    placeholder="Nome do item" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex-col col-span-2 gap-2 space-y-2">
            <div className="flex gap-0.5">
              <FormField 
                control={createItemForm.control}
                name="amount"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input 
                        type="number"
                        className="rounded-r-none "
                        placeholder="Quantidade" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={createItemForm.control}
                name="amountCategoryId"
                render={({field}) => (
                  <FormItem className="w-full">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-l-none">
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                      </FormControl>
                        <SelectContent>
                          <SelectItem value="un">Unidade</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField 
            control={createItemForm.control}
            name="itemCategoryId"
            render={({field}) => (
              <FormItem className="col-span-2">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
            />
            <Button className="px-3">Criar</Button>
        </form>
      </Form>
  )
}