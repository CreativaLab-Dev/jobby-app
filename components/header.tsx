"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown, Star } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const [mobileRegisterOpen, setMobileRegisterOpen] = useState(false);

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
            <Link href="/pro" aria-label="Ir a PRO">
              <Button
              className="relative group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground font-bold shadow-lg hover:shadow-xl hover:shadow-primary/50 transform transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary overflow-hidden border border-primary/20"
              >
              {/* Animated background shine */}
              <span className="absolute inset-0 pointer-events-none">
                <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
              </span>

              {/* Pulsing glow effect */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 rounded-full bg-primary/30 blur-md animate-pulse"></span>
              </span>

              {/* Star icon with rotation animation */}
              <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-background/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Star className="h-4 w-4 fill-current text-primary-foreground animate-pulse" />
              </span>

              {/* Text content */}
              <span className="relative z-10 flex items-center gap-2">
                <span className="uppercase tracking-widest text-sm font-extrabold">PRO</span>
                <span className="inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full bg-background/20 border border-background/30 backdrop-blur-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
                Nuevo
                </span>
              </span>

              {/* Sparkle effect on hover */}
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
              <span className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-150"></span>
              </Button>
            </Link>
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

          {/* CTA Buttons with per-button hover dropdown (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Login - dropdown on hover */}
            <div className="relative">
              <div className="group inline-block">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Iniciar sesión <ChevronDown className="ml-2 h-4 w-4 inline-block" />
                  </Button>
                </Link>

                <div className="absolute left-0 top-full mt-2 w-56 bg-background border border-border rounded-lg shadow-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="w-full justify-start mt-1">
                      Para Talento
                    </Button>
                  </Link>
                  <Link href="/login?role=empresa">
                    <Button variant="ghost" size="sm" className="w-full justify-start mt-1">
                      Para Empresa
                    </Button>
                  </Link>
                  <Link href="/login?role=empresa">
                    <Button variant="ghost" size="sm" className="w-full justify-start mt-1">
                      Para Institución
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Register - dropdown on hover */}
            <div className="relative">
              <div className="group inline-block">
                <Link href="/register">
                  <Button size="sm">Regístrate <ChevronDown className="ml-2 h-4 w-4 inline-block" /></Button>
                </Link>

                <div className="absolute left-0 top-full mt-2 w-56 bg-background border border-border rounded-lg shadow-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <Link href="/register?role=talento">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Regístrate como Talento
                    </Button>
                  </Link>
                  <Link href="/register?role=empresa">
                    <Button variant="ghost" size="sm" className="w-full justify-start mt-1">
                      Regístrate como Empresa
                    </Button>
                  </Link>
                  <Link href="/register?role=institucion">
                    <Button variant="ghost" size="sm" className="w-full justify-start mt-1">
                      Regístrate como Institución
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* PRO Button (visible solo en móvil) */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link href="/pro" aria-label="Ir a PRO">
              <Button
                className="relative group inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground font-bold shadow-md hover:shadow-lg transform transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary overflow-hidden border border-primary/20"
              >
                {/* Shine */}
                <span className="absolute inset-0 pointer-events-none">
                  <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                </span>

                {/* Star icon */}
                <span className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Star className="h-3.5 w-3.5 fill-current text-primary-foreground animate-pulse" />
                </span>

                <span className="relative z-10 uppercase tracking-widest text-xs font-extrabold">PRO</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="relative w-10 h-10 flex flex-col justify-center items-center group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
            >
              {/* Linea superior */}
              <span
                className={`block w-6 h-0.5 bg-foreground rounded-sm transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1.5"
                }`}
              ></span>

              {/* Linea del medio */}
              <span
                className={`block w-6 h-0.5 bg-foreground rounded-sm transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>

              {/* Linea inferior */}
              <span
                className={`block w-6 h-0.5 bg-foreground rounded-sm transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1.5"
                }`}
              ></span>
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="text-center md:hidden py-4 space-y-4">
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
            {/* <Link
              href="/expertos"
              className="block text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Expertos
            </Link> */}
            <div className="flex flex-col space-y-2 pt-4">
              <div>
                <div
                  role="button"
                  tabIndex={0}
                  className="w-full text-left cursor-pointer"
                  onClick={() => setMobileLoginOpen((s) => !s)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setMobileLoginOpen((s) => !s);
                    }
                  }}
                >
                  <Button variant="ghost" size="sm" className="w-full justify-between">
                    Iniciar sesión
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileLoginOpen ? "rotate-180" : ""}`} />
                  </Button>
                </div>
                {mobileLoginOpen && (
                  <div className="mt-2 space-y-1">
                    <Link href="/login?role=talento" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Para Talento
                      </Button>
                    </Link>
                    <Link href="/login?role=empresa" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Para Empresa
                      </Button>
                    </Link>
                    <Link href="/login?role=institucion" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Para Institución
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <div>
                <div
                  role="button"
                  tabIndex={0}
                  className="w-full text-left cursor-pointer"
                  onClick={() => setMobileRegisterOpen((s) => !s)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setMobileRegisterOpen((s) => !s);
                    }
                  }}
                >
                  <Button size="sm" className="w-full justify-between">
                    Regístrate
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileRegisterOpen ? "rotate-180" : ""}`} />
                  </Button>
                </div>
                {mobileRegisterOpen && (
                  <div className="mt-2 space-y-1">
                    <Link href="/register?role=talento" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Regístrate como Talento
                      </Button>
                    </Link>
                    <Link href="/register?role=empresa" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Regístrate como Empresa
                      </Button>
                    </Link>
                    <Link href="/register?role=institucion" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Regístrate como Institución
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
