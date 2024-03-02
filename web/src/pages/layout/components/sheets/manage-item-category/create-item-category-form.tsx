import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ItemCategoryPostType } from "@/types/item-category-types";
import { ItemCategoryDTOPostSchema } from "@/packages/@buylist-api/schemas/item-category-schema";

import { useCreateItemCategory } from "@/http/create-item-category"; 

import { Loading } from "@/components/loading";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function CreateItemCategoryForm() {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  const createItemCategoryForm = useForm<ItemCategoryPostType>({
    resolver: zodResolver(ItemCategoryDTOPostSchema),
    defaultValues: {
      color: '#000000',
      name: '',
    }
  })

  const { createItemCategory } = useCreateItemCategory()

  useEffect(() => {
    setIsLoading(createItemCategory.isLoading)
  }, [createItemCategory])

  function handleSubmit(data: ItemCategoryPostType) {
    createItemCategory.mutate({ data }, {
      onSuccess: () => {
        createItemCategoryForm.reset()
      },
    }) 
  }

  return (
    <div className="space-y-2">
      <h6 className="font-semibold">Criar</h6>

      <Form {...createItemCategoryForm}>
        <form 
          onSubmit={createItemCategoryForm.handleSubmit(handleSubmit)} 
          className="space-y-4"
        >
          <div className="grid flex-col grid-cols-6 gap-2">
            <FormField 
              control={createItemCategoryForm.control}
              name="color"
              render={({field}) => (
                <FormItem className="col-span-1">
                  <Label className="text-zinc-500">
                    Cor
                  </Label>
                  <FormControl>
                    <Input 
                      type="color"
                      className="flex cursor-pointer webkit-switch-color webkit-switch-color-wrapper w-full p-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="px-1" />
                </FormItem>
              )}
            />

            <FormField 
              control={createItemCategoryForm.control}
              name="name"
              render={({field}) => (
                <FormItem className="col-span-5">
                  <Label className="text-zinc-500">
                    Nome
                  </Label>
                  <FormControl>
                    <Input 
                      placeholder="Nome da categoria de item" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="px-1" />
                </FormItem>
              )}
            />
          </div>

          <Button className="flex w-full">
            {isLoading ? (
              <Loading />
            ) : (
              <p>Adicionar</p>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}