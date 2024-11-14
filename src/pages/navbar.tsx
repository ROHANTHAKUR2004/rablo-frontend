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
import { User, LogOut, Menu } from "lucide-react";
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
        toast({
          title: "Logged out successfully",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              to="/products"
              className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </Link>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.png" alt="User avatar" />
                      <AvatarFallback>
                        {userinfo?.email.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userinfo?.name || ""}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userinfo?.email || ""}
                      </p>
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
              <div className="space-x-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Log in
                </Button>
                <Button onClick={() => navigate("/register")}>Sign up</Button>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/products"
              className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Products
            </Link>
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/create");
                    toggleMenu();
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Create product</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                >
                  Log in
                </Button>
                <Button
                  className="w-full"
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
