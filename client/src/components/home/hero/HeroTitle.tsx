interface HeroTitleProps {
  title: string;
  subtitle: string;
}

export default function HeroTitle({ title, subtitle }: HeroTitleProps) {
  return (
    <>
      <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
      <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">{subtitle}</p>
    </>
  );
}
