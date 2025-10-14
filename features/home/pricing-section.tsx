import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const features = [
  "Evalúa si tu perfil es competitivo para becas.",
  "1 análisis detallado de tu CV en PDF (2 pág. máx).",
  "Feedback personalizado con IA académica.",
  "Detecta errores comunes en tu CV.",
  "Ofrece recomendaciones personalizadas en segundos.",
  "Te da una puntuación sobre 10 puntos.",
  "Descarga tu resultado en PDF.",
  "Entrada prioritaria a BecaLab+PLUS.",
  "Lee CV en español o inglés.",
];

export function PricingSection() {
  return (
    <section className="bg-white py-12 md:py-24">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-[#312c8e] md:text-4xl">
            ¿Qué hace CV Lab?
          </h2>
          <p className="mt-4 text-lg text-[#4b50d0]">
            Muchos estudiantes no son seleccionados por detalles que podrían haberse corregido. Con CV Lab, puedes detectar estos errores antes de aplicar y aumentar tus posibilidades desde el día 1.
          </p>
        </div>
        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-[#312c8e] text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-[#d5ed86]">Análisis incluye</CardTitle>
              <div className="text-5xl font-bold text-[#e1dbef]">$Precio</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-3 h-5 w-5 flex-shrink-0 text-[#d5ed86]" />
                    <span className="text-[#d5ed86]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-8 w-full bg-[#d5ed86] text-[#4b50d0] hover:bg-[#c4db77]"
                size="lg"
              >
                <a href="/pagos">
                  Hacer análisis de CV
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}