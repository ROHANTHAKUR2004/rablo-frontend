"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/state-manager/hook";
import { Login } from "@/state-manager/slices/authSlice";
import Loader from "@/helper/Loader";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock } from 'lucide-react';

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export default function LoginPage() {
  const { isLoading } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    dispatch(Login(data))
      .unwrap()
      .then(() => {
        toast({
          title: "Logged in successfully",
        });
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8 text-white">
          <h2 className="mt-6 text-5xl font-extrabold">Welcome Back</h2>
          <p className="text-xl">
            Sign in to your account and continue your journey with us.
          </p>
        </div>
      </div>
      <div className="md:w-1/2 bg-background flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-foreground">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          placeholder="Enter your email"
                          {...field}
                          className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-all duration-300"
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
                    <FormLabel className="text-foreground/80">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-all duration-300"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary/80">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Sign in"}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}