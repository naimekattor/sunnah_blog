import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full relative mt-6">
      <div className="w-full container mx-auto">
        <Image
          src="/images/banner.png"
          alt="Book Collage"
          width={1920}
          height={400}
          priority
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}
