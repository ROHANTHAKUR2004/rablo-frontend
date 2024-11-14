'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { useAppDispatch, useAppSelector } from "@/state-manager/hook"
import { createProduct } from "@/state-manager/slices/productSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Star } from 'lucide-react'

const productSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  featured: z.boolean(),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  company: z.string().min(1, "Company name is required"),
})

export type productType = z.infer<typeof productSchema>

export default function CreateProductPage() {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.product)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productId: "",
      name: "",
      price: 0,
      featured: false,
      rating: 0,
      company: "",
    },
  })

  function onSubmit(values: z.infer<typeof productSchema>) {
    dispatch(createProduct(values))
      .unwrap()
      .then(() => {
        toast({
          title: "Product Created",
          description: "Your product has been successfully created.",
        })
        form.reset()
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        })
      })
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create New Product</CardTitle>
          <CardDescription>Fill in the details to add a new product to your inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Featured Product</FormLabel>
                      <FormDescription>
                        Mark this product as featured to highlight it in your store
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={0}
                          max={5}
                          step={0.1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex items-center justify-between">
                          <Label>0</Label>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= field.value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <Label>5</Label>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Current rating: {field.value.toFixed(1)}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Product...
                  </>
                ) : (
                  'Create Product'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}