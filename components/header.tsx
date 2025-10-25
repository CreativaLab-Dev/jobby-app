"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gradient">Jobby</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/empresas"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/empresas") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Para empresas
            </Link>
            <Link
              href="/instituciones"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/instituciones") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Para instituciones
            </Link>
            {/* <Link
              href="/expertos"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/expertos") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Expertos
            </Link> */}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Regístrate</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/empresas"
              className="block text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Para empresas
            </Link>
            <Link
              href="/instituciones"
              className="block text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Para instituciones
            </Link>
            <Link
              href="/expertos"
              className="block text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Expertos
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">
                  Regístrate
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
