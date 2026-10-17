import { NextResponse } from "next/server";
import productsData from "@/data/products.json";
import { Product } from "@/types/product";

const allProducts = productsData as Product[];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message: string = (body.message || "").trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const lower = message.toLowerCase();

    // 1. Analyze intent & generate expert pro salon advice
    let reply = "";
    let recommendedCategory: string | undefined;
    let searchKeywords: string[] = [];
    let suggestedFollowUps: string[] = [];

    if (
      (lower.includes("curl") || lower.includes("curly") || lower.includes("coil") || lower.includes("texture")) &&
      (lower.includes("color") || lower.includes("colour") || lower.includes("dye") || lower.includes("highlight"))
    ) {
      reply = `### Best Hair Color Protocols for Curly & Textured Hair

Curly hair has an elliptical cross-section and naturally raised cuticle scales, making it inherently more prone to moisture depletion and curl elongation under harsh chemical processing. Here is the master colorist formulation guide:

1. **Prioritize Demi-Permanent & Ammonia-Free Systems:**
   - Use low-ammonia or ammonia-free oil-delivery systems (such as **L'Oréal INOA** or **Majirel with protective oils**). These deposit rich pigments without blowing open the cuticle layer or compromising your client's curl pattern.
   
2. **Opt for Pintura & Curl-by-Curl Hand Painting:**
   - Instead of tight traditional foil packets (which compress curls and trap excessive heat), use the **Pintura highlighting technique**. Hand-paint individual curl ribbons where light hits naturally to create multi-dimensional pop without over-processing.

3. **Mandatory Bond-Builders:**
   - Always integrate a bond builder (such as **Colorplex** or **Blonde Plex**) into developers to protect the disulfide bonds and retain curl spring and elasticity.

4. **Moisture-Rich Post-Color Regimen:**
   - Seal the service with an acidic gloss toner and an intensive reconstructive mask containing argan, gold quinoa, or keratin (e.g. **L'Oréal Absolut Repair** or **Wella SP Luxe Oil**). Recommend clients use sulfate-free color-safe cleansing.`;

      recommendedCategory = "Hair";
      searchKeywords = ["majirel", "absolut repair", "colorplex", "luxe", "vitamino"];
      suggestedFollowUps = [
        "What developer volume should I use for grey coverage on curly hair?",
        "Show me moisturizing hair masks for colored curls",
        "How do I prevent curl pattern loss when bleaching?",
      ];
    } else if (
      lower.includes("grey") ||
      lower.includes("gray") ||
      lower.includes("white hair") ||
      (lower.includes("cover") && lower.includes("color"))
    ) {
      reply = `### Master Formulation for 100% Resistant Grey Coverage

Covering resistant grey requires precise formulation balance and proper pigment density:

1. **The 50/50 Base Rule:**
   - For over 50% grey, always mix at least **50% of a Natural Base (.0 or N series)** with 50% of your desired fashion shade (e.g., 1/2 tube 6.0 + 1/2 tube 6.3 or 6.21).
   
2. **Developer Strength:**
   - Standard grey coverage requires **20 Volume (6%) Developer** at a **1:1 mixing ratio**. 10 Vol does not open the cuticle sufficiently, while 30 Vol creates too much lift and leaves grey hair translucent.

3. **Application & Processing Time:**
   - Apply generously to the root area—do not scrape product thin.
   - Leave on for a full **35 to 45 minutes** at ambient room temperature (avoid direct heat lamps as they can cause uneven hot roots).`;

      recommendedCategory = "Hair";
      searchKeywords = ["majirel", "color", "loreal", "streax", "wella"];
      suggestedFollowUps = [
        "What if the hair is 100% coarse white hair?",
        "Which shampoo prevents grey coverage color fade?",
        "Can I use 10 Volume for grey blending?",
      ];
    } else if (
      lower.includes("keratin") ||
      lower.includes("smoothening") ||
      lower.includes("smoothing") ||
      lower.includes("straightening") ||
      lower.includes("botox")
    ) {
      reply = `### Professional Keratin & Thermal Smoothing Protocol

Thermal smoothing treatments require exacting iron temperature and ventilation control:

1. **Iron Temperature Guidelines by Hair Fiber Type:**
   - **Virgin / Coarse / Resistant:** 230°C (450°F) — 7 to 10 slow passes.
   - **Normal / Wavy / Colored:** 200°C–210°C (390°F–410°F) — 5 to 7 passes.
   - **Bleached / Highlighted / Fragile:** 180°C–190°C (350°F–375°F) — 3 to 5 rapid passes. Always use a titanium-plate iron with instant heat recovery.

2. **Application Precision:**
   - Apply product 1/4 inch away from the scalp. Comb through thoroughly to ensure 100% saturation without excessive buildup.

3. **Client Aftercare Directives:**
   - Use only **sulfate-free, sodium chloride-free** shampoos and keratin maintenance masks to ensure the smoothing results last 12–16 weeks.`;

      recommendedCategory = "Hair";
      searchKeywords = ["keratin", "straightener", "cadiveu", "brasil", "shampoo"];
      suggestedFollowUps = [
        "Which flat irons are best for keratin treatments?",
        "What sulfate-free shampoos should I recommend after keratin?",
        "How long should a client wait before washing after keratin?",
      ];
    } else if (
      lower.includes("facial") ||
      lower.includes("skin") ||
      lower.includes("esthetician") ||
      lower.includes("glow") ||
      lower.includes("bridal")
    ) {
      reply = `### Professional Esthetician Protocols: High-Margin Bridal & Glow Services

Maximize client satisfaction and treatment ticket prices with clinical esthetician protocols:

1. **Bridal Radiance Protocols:**
   - Recommended systems: **O3+ Professional Bridal & Whitening Kits** combined with botanical micro-dermabrasion scrubs.
   - Sequence: Double cleanse → Gentle AHA/Enzymatic peel → Steam & ultrasonic extraction → Lymphatic massage cream → Alginate peel-off cooling mask.

2. **Pre-Service Skin Diagnostics:**
   - For sensitive or acne-prone skin, avoid heavy physical scrubs; substitute with chamomile or tea tree calming toners and high-frequency violet wands.

3. **Retail Upsell:**
   - Send clients home with a post-facial hyaluronic acid booster serum or daily broad-spectrum SPF 50+ to protect newly revealed skin cells.`;

      recommendedCategory = "Beauty";
      searchKeywords = ["facial", "o3", "jovees", "bleach", "serum"];
      suggestedFollowUps = [
        "Which facial kit is best for oily acne-prone skin?",
        "What is the shelf life of professional 5-step facial kits?",
        "Show me professional wax heaters and body care",
      ];
    } else if (
      lower.includes("tool") ||
      lower.includes("appliance") ||
      lower.includes("straightener") ||
      lower.includes("dryer") ||
      lower.includes("clipper") ||
      lower.includes("iron")
    ) {
      reply = `### Pro Salon Equipment & Appliance Selection Guide

Choosing the right salon workstation tools directly affects ergonomics and service efficiency:

1. **Titanium vs. Ceramic Flat Irons:**
   - **Titanium (e.g. Ikonic, Vega Pro):** Reaches 230°C in seconds and delivers ultra-fast heat transfer. Crucial for heavy-duty chemical smoothing and coarse textures.
   - **Ceramic / Tourmaline:** Emits gentle far-infrared heat that preserves moisture on fine, chemically treated, or bleached hair.

2. **Cordless High-Torque Clippers:**
   - Look for brushless rotary motors (7,000+ RPM) with Japanese carbon-steel blades (e.g. **Alan Truman Atom 511**) for effortless bulk removal and zero-gap fades without snagging.

3. **Maintenance Best Practices:**
   - Use automatic brush sterilizers and cooling lubricant sprays daily to extend blade longevity and meet hygiene standards.`;

      recommendedCategory = "Tools";
      searchKeywords = ["straightener", "clipper", "ikonic", "vega", "alan truman"];
      suggestedFollowUps = [
        "Which flat iron is best for daily salon blowout smoothing?",
        "What cordless clippers are recommended for barbers?",
        "How do I clean and sterilize salon brushes?",
      ];
    } else if (
      lower.includes("margin") ||
      lower.includes("profit") ||
      lower.includes("business") ||
      lower.includes("retail") ||
      lower.includes("cost") ||
      lower.includes("pricing")
    ) {
      reply = `### Salon Profit Architecture & Backbar Cost Optimization

Strategies top salon owners use to maintain 20%+ net margins:

1. **Backbar Bulk Can Efficiency:**
   - Switch high-consumption backbar items (cleansing shampoos, conditioners, massage creams) to **Commercial 5-Liter Cans**. This lowers your per-wash consumable cost by up to **35%** compared to retail-sized bottles.

2. **Front-of-House Retail Multipliers:**
   - Aim for a **45% to 50% retail margin**. Every stylist should prescribe 2 take-home maintenance products during chair consultations (e.g. a color-preserving shampoo + thermal serum).

3. **Beupros Wholesale Trade Tier Perks:**
   - Take advantage of free delivery over ₹1,500, bulk manufacturer discounts, and our recurring trade coupon **PRO10** / **BEUPROS10** for an additional 10% off.`;

      recommendedCategory = "Hair";
      searchKeywords = ["cans", "loreal", "absolut repair", "shampoo", "matrix"];
      suggestedFollowUps = [
        "How do I calculate cost-per-pump at the shampoo bowl?",
        "What are the best-selling retail take-home products?",
        "How does the Beupros ProRewards loyalty program work?",
      ];
    } else {
      reply = `### Beupros Salon Pro Consultation

Thank you for your inquiry! As your Beupros Pro Cosmetology & Salon Advisor, here is what our technical specialists recommend:

- **100% Genuine Distributor Formulations:** All products across hair color, smoothing, appliances, and skin care are sourced directly from certified brand distributors with intact manufacturer batch codes.
- **Formulation Support:** Whether you need developer mixing ratios, developer strengths (20V/30V/40V), or iron temperatures for specific hair densities, our pro advisory engine is designed for licensed cosmetologists.
- **Wholesale Benefits:** Remember that registered trade accounts enjoy tier discounts, same-day dispatch, and free shipping on orders over ₹1,500.

Check out the relevant verified products from our 4,200+ salon catalog below:`;

      searchKeywords = lower
        .replace(/[^a-z0-9 ]/g, "")
        .split(" ")
        .filter((w) => w.length > 3 && !["what", "which", "best", "some", "with", "hair", "this", "that"].includes(w));
      suggestedFollowUps = [
        "Best hair color for curly hair?",
        "How to achieve 100% grey coverage?",
        "Recommend pro flat irons for keratin",
      ];
    }

    // 2. Query products.json for real, relevant products
    let matchedProducts: Product[] = [];

    if (searchKeywords.length > 0) {
      matchedProducts = allProducts.filter((p) => {
        const text = `${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase();
        const matchesCategory = recommendedCategory ? p.category.toLowerCase() === recommendedCategory.toLowerCase() : true;
        const matchesKeyword = searchKeywords.some((k) => text.includes(k));
        return matchesCategory && matchesKeyword;
      });
    }

    if (matchedProducts.length === 0 && recommendedCategory) {
      matchedProducts = allProducts.filter((p) => p.category.toLowerCase() === recommendedCategory!.toLowerCase());
    }

    if (matchedProducts.length === 0) {
      matchedProducts = allProducts.slice(0, 10);
    }

    // Deduplicate and pick top 4 items
    const selectedProducts = matchedProducts.slice(0, 4);

    return NextResponse.json({
      reply,
      recommendedProducts: selectedProducts,
      suggestedFollowUps,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal chat processing error" },
      { status: 500 }
    );
  }
}
