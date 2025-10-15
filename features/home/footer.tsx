import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

// Un componente simple para el ícono de TikTok
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.31-4.42-2.01-6.85.31-2.52 1.8-4.79 3.92-6.24 2.21-1.52 4.93-1.88 7.37-1.12.02 1.52-.02 3.04-.01 4.57-.46-.11-.91-.21-1.36-.31-1.86-.43-3.64-.2-5.18.66-1.13.62-1.96 1.63-2.3 2.9-.34 1.28-.21 2.68.36 3.88.63 1.31 1.82 2.3 3.17 2.65 1.12.3 2.3.18 3.39-.32.96-.45 1.69-1.29 2.1-2.3.39-1 .57-2.14.56-3.23.01-1.63.01-3.27.01-4.9 0-.21 0-.42 0-.63z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#4b50d0] py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between border-b border-[#ededed33] pb-6 md:flex-row">
          <p className="text-sm text-[#b1a2d2]">
            © {new Date().getFullYear()} BecaLab. Todos los derechos reservados.
          </p>
          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            <Link href="https://www.instagram.com/beca_lab" target="_blank">
              <Instagram className="h-6 w-6 text-[#b1a2d2] hover:text-white" />
            </Link>
            <Link href="https://www.tiktok.com/@anacosmicagt" target="_blank">
              <TikTokIcon className="h-6 w-6 text-[#b1a2d2] hover:text-white" />
            </Link>
            <Link href="mailto:info@becalab.org">
              <Mail className="h-6 w-6 text-[#b1a2d2] hover:text-white" />
            </Link>
          </div>
        </div>
        <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/home" className="text-[#d5ed86] hover:underline">INICIO</Link>
          <Link href="/que-es-becalab" className="text-[#d5ed86] hover:underline">QUÉ ES BECALAB</Link>
          <Link href="/becabot" className="text-[#d5ed86] hover:underline">BECABOT</Link>
          <Link href="/becalabplus" className="text-[#d5ed86] hover:underline">BECALAB+PLUS</Link>
          <Link href="/contacto" className="text-[#d5ed86] hover:underline">CONTACTO</Link>
        </nav>
      </div>
    </footer>
  );
}