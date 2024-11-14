import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/state-manager/hook";
import {
  deleteProduct,
  fetchProducts,
  OnlyFeatured,
  PriceLessThanValue,
  RatingHigherThanValue,
} from "@/state-manager/slices/productSlice";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/helper/Loader";
import { Trash } from "lucide-react";
import { UpdateProductDialog } from "./update-product";

export default function ProductsPage() {
  const { isLoading, products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchProducts()).unwrap()
      .then(() => {
        toast({ title: "Fetched products successfully" });
      })
      .catch((error) => {
        toast({ title: error, variant: "destructive" });
      });
  }, []);

  const handleFeatured = () => {
    const newFeaturedState = !isFeatured;
    setIsFeatured(newFeaturedState);

    if (newFeaturedState) {
      dispatch(OnlyFeatured()).unwrap()
        .then(() => toast({ title: "Fetched only featured products" }))
        .catch((error) => toast({ title: error, variant: "destructive" }));
    } else {
      dispatch(fetchProducts()).unwrap()
        .then(() => toast({ title: "Fetched all products successfully" }))
        .catch((error) => toast({ title: error, variant: "destructive" }));
    }
  };

  useEffect(() => {
    dispatch(PriceLessThanValue(maxPrice)).unwrap()
      .then(() => toast({ title: "Fetched products under max price" }))
      .catch((error) => toast({ title: error, variant: "destructive" }));
  }, [maxPrice]);

  useEffect(() => {
    dispatch(RatingHigherThanValue(minRating)).unwrap()
      .then(() => toast({ title: "Fetched products with minimum rating" }))
      .catch((error) => toast({ title: error, variant: "destructive" }));
  }, [minRating]);

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId)).unwrap()
      .then(() => {
        toast({ title: "Product deleted successfully" });
        dispatch(fetchProducts()).unwrap()
          .then(() => toast({ title: "Fetched products successfully" }))
          .catch((error) => toast({ title: error, variant: "destructive" }));
      })
      .catch((err) => toast({ title: err, variant: "destructive" }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 justify-center">
        <div className="w-full md:w-1/3">
          <Label htmlFor="price-filter">Max Price: ${maxPrice}</Label>
          <Slider
            id="price-filter"
            min={0}
            max={200}
            step={1}
            value={[maxPrice]}
            onValueChange={(value) => setMaxPrice(value[0])}
          />
        </div>

        <div className="flex items-center space-x-3">
          <Switch
            id="featured-filter"
            checked={isFeatured}
            onCheckedChange={handleFeatured}
          />
          <Label htmlFor="featured-filter">Featured Only</Label>
        </div>

        <div className="w-full md:w-1/3">
          <Label htmlFor="rating-filter">Min Rating: {minRating}</Label>
          <Slider
            id="rating-filter"
            min={0}
            max={5}
            step={0.5}
            value={[minRating]}
            onValueChange={(value) => setMinRating(value[0])}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-700 text-lg font-medium">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Product ID: {product.productId}</p>
              <p className="text-sm text-gray-500">Rating: {product.rating}</p>
              {product.featured && (
                <span className="mt-2 inline-block bg-yellow-300 text-yellow-900 text-xs px-3 py-1 rounded-full">
                  Featured
                </span>
              )}

              {isLoggedIn && (
                <div className="mt-4 flex justify-between items-center">
                  <UpdateProductDialog product={product} />
                  <Trash
                    onClick={() => handleDelete(product._id)}
                    className="h-5 w-5 text-red-500 cursor-pointer"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
}
