import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/state-manager/hook";
import { updateProduct } from "@/state-manager/slices/productSlice";
import { Product } from "@/types/product-types/productSlice";

export const updateproductSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  featured: z.boolean(),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  company: z.string().min(1, "Company name is required"),
});

type UpdateProductDialogProps = {
  product: Product;
};

export function UpdateProductDialog({ product }: UpdateProductDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof updateproductSchema>>({
    resolver: zodResolver(updateproductSchema),
    defaultValues: {
      name: product.name,
      productId: product.productId,
      price: product.price,
      rating: product.rating,
      featured: product.featured,
      company: product.company,
    },
  });

  function onSubmit(values: z.infer<typeof updateproductSchema>) {
    dispatch(updateProduct({ productId: product._id, data: values })).unwrap()
      .then(() => {
        toast({ title: "Product updated successfully" });
        setOpen(false);
      })
      .catch(() => {
        toast({ title: "Failed to update product", variant: "destructive" });
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
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

            <Button type="submit">Update Product</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
