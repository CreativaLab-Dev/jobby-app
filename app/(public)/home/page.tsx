import { HeroSection } from "../../../features/home/hero-section";
import { PricingSection } from "../../../features/home/pricing-section";
// import { CallToActionSection } from "../../../features/home/cta-section";
// import { FaqSection } from "../../../features/home/faq-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PricingSection />
      {/* <CallToActionSection
      title="¿Quieres jugar a encontrar becas gratis?"
      description="Haz match con becas sin test. Házlo deslizando becas... como en Tinder."
      buttonLabel="Quiero jugar BecaSwipe"
      buttonLink="/home"
      variant="secondary"
      />
      <FaqSection />
      <CallToActionSection
      title="¿Necesitas más ayuda con tu postulación?"
      description="Descubre BecaLab+ con mentorías avanzadas, webinars, revisión de documentos y más..."
      buttonLabel="Ir a BecaLab+PLUS"
      buttonLink="/home"
      variant="tertiary"
      /> */}
    </>
  );
}