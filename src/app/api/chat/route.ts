import { NextResponse } from "next/server";
import productsData from "@/data/products.json";
import { Product } from "@/types/product";

const allProducts = productsData as Product[];

// Helper to call external LLM (Gemini or OpenAI) if API key is provided in environment
async function callLLMIfAvailable(userQuery: string): Promise<{ reply: string; keywords: string[] } | null> {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are the Chief Cosmetologist, Master Colorist, and Salon Business Advisor for Beupros (India's premier professional salon supply platform with 4,200+ salon products).
Answer the following salon professional or client question with actionable technical depth, exact chemical ratios, processing times, iron temperatures, safety precautions, and salon best practices.
Format in clear markdown with headings, bold text, and bullet points. At the end, output a line:
KEYWORDS: [3-5 product search keywords separated by commas]

Question: ${userQuery}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 1000,
            },
          }),
        }
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parts = text.split("KEYWORDS:");
          const reply = parts[0].trim();
          const keywords = parts[1]
            ? parts[1]
                .split(",")
                .map((k: string) => k.trim().toLowerCase())
                .filter(Boolean)
            : [];
          return { reply, keywords };
        }
      }
    } catch {
      // Fallback to built-in salon intelligence engine
    }
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message: string = (body.message || "").trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const lower = message.toLowerCase();

    // Check if an external LLM key is configured
    const llmResult = await callLLMIfAvailable(message);

    let reply = "";
    let recommendedCategory: string | undefined;
    let searchKeywords: string[] = [];
    let suggestedFollowUps: string[] = [];

    if (llmResult) {
      reply = llmResult.reply;
      searchKeywords = llmResult.keywords;
      suggestedFollowUps = [
        "Which developer ratio is safest for this?",
        "What take-home retail products should I recommend?",
        "How can I price this service for maximum salon profit?",
      ];
    } else {
      // Comprehensive Built-in Salon Intelligence Engine covering 20+ specialized domains

      // 1. Curly & Textured Hair Color
      if (
        (lower.includes("curl") || lower.includes("curly") || lower.includes("coil") || lower.includes("texture")) &&
        (lower.includes("color") || lower.includes("colour") || lower.includes("dye") || lower.includes("highlight") || lower.includes("bleach"))
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
      }

      // 2. Grey Hair Coverage
      else if (
        lower.includes("grey") ||
        lower.includes("gray") ||
        lower.includes("white hair") ||
        (lower.includes("cover") && lower.includes("color"))
      ) {
        reply = `### Master Formulation for 100% Resistant Grey Coverage

Covering resistant grey hair requires precise formulation balance and proper pigment density:

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
      }

      // 3. Bleaching, Lightening, Foils & Balayage
      else if (
        lower.includes("bleach") ||
        lower.includes("lighten") ||
        lower.includes("blond") ||
        lower.includes("balayage") ||
        lower.includes("highlights") ||
        lower.includes("9 level") ||
        lower.includes("foil")
      ) {
        reply = `### Professional Lightening & Balayage Protocols

Safe high-lift lightening requires disciplined mixing ratios and developer control:

1. **Mixing Ratios:**
   - Standard foil packet ratio: **1:1.5 to 1:2** (1 part bleach powder to 1.5–2 parts developer).
   - Freehand Balayage clay bleach: **1:1 to 1:1.5** for a thicker consistency that encapsulates strands without bleeding onto adjacent hair.

2. **Developer Selection:**
   - On-scalp: **20 Volume (6%) maximum**. Never use 30V or 40V on the scalp to prevent chemical burns.
   - Foils: 20V for fine hair; 30V for coarse dark virgin hair. Avoid heat lamps with 30V foils.
   - Target Lift: Lighten only to pale yellow (Level 9–10) before toning; never over-process to translucent white.

3. **Plex Protection:**
   - Always blend in an anti-breakage bond builder into your lightener formula.`;

        recommendedCategory = "Hair";
        searchKeywords = ["blond", "developer", "majirel", "streax", "plex"];
        suggestedFollowUps = [
          "How do I eliminate brassy orange undertones after bleach?",
          "Can I use 40 Volume developer with bleach in foils?",
          "What is the best toner for Level 9 blonde?",
        ];
      }

      // 4. Brassy, Orange, Yellow Neutralization & Toning
      else if (
        lower.includes("brass") ||
        lower.includes("orange") ||
        lower.includes("yellow") ||
        lower.includes("toner") ||
        lower.includes("tone") ||
        lower.includes("purple shampoo") ||
        lower.includes("ash")
      ) {
        reply = `### Color Wheel Science: Neutralizing Orange & Yellow Brassy Hair

Toning depends on matching the complementary color on the color wheel to the underlying exposed pigment:

1. **Level 7–8 (Orange / Red-Orange):**
   - Counteract with **Blue / Ash tones (.1 or .11 series)**. Violet toner will NOT cancel orange—only blue cancels orange.

2. **Level 9–10 (Pale Yellow / Butter Yellow):**
   - Counteract with **Violet / Pearl / Iridescent tones (.2 or .21 series)** or purple shampoo to achieve clean platinum or cool champagne.

3. **Toner Formulation & Developer:**
   - Use a **demi-permanent gloss** mixed with **5 Vol or 10 Vol Developer** at a 1:1 or 1:2 ratio.
   - Process for **10 to 20 minutes** visually at the shampoo bowl. Do not use permanent color or high developer for toning as it will re-lift underlying warmth.`;

        recommendedCategory = "Hair";
        searchKeywords = ["toner", "silver", "majirel", "shampoo", "loreal"];
        suggestedFollowUps = [
          "How often should clients use purple shampoo at home?",
          "Why did toner turn the hair greenish?",
          "Show me cool ash toners in our catalog",
        ];
      }

      // 5. Keratin, Thermal Smoothing & Brazilian Blowout
      else if (
        lower.includes("keratin") ||
        lower.includes("smoothening") ||
        lower.includes("smoothing") ||
        lower.includes("brazilian")
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
      }

      // 6. Hair Botox, Nanoplastia & Rebonding
      else if (
        lower.includes("botox") ||
        lower.includes("nanoplastia") ||
        lower.includes("rebonding") ||
        lower.includes("straightening") ||
        lower.includes("relaxer")
      ) {
        reply = `### Hair Botox vs. Nanoplastia vs. Rebonding: Formulation Comparison

Choosing the correct chemical service depends on the client's hair integrity and texture goals:

1. **Hair Botox (Deep Anti-Aging Rejuvenation):**
   - **Best for:** Extremely damaged, chemically over-processed, porous hair.
   - **Mechanism:** Infuses amino acids, collagen, hyaluronic acid, and ceramides to fill cortex gaps. Does NOT break bonds or straighten 100%; reduces frizz by 70% and restores elasticity.

2. **Nanoplastia (Organic Amino-Acid Smoothing):**
   - **Best for:** Clients seeking sleek straightening without formaldehyde or harsh fumes.
   - **Mechanism:** Oxoacetamide carbocysteine penetrates the cortex under flat-iron heat (210°C–230°C) to reform bonds safely.

3. **Rebonding / Japanese Straightening:**
   - **Best for:** Virgin or resistant curly hair wanting permanent pin-straight texture.
   - **Warning:** Never perform rebonding on pre-bleached or high-lift colored hair to avoid total protein breakdown.`;

        recommendedCategory = "Hair";
        searchKeywords = ["botox", "rebonding", "straightener", "repair", "mask"];
        suggestedFollowUps = [
          "Can hair botox be done right after hair color?",
          "What is the processing time for rebonding cream?",
          "Show me pro flat irons with digital heat display",
        ];
      }

      // 7. Hair Spa & Deep Conditioning
      else if (
        lower.includes("hair spa") ||
        lower.includes("spa") ||
        lower.includes("deep condition") ||
        lower.includes("dry hair") ||
        lower.includes("damaged hair")
      ) {
        reply = `### Master Salon Hair Spa & Deep Reconditioning Protocol

A high-ticket salon hair spa should be a sensory and clinical restorative service:

1. **Diagnostic Step:**
   - Examine scalp sebum and fiber porosity. Use clarifying shampoo to strip silicone and mineral buildup.

2. **Formulation & Application:**
   - For severely damaged hair, mix a restorative spa cream (e.g. **L'Oréal Professional Hair Spa Deep Nourishing** or **Matrix Opti.Care**) with an intensive essential booster ampoule.
   - Section hair into 4 quadrants. Emulsify cream onto strand by strand using downward kneading motions.

3. **Steam & Scalp Massage:**
   - Provide a 10–15 minute acupressure scalp and neck massage to stimulate blood microcirculation.
   - Apply warm steam for 8–10 minutes to open cuticles for deep nutrient infusion. Cool completely before rinsing with lukewarm water.`;

        recommendedCategory = "Hair";
        searchKeywords = ["hair spa", "spa", "absolut repair", "mask", "loreal"];
        suggestedFollowUps = [
          "How often should a client get a hair spa?",
          "Can hair spa cure dandruff?",
          "Show me 500ml and 1000ml bulk hair spa tubs",
        ];
      }

      // 8. Scalp Health, Dandruff & Hair Fall (Trichology)
      else if (
        lower.includes("dandruff") ||
        lower.includes("scalp") ||
        lower.includes("hair fall") ||
        lower.includes("hair loss") ||
        lower.includes("thinning") ||
        lower.includes("tricholog")
      ) {
        reply = `### Professional Scalp Trichology: Dandruff & Hair Fall Solutions

Scalp health is the foundation of hair density and fiber quality:

1. **Targeting Dandruff (Malassezia Yeast):**
   - Use exfoliating scalp scrubs with **Salicylic Acid (BHA)** to remove adherent flakes, followed by shampoos formulated with **Piroctone Olamine, Zinc Pyrithione, or Tea Tree**.
   - Avoid applying heavy conditioning masks directly on the scalp.

2. **Targeting Hair Fall & Weak Roots:**
   - Incorporate **Aminexil, Biotin, or Rosemary Peptide serums** directly to the roots post-wash.
   - Use a **High-Frequency Violet Argon/Neon Wand** for 5 minutes during treatments to oxygenate follicles and stimulate blood microcirculation.

3. **Client At-Home Maintenance:**
   - Recommend washing oily scalps 3–4 times weekly. Accumulation of sebum accelerates follicle miniaturization.`;

        recommendedCategory = "Hair";
        searchKeywords = ["scalp", "dandruff", "shampoo", "serum", "aminexil"];
        suggestedFollowUps = [
          "Which anti-dandruff shampoo is best for salon backbar?",
          "Does high-frequency treatment stop hair fall?",
          "Show me professional scalp peeling scrubs",
        ];
      }

      // 9. Haircuts, Face Shapes & Styling
      else if (
        lower.includes("haircut") ||
        lower.includes("face shape") ||
        lower.includes("round face") ||
        lower.includes("square face") ||
        lower.includes("layers") ||
        lower.includes("bob") ||
        lower.includes("curtain bang")
      ) {
        reply = `### Haircut Architecture: Matching Face Shapes & Textures

Great haircut design balances bone structure and facial proportions:

1. **Round Face:**
   - **Goal:** Create vertical elongation and angle.
   - **Cuts:** Long layers starting below the chin, textured lob (long bob), face-framing curtain bangs with center parts. Avoid jaw-length blunt bobs.

2. **Square Face:**
   - **Goal:** Soften strong angular jawline.
   - **Cuts:** Soft feathered layers, side-swept bangs, textured wavy bobs.

3. **Oval Face:**
   - **Versatility:** Can pull off virtually any cut, including bold blunt bobs, micro bangs, pixie cuts, and cascading butterfly layers.

4. **Heart Face:**
   - **Goal:** Add width around narrow jaw and chin.
   - **Cuts:** Collarbone-length cuts with flipped ends, bobs with chin fullness.

5. **Pro Tooling:**
   - Use Japanese 440C stainless steel shears for razor-sharp blunt cuts and 30-tooth texturizing shears for weight removal.`;

        recommendedCategory = "Tools";
        searchKeywords = ["scissor", "shear", "clipper", "comb", "brush"];
        suggestedFollowUps = [
          "How to cut face-framing curtain bangs?",
          "Which shears are best for dry cutting?",
          "Show me professional Japanese steel scissors",
        ];
      }

      // 10. Barbering, Skin Fades & Beard Grooming
      else if (
        lower.includes("fade") ||
        lower.includes("barber") ||
        lower.includes("clipper") ||
        lower.includes("trimmer") ||
        lower.includes("beard") ||
        lower.includes("shave") ||
        lower.includes("taper")
      ) {
        reply = `### Master Barbering: Seamless Skin Fades & Beard Architecture

Achieving blurry, seamless fades and sharp lines:

1. **Guard Sequence for Skin Fades:**
   - **Step 1:** Establish baseline with trimmer/foil shaver.
   - **Step 2:** Blade open (0.5) creating a 1-inch guideline.
   - **Step 3:** Guard #1 open (1.5) creating the next guideline.
   - **Step 4:** Blend lines using corner blade technique with half-lever positions (0.25 and 0.75).

2. **Beard Sculpting:**
   - Line up cheek lines using a straight razor with clear shave gel for visibility.
   - Fade sideburns into the beard for seamless transition. Finish with argan/jojoba beard oil.

3. **Clipper Maintenance:**
   - Clean hair after every client, spray blade disinfectant/coolant, and apply 3 drops of lubricating oil along the blade teeth.`;

        recommendedCategory = "Tools";
        searchKeywords = ["clipper", "trimmer", "alan truman", "blade", "shaver"];
        suggestedFollowUps = [
          "What is the difference between rotary and magnetic clipper motors?",
          "How to zero-gap clipper blades safely?",
          "Show me cordless pro clippers in our catalog",
        ];
      }

      // 11. Facials, Esthetics & Bridal Skin
      else if (
        lower.includes("facial") ||
        lower.includes("skin") ||
        lower.includes("esthetician") ||
        lower.includes("glow") ||
        lower.includes("bridal") ||
        lower.includes("o3")
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
      }

      // 12. D-Tan, Bleach & Skin Lightening
      else if (
        lower.includes("d-tan") ||
        lower.includes("detan") ||
        lower.includes("skin bleach") ||
        lower.includes("oxy bleach") ||
        lower.includes("tan") ||
        lower.includes("pigment")
      ) {
        reply = `### Professional D-Tan & Skin Bleaching Guidelines

Safe de-tanning and skin brightening protocols:

1. **D-Tan Packs (No-Ammonia):**
   - Natural enzyme & eucalyptus D-Tan creams safely dissolve sun tan without hair lightening.
   - Apply evenly, leave for 10–15 minutes, massage with damp hands, and wipe clean with wet sponges.

2. **Oxy Bleach & Peroxide Bleach:**
   - **Mixing Ratio:** Standard ratio is **7:1 or 8:1** (cream to activator powder). Adding excess activator burns the epidermal barrier.
   - **Patch Test:** Mandatory 24 hours prior behind the ear.
   - **Processing Time:** 10–12 minutes for fair/medium skin; 15 minutes max. Never use steam with facial bleach.`;

        recommendedCategory = "Beauty";
        searchKeywords = ["detan", "d-tan", "bleach", "o3", "cream"];
        suggestedFollowUps = [
          "Can D-Tan be done immediately before a facial?",
          "How to treat skin burning from facial bleach?",
          "Show me salon pack D-Tan tubs",
        ];
      }

      // 13. Waxing & Hair Removal
      else if (
        lower.includes("wax") ||
        lower.includes("waxing") ||
        lower.includes("rica") ||
        lower.includes("bikini") ||
        lower.includes("brazilian") ||
        lower.includes("ingrown")
      ) {
        reply = `### Professional Waxing Protocols: Rica Liposoluble & Hard Wax

Deliver painless, flawless hair removal without skin lifting:

1. **Rica Liposoluble Wax (Legs & Arms):**
   - Colophony-free formula that grips only hair, not live skin cells.
   - **Temperature:** Melt to smooth honey consistency (55°C–65°C). Never overheat.
   - Apply ultra-thin in the direction of hair growth; remove swiftly against hair growth using non-woven strips.
   - **Clean-up:** Must be removed with mineral or post-wax soothing oil (it is not water-soluble).

2. **Stripless Hard Wax (Bikini, Underarms & Face):**
   - Apply with rounded edges for easy grip. Shrink-wraps coarse hair without pulling delicate skin.

3. **Preventing Ingrown Hairs:**
   - Prescribe clients use salicylic acid body lotion 48 hours post-service.`;

        recommendedCategory = "Beauty";
        searchKeywords = ["wax", "rica", "heater", "strip", "aloe"];
        suggestedFollowUps = [
          "What is the best temperature setting for wax heaters?",
          "How to prevent waxing bumps on sensitive skin?",
          "Show me Rica wax cartridges and post-wax lotions",
        ];
      }

      // 14. Pedicure, Manicure & Cracked Heels
      else if (
        lower.includes("pedicure") ||
        lower.includes("manicure") ||
        lower.includes("feet") ||
        lower.includes("heel") ||
        lower.includes("cracked") ||
        lower.includes("cuticle")
      ) {
        reply = `### Clinical Pedicure & Cracked Heel Restoration Protocol

Transforming rough, calloused feet into smooth salon results:

1. **Soak & Soften:**
   - Soak feet in warm water infused with antiseptic bath crystals and tea tree drops for 10 minutes.

2. **Callus Treatment:**
   - Apply a **potassium hydroxide or urea-based callus softener** to heel fissures. Let sit for 3 minutes.
   - File firmly with a sanitized 80/120-grit foot paddle. Always file in one direction across cracks to prevent tearing.

3. **Cuticle & Scrub Work:**
   - Gently push cuticles with an orangewood stick or stainless pusher.
   - Exfoliate lower legs and feet with salt/sugar scrub. Seal with intensive urea 20% heel balm.`;

        recommendedCategory = "Pedi & Mani";
        searchKeywords = ["pedicure", "manicure", "scrub", "foot", "cream"];
        suggestedFollowUps = [
          "How to sanitize foot spa basins between clients?",
          "Which foot scrub gives the best client glow?",
          "Show me professional pedicure kits and foot files",
        ];
      }

      // 15. Nails, Gel Polish & Acrylic Extensions
      else if (
        lower.includes("nail") ||
        lower.includes("gel polish") ||
        lower.includes("acrylic") ||
        lower.includes("uv lamp") ||
        lower.includes("nail art")
      ) {
        reply = `### Professional Nail Art: Gel Polish vs. Acrylic Extensions

Ensuring 3+ weeks retention without lifting or chipping:

1. **Nail Bed Preparation (Crucial 90% of Longevity):**
   - Push eponychium and remove dead cuticle off nail plate.
   - Gently buff shine with 180-grit buffer. Dehydrate with 99% isopropanol and apply acid-free bonding primer.

2. **Gel Polish Application:**
   - Apply ultra-thin layers. Cap the free edge on every coat.
   - Cure in a 48W+ UV/LED lamp for **30–60 seconds** per layer.

3. **Acrylic Extensions:**
   - Balance monomer liquid to polymer powder ratio (medium-wet bead). Avoid contacting sidewalls to prevent premature pocket lifting.`;

        recommendedCategory = "Nails";
        searchKeywords = ["nail", "gel", "acrylic", "lamp", "uv"];
        suggestedFollowUps = [
          "Why is gel polish peeling off in sheets after 3 days?",
          "Which UV/LED nail lamps cure fastest?",
          "Show me pro nail tips, buffers and acrylic powders",
        ];
      }

      // 16. Salon Sanitation, Sterilization & Hygiene
      else if (
        lower.includes("saniti") ||
        lower.includes("sterili") ||
        lower.includes("barbicide") ||
        lower.includes("hygiene") ||
        lower.includes("disinfect") ||
        lower.includes("clean tool")
      ) {
        reply = `### Salon Sanitation & Hospital-Grade Disinfection Standards

Protecting clients and complying with health and cosmetology safety boards:

1. **Disinfection vs. Sterilization:**
   - **Disinfection (Barbicide/Quats):** Eliminates 99.9% of bacteria, fungi, and viruses on non-porous scissors, combs, and clipper guards.
   - **Sterilization (Autoclave / Glass Bead):** Destroys all microbial life including bacterial spores on metal cuticle nippers and extractors.

2. **The Barbicide 10-Minute Contact Rule:**
   - Tools must be fully submerged in freshly diluted Barbicide solution (2 oz per 32 oz water) for a minimum of **10 continuous minutes**. Quick dips do NOT disinfect.

3. **Linens & Single-Use Protocol:**
   - Wash salon towels at **60°C (140°F)** with bleach or laundry sanitizer.
   - Use disposable neck strips, wax spatulas, and nail files; never reuse single-use abrasives.`;

        recommendedCategory = "Tools";
        searchKeywords = ["sterilizer", "clean", "comb", "towel", "cape"];
        suggestedFollowUps = [
          "How often should Barbicide solution be changed?",
          "How to clean clipper blades between clients?",
          "Show me UV tool sterilizers in our catalog",
        ];
      }

      // 17. Opening a Salon, Setup & Licensing
      else if (
        lower.includes("open a salon") ||
        lower.includes("start a salon") ||
        lower.includes("new salon") ||
        lower.includes("salon license") ||
        lower.includes("salon setup") ||
        lower.includes("business plan")
      ) {
        reply = `### How to Open & Launch a Profitable Salon: Master Blueprint

Key phases to launch a successful salon business:

1. **Statutory & Legal Licenses (India):**
   - **Shop & Establishment Act:** Mandatory municipal registration for commercial premises.
   - **Trade License & Fire NOC:** From your local municipal corporation.
   - **GST Registration:** Mandatory for sourcing wholesale supplies tax-exempt and claiming input tax credit.

2. **Location & Ergonomic Zoning:**
   - Ideal ratio: 50% Styling/Hair stations, 20% Shampoo/Backbar, 20% Esthetic private cabins, 10% Reception/Retail display.
   - Ensure high footfall or dedicated parking with 3-phase commercial electrical supply for heavy appliances.

3. **CapEx & Inventory Sourcing:**
   - Buy bulk wholesale backbar supplies and direct-distributor styling tools from Beupros to save 25–40% on initial setup capex.`;

        recommendedCategory = "Commercial Cans";
        searchKeywords = ["cans", "straightener", "shampoo", "loreal", "chair"];
        suggestedFollowUps = [
          "What is the average starting investment for a 4-chair salon?",
          "How to negotiate product brand agreements for a new salon?",
          "Show me commercial 5L backbar cans for new salon openings",
        ];
      }

      // 18. Salon Pricing, Menu Engineering & Margins
      else if (
        lower.includes("margin") ||
        lower.includes("profit") ||
        lower.includes("business") ||
        lower.includes("retail") ||
        lower.includes("cost") ||
        lower.includes("pricing") ||
        lower.includes("price list")
      ) {
        reply = `### Salon Profit Architecture & Backbar Cost Optimization

Strategies top salon owners use to maintain 20%+ net margins:

1. **Backbar Bulk Can Efficiency:**
   - Switch high-consumption backbar items (cleansing shampoos, conditioners, massage creams) to **Commercial 5-Liter Cans**. This lowers your per-wash consumable cost by up to **35%** compared to retail-sized bottles.

2. **Front-of-House Retail Multipliers:**
   - Aim for a **45% to 50% retail margin**. Every stylist should prescribe 2 take-home maintenance products during chair consultations (e.g. a color-preserving shampoo + thermal serum).

3. **Cost-Per-Service Calculation:**
   - Base Price = (Stylist Hourly Wage + Consumable Product Cost + Allocated Overhead) × 2.5 Markup.

4. **Beupros Wholesale Trade Tier Perks:**
   - Take advantage of free delivery over ₹1,500, bulk manufacturer discounts, and recurring trade coupons for an additional 10% off.`;

        recommendedCategory = "Commercial Cans";
        searchKeywords = ["cans", "loreal", "absolut repair", "shampoo", "matrix"];
        suggestedFollowUps = [
          "How do I calculate cost-per-pump at the shampoo bowl?",
          "What are the best-selling retail take-home products?",
          "How does the Beupros ProRewards loyalty program work?",
        ];
      }

      // 19. Salon Marketing, Instagram & Client Retention
      else if (
        lower.includes("market") ||
        lower.includes("instagram") ||
        lower.includes("client") ||
        lower.includes("retention") ||
        lower.includes("reels") ||
        lower.includes("loyalty")
      ) {
        reply = `### Salon Growth Marketing: Acquiring & Retaining 50+ Clients/Month

Proven digital and in-salon retention strategies:

1. **Instagram Video Transformations (Reels):**
   - High-contrast Before & After transitions (e.g., brassy to icy blonde, frizzy to glass-hair keratin).
   - Show formulation bowls with microphone ASMR sounds. Use hyper-local geo-tags (e.g., #BandraSalon #IndiranagarHair).

2. **Chairside Rebooking System:**
   - Train stylists to book the next appointment before the client leaves the chair: *"To maintain this toner/cut, let's reserve your 6-week refresh for March 15th."* This lifts retention from 35% to 75%.

3. **Google Business Profile (Local SEO):**
   - Send direct WhatsApp review links immediately after service. Salons with 100+ 5-star reviews capture 60% of local search traffic.`;

        recommendedCategory = "Beauty";
        searchKeywords = ["serum", "loreal", "mask", "shampoo", "facial"];
        suggestedFollowUps = [
          "What WhatsApp templates work best for salon rebooking?",
          "How to launch a VIP salon membership loyalty card?",
          "Show me top retail styling products clients love",
        ];
      }

      // 20. Staff Hiring, Commissions & Management
      else if (
        lower.includes("staff") ||
        lower.includes("hire") ||
        lower.includes("hiring") ||
        lower.includes("commission") ||
        lower.includes("salary") ||
        lower.includes("chair rent")
      ) {
        reply = `### Salon Staff Compensation & Talent Retention Framework

Building a high-performing, loyal stylist team:

1. **Compensation Models:**
   - **Base Salary + Tiered Commission:** e.g., ₹20,000 base + 10% on service revenue above ₹60,000 + 15% on retail sales.
   - **High-Commission Split:** 45%–50% to senior stylists who bring their own clientele (salon covers backbar supplies and rent).

2. **Incentivizing Retail Sales:**
   - Offer 15% cash commission on retail products. Stylists who prescribe take-home care boost client retention by 40%.

3. **Contracts & Retention:**
   - Include 6-month non-solicitation clauses for key salon clients and invest in bi-monthly brand masterclasses to prevent staff turnover.`;

        recommendedCategory = "Tools";
        searchKeywords = ["clipper", "shear", "apron", "straightener", "dryer"];
        suggestedFollowUps = [
          "How to prevent stylists from poaching clients?",
          "What are fair chair rental rates in metro cities?",
          "Show me professional salon station equipment",
        ];
      }

      // 21. General & Dynamic Salon Query Handler
      else {
        // Extract meaningful salon keywords
        const words = lower
          .replace(/[^a-z0-9 ]/g, " ")
          .split(" ")
          .filter(
            (w) =>
              w.length > 2 &&
              ![
                "what",
                "which",
                "where",
                "when",
                "how",
                "why",
                "best",
                "some",
                "with",
                "this",
                "that",
                "your",
                "can",
                "the",
                "and",
                "for",
                "about",
                "salon",
              ].includes(w)
          );

        searchKeywords = words.slice(0, 4);

        reply = `### Beupros Pro Cosmetology & Salon Advisor

Thank you for your question! Here is our comprehensive technical and operational breakdown:

1. **Professional Diagnostic & Assessment:**
   - In professional cosmetology, every service must begin with a thorough hair/skin diagnostic—evaluating porosity, elasticity, skin Fitzpatrick type, or workstation ergonomics before starting chemical or mechanical treatments.

2. **Master Cosmetology Protocol:**
   - Always follow certified manufacturer mixing guidelines, precise chemical ratios, and calibrated temperature controls.
   - Never skip patch tests for chemical hair colors or skin bleaching agents to prevent client irritation or allergic reactions.

3. **Salon Profitability & Retail Prescriptions:**
   - Elevate every station service by educating your client on take-home maintenance. Prescribing the right home regimen preserves salon results and adds 30%+ to your monthly net revenue.

4. **100% Genuine Certified Supplies:**
   - All supplies on Beupros are authentic, direct-from-brand stock with verified batch numbers, wholesale trade tiers, and same-day dispatch.

Explore matched verified products from our 4,200+ salon catalog below:`;

        suggestedFollowUps = [
          "Which developer volume should I use for this?",
          "How can I increase profit margins on this service?",
          "Show me best-selling products for this service",
        ];
      }
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
      matchedProducts = allProducts.slice(0, 8);
    }

    // Pick top 4 relevant products
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
