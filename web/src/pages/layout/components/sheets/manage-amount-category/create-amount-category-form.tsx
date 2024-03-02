import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AmountCategoryPostType } from "@/types/amount-category-types";

import { useCreateAmountCategory } from "@/http/create-amount-category";
import { AmountCategoryDTOPostSchema } from "@/packages/@buylist-api/schemas/amount-category-schema";

import { Loading } from "@/components/loading";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function CreateAmountCategoryForm() {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  const createAmountCategoryForm = useForm<AmountCategoryPostType>({
    resolver: zodResolver(AmountCategoryDTOPostSchema),
    defaultValues: {
      name: '',
    }
  })

  const { createAmountCategory } = useCreateAmountCategory()

  useEffect(() => {
    setIsLoading(createAmountCategory.isLoading)
  }, [createAmountCategory])

  function handleSubmit(data: AmountCategoryPostType) {
    createAmountCategory.mutate({ data }, {
      onSuccess: () => {
        createAmountCategoryForm.reset()
      },
    }) 
  }

  return (
    <div className="space-y-2">
      <h6 className="font-semibold">Criar</h6>

      <Form {...createAmountCategoryForm}>
        <form 
          onSubmit={createAmountCategoryForm.handleSubmit(handleSubmit)} 
          className="space-y-4"
        >
          <FormField 
            control={createAmountCategoryForm.control}
            name="name"
            render={({field}) => (
              <FormItem className="col-span-5">
                <Label className="text-zinc-500">
                  Nome
                </Label>
                <FormControl>
                  <Input 
                    placeholder="Nome da categoria de quantidade" 
                    {...field}
                  />
                </FormControl>
                <FormMessage className="px-1" />
              </FormItem>
            )}
          />

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