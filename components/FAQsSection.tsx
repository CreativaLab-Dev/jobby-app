"use client";
import { useRef, useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "¿Qué significa “Hasta 5 CV”?",
    answer:
      "Puedes crear y guardar 5 versiones diferentes de tu CV (según rol/industria). Puedes editarlas y reemplazarlas cuando quieras.",
  },
  {
    question: "¿De dónde salen las oportunidades?",
    answer:
      "Revisamos fuentes públicas, bolsas locales y remotas. Filtramos por tu perfil y preferencias.",
  },
  {
    question: "¿El análisis de compatibilidad garantiza entrevistas?",
    answer:
      "No garantiza entrevistas, pero mejora tu match al alinear CV y palabras clave con cada oferta.",
  },
  {
    question: "¿Puedo cancelar cuando quiera?",
    answer:
      "Sí, cancelas desde tu cuenta y no se te volverá a cobrar el siguiente ciclo.",
  },
  {
    question: "¿Sirve para estudiantes sin experiencia?",
    answer:
      "Sí. Destacamos proyectos, voluntariado, cursos y logros cuantificables.",
  },
  {
    question: "¿Mi información está segura?",
    answer:
      "Utilizamos buenas prácticas de seguridad y solo usamos tus datos para optimizar tu CV y sugerir oportunidades (ver Política de Privacidad).",
  },
];

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-2xl mx-auto my-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient">Preguntas Frecuentes</span>
          </h2>
        </div>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const el = contentRefs.current[index];
          const maxHeight = isOpen && el ? `${el.scrollHeight}px` : "0px";

          return (
            <div
              key={index}
              className="border border-primary/10 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-4 py-3 bg-primary/5 hover:bg-primary/10 flex justify-between items-center"
                aria-expanded={isOpen}
                aria-controls={`faq-content-${index}`}
              >
                <span className="font-medium text-primary-700">
                  {faq.question}
                </span>
                <span className="text-xl text-primary-600">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {/* contenedor siempre renderizado para poder animar max-height */}
              <div
                id={`faq-content-${index}`}
                ref={(el: HTMLDivElement | null) => {
                  contentRefs.current[index] = el;
                }}
                className="bg-yellow-100 text-blue-950 text-primary-600 border-t border-primary/10"
                style={{
                  maxHeight,
                  overflow: "hidden",
                  transition:
                    "max-height 320ms cubic-bezier(.2,.8,.2,1), opacity 220ms ease, transform 320ms cubic-bezier(.2,.8,.2,1)",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                }}
                aria-hidden={!isOpen}
              >
                <div className="px-4 py-3">{faq.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
