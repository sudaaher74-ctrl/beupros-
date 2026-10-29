export interface Masterclass {
  id: string;
  category: string;
  title: string;
  instructor: string;
  duration: string;
  level: string;
  description: string;
  chapters: string[];
  shopCategory: string;
}

export const MASTERCLASSES: Masterclass[] = [
    {
      id: "1",
      category: "cutting",
      title: "Precision Hair Cutting & Texturizing",
      instructor: "Philip Wolff & Master Artists",
      duration: "1h 45m",
      level: "Advanced Stylists",
      description: "Master dry-cutting, slide texturizing, and weight removal to create high-movement dimensional salon shapes.",
      chapters: ["01: Sectioning & Density Analysis", "02: Tension Control with Wet vs Dry Cut", "03: Internal Weight Removal Techniques", "04: Finishing & Styling for Movement"],
      shopCategory: "Tools",
    },
    {
      id: "2",
      category: "color",
      title: "Foilayage & Seamless Color Melting",
      instructor: "Global Redken & L'Oreal Educators",
      duration: "2h 10m",
      level: "All Pro Colorists",
      description: "Step-by-step masterclass on shadow roots, zone toning, and butter-blonde foils for seamless transitions.",
      chapters: ["01: Foil Placement & Angle Mapping", "02: High-Lift Bleach Formulation", "03: Shadow Root Blending Technique", "04: Acidic Gloss Toning Formulas"],
      shopCategory: "Hair",
    },
    {
      id: "3",
      category: "smoothing",
      title: "Keratin & Thermal Smoothing Systems",
      instructor: "Brasil Cacau & Cadiveu Specialists",
      duration: "1h 15m",
      level: "Intermediate",
      description: "Learn proper iron temperature control, sectioning, and post-treatment maintenance to eliminate 100% of frizz.",
      chapters: ["01: Hair Porosity & Chemical Prep", "02: Product Saturation & Blowout", "03: Iron Pass Speed & Temperature", "04: Home Maintenance Recommendations"],
      shopCategory: "Hair",
    },
    {
      id: "4",
      category: "business",
      title: "Salon Profitability & Retail Merchandising",
      instructor: "Beupros Business Development Team",
      duration: "55m",
      level: "Salon Owners & Managers",
      description: "Maximize your front-of-house retail margin and consumable inventory turnover to increase salon net profits.",
      chapters: ["01: Service Cost-Per-Client Calculations", "02: Retail Display Positioning", "03: Staff Commission Incentive Structures", "04: Re-Order Cadence Optimization"],
      shopCategory: "Beauty",
    },
    {
      id: "5",
      category: "cutting",
      title: "Advanced Fade & Modern Scissor Work",
      instructor: "Master Barber Marcus Vance",
      duration: "1h 30m",
      level: "Barbers & Stylists",
      description: "Master skin fades, clipper-over-comb blending, and taper transitions using ergonomic professional clippers.",
      chapters: ["01: Guard Selection & Lever Work", "02: Scissor Over Comb Detailing", "03: Texture Shears for Weight Dispersal", "04: Razor Sharp Edging & Finish"],
      shopCategory: "Tools",
    },
    {
      id: "6",
      category: "color",
      title: "Corrective Color & Dark Base Removal",
      instructor: "Schwarzkopf Color Ambassadors",
      duration: "2h 30m",
      level: "Master Colorists",
      description: "Safe color extraction, pre-pigmentation protocols, and banding correction without compromising hair integrity.",
      chapters: ["01: Strand Test Diagnostics", "02: Controlled Decolorizing Steps", "03: Neutralizing Unwanted Undertones", "04: Bond Rebuilding & Conditioning"],
      shopCategory: "Hair",
    },
  ];
