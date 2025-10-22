import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CallToActionSectionProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
  variant: "primary" | "secondary" | "tertiary";
}

const variants = {
  primary: {
    bg: "bg-gray-100",
    titleColor: "text-gray-900",
    descriptionColor: "text-gray-600",
    buttonClass: "bg-primary text-primary-foreground",
  },
  secondary: {
    bg: "bg-[#4b50d0]",
    titleColor: "text-[#d5ed86]",
    descriptionColor: "text-white",
    buttonClass: "bg-[#d5ed86] text-[#312c8e] hover:bg-[#c4db77]",
  },
  tertiary: {
    bg: "bg-[#eab10b]",
    titleColor: "text-white",
    descriptionColor: "text-white",
    buttonClass: "bg-[#c39409] text-white hover:bg-[#b58808]",
  },
};

export function CallToActionSection({
  title,
  description,
  buttonLabel,
  buttonLink,
  variant,
}: CallToActionSectionProps) {
  const style = variants[variant];

  return (
    <section className={`${style.bg} py-12 md:py-16`}>
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left">
        <div className="max-w-3xl">
          <h2 className={`text-3xl font-bold ${style.titleColor}`}>{title}</h2>
          <p className={`mt-2 text-lg ${style.descriptionColor}`}>
            {description}
          </p>
        </div>
        <Button asChild className={style.buttonClass} size="lg">
          <Link href={buttonLink}>{buttonLabel}</Link>
        </Button>
      </div>
    </section>
  );
}