import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ItemPostType } from "@/types/item-types"

import { useCreateItem } from "@/http/create-item"
import { ItemDTOPostSchema } from "@/packages/@buylist-api/schemas/item-schema"
import { messages } from "@/packages/@buylist-api/schemas/messages"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ItemCategorySelect } from "./item-category-select"
import { AmountCategorySelect } from "./amount-category-select"

export function CreateItemForm() { 
  const createItemForm = useForm<ItemPostType>({
    resolver: zodResolver(ItemDTOPostSchema),
    defaultValues: {
      name: '',
      amount: 0,
    }
  })

  const { createItem } = useCreateItem()

  function handleSubmit(data: ItemPostType) {
    createItem.mutate({ data }, {
      onError: () => {
        createItemForm.setError('name', { 
          message: messages.NAME_ALREADY_EXISTS.PT
        })
      },
      onSuccess: () => {
        createItemForm.reset()
      },
    })
  }

  return (
    <Form {...createItemForm}>
      <form 
        onSubmit={createItemForm.handleSubmit(handleSubmit)} 
        className="flex flex-col gap-3 md:grid md:grid-cols-8 md:gap-2"
      >
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
                      className="rounded-r-none"
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
                <AmountCategorySelect field={field} />
              )}
            />
          </div>
        </div>
      
        <FormField 
          control={createItemForm.control}
          name="itemCategoryId"
          render={({field}) => (
            <ItemCategorySelect field={field} />
          )}
          />

          <Button className="px-3">Criar</Button>
      </form>
    </Form>
  )
}