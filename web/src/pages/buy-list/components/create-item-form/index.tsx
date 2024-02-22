import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ItemPostType } from "@/types/item-types"

import { useCreateItem } from "@/http/create-item"
import { ItemDTOPostSchema } from "@/packages/@buylist-api/schemas/item-schema"
import { messages } from "@/packages/@buylist-api/schemas/messages"
import { DefaultErrorType } from "@/packages/@buylist-api/response-data-formats"
import { responseMessages } from "@/packages/@buylist-api/response-messages"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ItemCategorySelect } from "./item-category-select"
import { AmountCategorySelect } from "./amount-category-select"
import { Loading } from "@/components/loading"

export function CreateItemForm() { 
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  const createItemForm = useForm<ItemPostType>({
    resolver: zodResolver(ItemDTOPostSchema),
    defaultValues: {
      name: '',
      amount: 0,
      itemCategoryId: '',
      amountCategoryId: '',
    }
  })

  const { createItem } = useCreateItem()

  useEffect(() => {
    setIsLoading(createItem.isLoading)
  }, [createItem])

  function handleSubmit(data: ItemPostType) {
    createItem.mutate({ data }, {
      onError: (error) => {
        const { $message } = error.response?.data as DefaultErrorType
      
        if($message == responseMessages.NAME_ALREADY_EXISTS) {
          createItemForm.setError('name', { 
            message: messages.NAME_ALREADY_EXISTS.PT
          })
        }
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
              <FormMessage className="px-1" />
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
                  <FormMessage className="px-1" />
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

          <Button className="px-3">
            {isLoading ? (
              <Loading />
            ) : (
              <p>Criar</p>
            )}
          </Button>
      </form>
    </Form>
  )
}