import { HeroBanners } from "@/components/HeroBanners";
import { BrandPromoGrid } from "@/components/BrandPromoGrid";
import { SparkleLineup } from "@/components/SparkleLineup";
import { NewGemsCarousel } from "@/components/NewGemsCarousel";
import { CategoryGrid } from "@/components/CategoryGrid";
import { PlaybookEducation } from "@/components/PlaybookEducation";
import { PartnerPillars } from "@/components/PartnerPillars";
import { InstagramShowcase } from "@/components/InstagramShowcase";
import { AboutStatement } from "@/components/AboutStatement";

export default function Home() {
  return (
    <>
      <HeroBanners />
      <BrandPromoGrid />
      <SparkleLineup />
      <NewGemsCarousel />
      <CategoryGrid />
      <PlaybookEducation />
      <PartnerPillars />
      <InstagramShowcase />
      <AboutStatement />
    </>
  );
}
