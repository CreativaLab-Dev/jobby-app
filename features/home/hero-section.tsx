"use client"; // Agregamos esto para indicar que es un componente de cliente

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="bg-[#4b50d0] text-white">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-24">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            ¿Tu CV está listo para una beca internacional?
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#e1dbef]">
            Analízalo en segundos y recibe feedback realista y recomendaciones para mejorar y ganar la beca.
          </p>
          <Button
            asChild
            className="mt-8 bg-[#d5ed86] text-[#312c8e] hover:bg-[#c4db77]"
            size="lg"
          >
            <a href="/get-started">
              Haz tu diagnóstico ahora
            </a>
          </Button>
        </div>
        <div className="flex justify-center">
          {/* Asegúrate de tener una imagen en /public/images/hero-image.png o cambia la ruta */}
          <Image
            src="/images/hero-image.png"
            alt="Análisis de CV"
            width={500}
            height={500}
            className="rounded-lg"
            priority // Cargar esta imagen de forma prioritaria
          />
        </div>
      </div>
    </section>
  );
}