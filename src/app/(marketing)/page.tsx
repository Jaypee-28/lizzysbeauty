import { HeroSection } from "@/components/home/hero-section";
import { TrustMetrics } from "@/components/home/trust-metrics";
import { FeaturedServices } from "@/components/home/featured-services";
import { PortfolioPreview } from "@/components/home/portfolio-preview";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { BookingCta } from "@/components/home/booking-cta";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch featured services and images
  const services = await prisma.service.findMany({
    where: { isActive: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  const featuredImages = await prisma.galleryImage.findMany({
    where: { isFeatured: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustMetrics />
      <FeaturedServices services={services} />
      <PortfolioPreview images={featuredImages} />
      <WhyChooseUs />
      <Testimonials />
      <BookingCta />
    </div>
  );
}