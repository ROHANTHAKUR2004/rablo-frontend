"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/state-manager/hook";
import { Register } from "@/state-manager/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/helper/Loader";
import { Link, useNavigate } from "react-router-dom";

const registrationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type RegistrationFormSchema = z.infer<typeof registrationSchema>;

export default function StylishRegistrationForm() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.auth);
  const form = useForm<RegistrationFormSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegistrationFormSchema) => {
    dispatch(Register(data))
      .unwrap()
      .then(() => {
        toast({
          title: "Your account has been created successfully",
        });
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: error,
        });
      });
    form.reset(); // Reset form after submission
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-gray-300 transition-all duration-300 focus:ring-2 focus:ring-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="border-gray-300 transition-all duration-300 focus:ring-2 focus:ring-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="border-gray-300 transition-all duration-300 focus:ring-2 focus:ring-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-900 transition-all duration-300"
              >
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
