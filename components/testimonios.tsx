"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonios = [
  {
    name: "Mónica Diaz",
    role: "Estudiante de Administración",
    text: "Jobby me ayudó a estructurar mi CV de manera efectiva y a resaltar mis habilidades.",
    img: "/testimonios/Monica.png",
  },
  {
    name: "Brenda Mamani",
    role: "Estudiante de Arquitectura",
    text: "La IA de Jobby transformó mis logros académicos en un CV profesional. Ahora tengo 3 ofertas de internship.",
    img: "/testimonios/Brenda.png",
  },
  {
    name: "Jhon Quispe",
    role: "Estudiante de Ingeniería Informática",
    text: "Jobby, me ayudó a conseguir más ofertas de trabajo al optimizar mi CV segun las descripciones de las vacantes.",
    img: "/testimonios/Jhon.png",
  },
  {
    name: "Andy Huaman",
    role: "Data & Business Analyst",
    text: "Con Jobby, pude crear un CV que realmente refleja mis habilidades técnicas y proyectos.",
    img: "/testimonios/Andy.png",
  },
  {
    name: "Daniela Banegas",
    role: "Creadora de Contenido",
    text: "Pude destacar mis proyectos personales y obtener una práctica en una agencia digital.",
    img: "/testimonios/Daniela.png",
  },
];

export default function TestimoniosCarousel() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Lo que dicen <span className="text-gradient">nuestros usuarios</span>
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={30}
          loop={true}
          freeMode={true}
          allowTouchMove={false}
          speed={20000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          className="flex items-center"
        >
          {[...testimonios, ...testimonios, ...testimonios, ...testimonios, ...testimonios].map((t, i) => (
            <SwiperSlide key={i} className="!w-[340px]">
              <Card className="p-6 bg-card shadow-card flex flex-col justify-between min-h-[260px] hover:shadow-glow transition-all">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{t.text}</p>
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
