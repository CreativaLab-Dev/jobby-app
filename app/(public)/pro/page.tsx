import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle2, Sparkles, Star, Target, TrendingUp, Upload, Zap } from "lucide-react";
import Link from "next/link";
import TestimoniosCarousel from "@/components/testimonios";
import FAQsSection from "@/components/FAQsSection";

const Pro = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Sección principal */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              Convierte tu perfil en{" "}
              <span className="text-gradient">oportunidades reales</span>
            </h1>
            <p className="text-lg sm:text text-muted-foreground max-w-3xl mx-auto">
              Convierte tu perfil en oportunidades reales: CV optimizado con IA,
              hasta 5 CV creados y guardados y recomendaciones de vacantes
              hechas a tu medida.
            </p>

            <Card className="p-8 bg-linear-to-br from-secondary/20 to-primary/20 shadow-glow border-2 border-primary/50 relative overflow-hidden max-w-md mx-auto">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                  Popular
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-5xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-2">
                  S/9.90 <span className="text-base font-normal">Por mes</span>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/register" className="block">
                  <Button
                    className="w-full shadow-glow"
                    aria-label="Comenzar ahora"
                  >
                    Comenzar ahora
                    <Star className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              ¿Cómo <span className="text-gradient">funciona?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tres simples pasos para crear tu CV profesional y empezar a
              recibir oportunidades
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                1
              </div>
              <Upload className="h-8 w-8 mx-auto text-primary" />
              <h3 className="text-xl font-bold">Crea o importa tu CV</h3>
              <p className="text-muted-foreground">
                Carga tu información una sola vez. La IA propone estructura y
                mejoras al instante.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center text-2xl font-bold text-secondary">
                2
              </div>
              <Sparkles className="h-8 w-8 mx-auto text-secondary" />
              <h3 className="text-xl font-bold">
                Genera versiones con un clic
              </h3>
              <p className="text-muted-foreground">
                Hasta 5 CV guardados por objetivo laboral. Cada uno con enfoque,
                palabras clave y métricas.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center text-2xl font-bold text-accent">
                3
              </div>
              <TrendingUp className="h-8 w-8 mx-auto text-accent" />
              <h3 className="text-xl font-bold">Aplica con ventaja</h3>
              <p className="text-muted-foreground">
                Recibe 5 oportunidades al mes, revisa tu compatibilidad y
                postula con el CV ideal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparación de planes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              ¿Gratis o Pro?{" "}
              <span className="text-gradient">Compara y elige</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Elige el plan que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Gratis */}
            <Card className="p-8 bg-card shadow-card hover:shadow-lg transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Gratis</h3>
                <div className="text-4xl font-bold mb-2">S/0</div>
                <p className="text-muted-foreground">Perfecto para empezar</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">CV básico optimizado</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Plantilla profesional</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Descarga en PDF</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Hasta 5 oportunidades</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Soporte técnico</span>
                </li>
              </ul>

              <Link href="/register" className="block">
                <Button variant="outline" className="w-full">
                  Comenzar gratis
                </Button>
              </Link>
            </Card>

            {/* Plan Pro */}
            <Card className="p-8 bg-linear-to-br from-secondary/20 to-primary/20 shadow-glow border-2 border-primary/50 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                  POPULAR
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-2">S/9.90</div>
                <p className="text-muted-foreground">Por mes</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Todo del plan Gratis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">
                    CV optimizado con IA avanzada
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">
                    5 oportunidades personalizadas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Análisis de compatibilidad</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Soporte prioritario</span>
                </li>
              </ul>

              <Link href="/register" className="block">
                <Button className="w-full shadow-glow">
                  Comenzar ahora
                  <Star className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <TestimoniosCarousel />
        </div>
      </section>

      {/* Preguntas frecuentes */}
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4">
          ¿Por que elegir el plan <span className="text-gradient">PRO?</span>
        </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
        <Card className="p-8 bg-card shadow-card hover:shadow-glow transition-all hover:scale-105">
          <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">
            CV optimizado con IA
          </h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              Titulares potentes y extracto profesional orientado a valor.
            </span>
            </li>
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              Logros con métricas: impacto, porcentaje de mejora, alcance, etc.
            </span>
            </li>
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              Secciones sugeridas según el perfil: proyectos, voluntariado, cursos, etc.
            </span>
            </li>
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              Formato <span className="font-bold">ATS-friendly</span>, sin tablas rotas, lectura por reclutador y software.
            </span>
            </li>
          </ul>
        </Card>

        <Card className="p-8 bg-card shadow-card hover:shadow-glow transition-all hover:scale-105">
          <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-6">
            <Zap className="h-6 w-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold mb-3">
            Oportunidades personalizadas
            </h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              Hasta <span className="font-bold">5</span> al mes, curadas según <span className="font-bold">rol, nivel, ubicación y habilidades.</span>
            </span>
            </li>
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              Enlace directo para postular y recomendaciones de palabras clave.
            </span>
            </li>
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              Recordatorios y seguimiento opcional.
            </span>
            </li>
          </ul>
        </Card>

        <Card className="p-8 bg-card shadow-card hover:shadow-glow transition-all hover:scale-105">
          <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-6">
            <Award className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold mb-3">
            Análisis de compatibilidad
          </h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              <span className="font-bold">Score de match.</span>
            </span>
            </li>
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              <span className="font-bold">Palabras clave faltantes.</span>
            </span>
            </li>
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              <span className="font-bold">Habilidades a reforzar</span> con micro-cursos sugeridos.
            </span>
            </li>
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              <span className="font-bold">Checklist de ajuste del CV</span> para esa vacante.
            </span>
            </li>
            <li className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="text-base">
              Exportación: <span className="font-bold">PDF</span> y <span className="font-bold">Word</span>.
            </span>
            </li>
          </ul>
        </Card>
        </div>
      </div>
    </section>

      {/* FAQs */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <FAQsSection />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pro;