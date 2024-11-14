"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Menu } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state-manager/hook";
import { Logout } from "@/state-manager/slices/authSlice";
import { toast } from "@/hooks/use-toast";

export default function Navbar() {
  const { isLoggedIn, userinfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(Logout())
      .unwrap()
      .then(() => {
        toast({ title: "Logged out successfully" });
      })
      .catch((error) => {
        toast({ title: error, variant: "destructive" });
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <img className="h-10 w-auto" src="/logo.svg" alt="Logo" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-purple-300 px-4 py-2 rounded-md text-sm font-medium transition-all"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-purple-300 px-4 py-2 rounded-md text-sm font-medium transition-all"
            >
              About
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-purple-300 px-4 py-2 rounded-md text-sm font-medium transition-all"
            >
              Products
            </Link>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 p-0 rounded-full">
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarImage src="/avatar.png" alt="User avatar" />
                      <AvatarFallback>{userinfo?.email.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-semibold">{userinfo?.name}</p>
                      <p className="text-xs text-gray-500">{userinfo?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/create")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Create product</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Log in
                </Button>
                <Button onClick={() => navigate("/register")}>Sign up</Button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={toggleMenu}>
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 transition-all ease-in-out">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              className="block text-white hover:bg-purple-300 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-white hover:bg-purple-300 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/products"
              className="block text-white hover:bg-purple-300 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Products
            </Link>
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full text-left text-white px-3 py-2"
                  onClick={() => {
                    navigate("/create");
                    toggleMenu();
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Create product
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left text-white px-3 py-2"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                >
                  Log in
                </Button>
                <Button
                  className="w-full text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
                  onClick={() => {
                    navigate("/register");
                    toggleMenu();
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
