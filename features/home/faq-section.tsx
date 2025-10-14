import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuántas veces puedo usarlo?",
    answer: "Una sola vez por compra.",
  },
  {
    question: "¿Funciona para cualquier CV?",
    answer: "Sí, funciona para currículums de hasta 2 páginas y en formato PDF. Está enfocado en perfiles académicos para becas, admisiones u oportunidades internacionales.",
  },
  {
    question: "¿Me sirve para postular este año?",
    answer: "Sí, de hecho, este es el primer paso antes de postular a una beca. Tener bien hechos tus documentos.",
  },
  {
    question: "¿Qué pasa si requiero más ayuda con otros documentos?",
    answer: "Tenemos BecaLab+PLUS, nuestro servicio de postulación completa con webinars, videos, plantillas y más.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-white py-12 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#4b50d0] md:text-4xl">
            FAQ: preguntas frecuentes
          </h2>
          <p className="mt-4 text-lg text-[#b1a2d2]">
            ¿Tienes preguntas? Nosotros respuestas. Si tu duda no está acá, contáctanos.
          </p>
        </div>
        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}