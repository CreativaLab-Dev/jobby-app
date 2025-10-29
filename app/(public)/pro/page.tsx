import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  CheckCircle2,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";
import Link from "next/link";
import TestimoniosCarousel from "@/components/testimonios";
import FAQsSection from "@/components/FAQsSection";
import AutoPlayVideo from "@/components/AutoPlayVideo";

const Pro = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Sección principal */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Plan más popular
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Convierte tu perfil en{" "}
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                oportunidades reales
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              CV optimizado con IA, hasta 5 CV creados y guardados, y
              recomendaciones de vacantes hechas a tu medida.
            </p>

            <Card className="p-8 sm:p-10 bg-gradient-to-br from-secondary/20 via-primary/10 to-primary/20 shadow-2xl hover:shadow-glow border-2 border-primary/50 relative overflow-hidden max-w-md mx-auto transition-all duration-300 hover:scale-[1.02] group">
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold shadow-lg animate-pulse">
                  Popular
                </span>
              </div>

              <div className="text-center mb-8 relative">
                <h3 className="text-5xl sm:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                  Pro
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl sm:text-6xl font-bold">S/9.90</span>
                  {/* <span className="text-lg font-medium text-muted-foreground">
                    / mes
                  </span> */}
                </div>
                {/* <p className="text-sm text-muted-foreground mt-2">
                  Sin permanencia, cancela cuando quieras
                </p> */}
              </div>

              <div className="space-y-4 relative">
                <Link href="/register" className="block">
                  <Button
                    size="lg"
                    className="w-full shadow-glow hover:shadow-xl transition-all duration-300 text-base font-semibold"
                    aria-label="Comenzar ahora"
                  >
                    Pagar ahora
                    <Star className="ml-2 h-5 w-5 fill-current" />
                  </Button>
                </Link>
                {/* <p className="text-xs text-center text-muted-foreground">
                  ✓ Acceso inmediato
                </p> */}
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
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group text-center space-y-4 p-6 rounded-2xl hover:bg-card/50 transition-all duration-300">
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative mx-auto h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary border-2 border-primary/30 group-hover:scale-110 transition-transform">
                  1
                </div>
              </div>
              <div className="relative inline-flex">
                <Upload className="h-10 w-10 mx-auto text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold">Crea o importa tu CV</h3>
              <p className="text-muted-foreground leading-relaxed">
                Carga tu información una sola vez. La IA propone estructura y
                mejoras al instante.
              </p>
            </div>

            <div className="group text-center space-y-4 p-6 rounded-2xl hover:bg-card/50 transition-all duration-300">
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-secondary/30 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative mx-auto h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center text-2xl font-bold text-secondary border-2 border-secondary/30 group-hover:scale-110 transition-transform">
                  2
                </div>
              </div>
              <div className="relative inline-flex">
                <Sparkles className="h-10 w-10 mx-auto text-secondary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold">
                Genera versiones con un clic
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Hasta 5 CV guardados por objetivo laboral. Cada uno con enfoque,
                palabras clave y métricas específicas.
              </p>
            </div>

            <div className="group text-center space-y-4 p-6 rounded-2xl hover:bg-card/50 transition-all duration-300">
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative mx-auto h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center text-2xl font-bold text-accent border-2 border-accent/30 group-hover:scale-110 transition-transform">
                  3
                </div>
              </div>
              <div className="relative inline-flex">
                <TrendingUp className="h-10 w-10 mx-auto text-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold">Aplica con ventaja</h3>
              <p className="text-muted-foreground leading-relaxed">
                Recibe 5 oportunidades al mes, revisa tu compatibilidad y
                postula con el CV ideal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Ve cómo{" "}
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                funciona en acción
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre lo fácil que es crear un CV profesional con nuestra
              plataforma
            </p>
          </div>

          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />

            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-border/50 bg-card/50 backdrop-blur">
              <AutoPlayVideo src="/videos/videoejemplo-cv.mp4" />
            </div>
          </div>
        </div>
      </section>

      {/* Comparación de planes */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              ¿Gratis o Pro?{" "}
              <span className="text-gradient">Compara y elige</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Elige el plan que mejor se adapte a tus necesidades
            </p>
          </div> */}

          {/* <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"> */}
            {/* Plan Gratis */}
            {/* <Card className="p-8 bg-card shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-3">Gratis</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-bold">S/0</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Perfecto para empezar
                </p>
              </div>

              <ul className="space-y-3 mb-8 min-h-[200px]">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>CV básico optimizado</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Plantilla profesional</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Descarga en PDF</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>1 CV almacenado</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Soporte técnico</span>
                </li>
              </ul>

              <Link href="/register" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full group-hover:border-primary/50 transition-colors"
                >
                  Comenzar gratis
                </Button>
              </Link>
            </Card> */}

            {/* Plan Pro */}
            {/* <Card className="p-8 bg-gradient-to-br from-secondary/20 via-primary/10 to-primary/20 shadow-2xl border-2 border-primary/60 relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300 group"> */}
              {/* Animated background */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-bold shadow-lg animate-pulse">
                  ⭐ POPULAR
                </span>
              </div>

              <div className="text-center mb-6 relative">
                <h3 className="text-2xl font-bold mb-3">Pro</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-bold">S/9.90</span>
                  <span className="text-base text-muted-foreground">/ mes</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cancela cuando quieras
                </p>
              </div>

              <ul className="space-y-3 mb-8 min-h-[200px] relative">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Todo del plan Gratis, más:
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">
                    CV optimizado con IA avanzada
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">
                    Hasta 5 CV almacenados
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">
                    5 oportunidades personalizadas/mes
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">
                    Análisis de compatibilidad
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">
                    Soporte prioritario
                  </span>
                </li>
              </ul>

              <Link href="/register" className="block relative">
                <Button
                  size="lg"
                  className="w-full shadow-glow hover:shadow-xl transition-all duration-300"
                >
                  Comenzar ahora
                  <Star className="ml-2 h-5 w-5 fill-current" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Testimonios */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <TestimoniosCarousel />
        </div>
      </section>

      {/* Beneficios del plan Pro */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              ¿Por qué elegir el plan{" "}
              <span className="text-gradient">PRO?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/30 group">
              <div className="relative inline-flex mb-6">
                <div className="absolute inset-0 bg-primary/30 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20">
                  <Target className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">CV optimizado con IA</h3>
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
                    Logros con métricas: impacto, porcentaje de mejora, alcance,
                    etc.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-base">
                    Secciones sugeridas según el perfil: proyectos,
                    voluntariado, cursos, etc.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-base">
                    Formato <span className="font-bold">ATS-friendly</span>, sin
                    tablas rotas, lectura por reclutador y software.
                  </span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-card shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-[1.02] border-2 hover:border-secondary/30 group">
              <div className="relative inline-flex mb-6">
                <div className="absolute inset-0 bg-secondary/30 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center border border-secondary/20">
                  <Zap className="h-7 w-7 text-secondary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">
                Oportunidades personalizadas
              </h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-base">
                    Hasta{" "}
                    <span className="font-bold">5 oportunidades al mes</span>,
                    curadas según{" "}
                    <span className="font-bold">
                      rol, nivel, ubicación y habilidades
                    </span>
                    .
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-base">
                    Enlace directo para postular y recomendaciones de palabras
                    clave.
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

            <Card className="p-8 bg-card shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-[1.02] border-2 hover:border-accent/30 group">
              <div className="relative inline-flex mb-6">
                <div className="absolute inset-0 bg-accent/30 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border border-accent/20">
                  <Award className="h-7 w-7 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">
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
                    <span className="font-bold">Habilidades a reforzar</span>{" "}
                    con micro-cursos sugeridos.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-base">
                    <span className="font-bold">
                      Checklist de ajuste del CV
                    </span>{" "}
                    para esa vacante.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-base">
                    Exportación: <span className="font-bold">PDF</span> y{" "}
                    <span className="font-bold">Word</span>.
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <FAQsSection />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pro;
