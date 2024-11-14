// import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/state-manager/hook";
import Loader from "@/helper/Loader";
import { createProduct } from "@/state-manager/slices/productSlice";

const productSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  featured: z.boolean(),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  company: z.string().min(1, "Company name is required"),
});
export type productType = z.infer<typeof productSchema>;

export default function CreateProductPage() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.product);
  //   const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
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
  });

  function onSubmit(values: z.infer<typeof productSchema>) {
    dispatch(createProduct(values))
      .unwrap()
      .then(() => {
        toast({
          title: "Product Created",
          description: "Your product has been successfully created.",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  }

  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       form.setValue("productImage", file);
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setImagePreview(reader.result as string);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Featured</FormLabel>
                  <FormDescription>
                    Mark this product as featured
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
                  <Slider
                    min={0}
                    max={5}
                    step={0.1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
                <FormDescription>
                  Current rating: {field.value.toFixed(1)}
                </FormDescription>
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
          {/* <FormField
            control={form.control}
            name="productImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImageChange(e);
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload a product image (max 5MB, .jpg, .jpeg, .png, .webp)
                </FormDescription>
                <FormMessage />
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="max-w-full h-auto max-h-64 rounded-lg"
                    />
                  </div>
                )}
              </FormItem>
            )}
          /> */}
          <Button type="submit">Create Product</Button>
        </form>
      </Form>
    </div>
  );
}
