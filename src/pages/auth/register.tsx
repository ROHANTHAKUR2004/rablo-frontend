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
import { useAppDispatch, useAppSelector } from "@/state-manager/hook";
import { Register } from "@/state-manager/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/helper/Loader";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, User, Mail, Lock } from 'lucide-react';

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
    form.reset();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8 text-white">
          <h2 className="mt-6 text-5xl font-extrabold">Welcome</h2>
          <p className="text-xl">
            Join our community and start your journey with us today.
          </p>
        </div>
      </div>
      <div className="md:w-1/2 bg-background flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-foreground">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          {...field}
                          className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-all duration-300"
                          placeholder="Enter your name"
                        />
                      </div>
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
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          {...field}
                          type="email"
                          className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
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
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          {...field}
                          type="password"
                          className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-all duration-300"
                          placeholder="Create a password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 flex items-center justify-center"
              >
                Create Account
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}