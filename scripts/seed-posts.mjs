// Run: node scripts/seed-posts.mjs
// Requires SANITY_API_TOKEN in .env.local (write token from sanity.io/manage)

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

const env = readFileSync('.env.local', 'utf-8')
  .split('\n')
  .reduce((acc, line) => {
    const [k, ...v] = line.split('=');
    if (k && v.length) acc[k.trim()] = v.join('=').trim();
    return acc;
  }, {});

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

function block(text, style = 'normal') {
  const key = Math.random().toString(36).slice(2, 8);
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: key + 's', text, marks: [] }],
  };
}

function blocks(...items) {
  return items.map(([text, style]) => block(text, style || 'normal'));
}

const posts = [
  {
    _id: 'post-import-guide',
    _type: 'post',
    title: 'How to Import a Car from Japan to Kenya: Complete 2025 Guide',
    slug: { _type: 'slug', current: 'how-to-import-car-from-japan-to-kenya' },
    isFeatured: true,
    category: 'import-process',
    tags: ['Import', 'Japan', 'KRA', 'Customs'],
    authorName: 'Hive Motors Team',
    excerpt: 'A step-by-step breakdown of the full import process — from choosing your car in Japan to driving it off the port in Mombasa.',
    publishedAt: '2025-02-10T08:00:00Z',
    readTime: 8,
    body: blocks(
      ['Importing a car from Japan is one of the best ways to get a quality, low-mileage vehicle at an affordable price. Kenya imports thousands of used Japanese cars every year — and for good reason.'],
      ['Step 1: Choose Your Car', 'h2'],
      ['Start by deciding on your budget, body type, and preferred make. Japan has a huge selection of right-hand drive vehicles that suit Kenyan roads perfectly. Popular choices include Toyota Land Cruiser Prado, Subaru Forester, and Mazda CX-5.'],
      ['At Hive Motors, we source vehicles directly from licensed Japanese auctions, so you get full auction sheets and verified mileage records.'],
      ['Step 2: Verify the Import Age Limit', 'h2'],
      ['Kenya restricts imports to vehicles that are no older than 8 years from the year of manufacture. For example, in 2025 you can import cars manufactured in 2017 or later. Always confirm the manufacture date before purchasing.'],
      ['Step 3: Shipping', 'h2'],
      ['Cars are shipped via Roll-on Roll-off (RoRo) vessels from Japanese ports like Nagoya, Osaka, or Yokohama to Mombasa Port. Shipping typically takes 4–6 weeks depending on the vessel schedule.'],
      ['Step 4: Customs Clearance & Taxes', 'h2'],
      ['Once the car arrives in Mombasa, KRA will assess the following taxes: Import Duty (25%), Excise Duty (20% for engine >1500cc), VAT (16%), and IDF Levy (3.5%). The total can add 50–80% on top of the car\'s customs value.'],
      ['Step 5: Inspection & Registration', 'h2'],
      ['All imported vehicles must pass a KEBS pre-shipment inspection in Japan and an NTSA inspection on arrival. After clearing customs, you can register the vehicle with NTSA and get Kenyan number plates.'],
      ['Ready to Import?', 'h2'],
      ['Hive Motors handles the entire process for you — from sourcing to delivery at your door. WhatsApp us today to start your import journey.'],
    ),
  },
  {
    _id: 'post-buying-tips',
    _type: 'post',
    title: '5 Things to Check Before Buying a Used Japanese Car',
    slug: { _type: 'slug', current: '5-things-to-check-before-buying-used-japanese-car' },
    isFeatured: false,
    category: 'buying-tips',
    tags: ['Buying Tips', 'Inspection', 'Used Cars'],
    authorName: 'Hive Motors Team',
    excerpt: 'Don\'t get caught out — here are the five most important checks every buyer should make before signing anything.',
    publishedAt: '2025-01-25T08:00:00Z',
    readTime: 5,
    body: blocks(
      ['Buying a used car is a big investment. Whether you\'re buying your first car or upgrading, these five checks can save you from costly surprises down the road.'],
      ['1. Check the Auction Sheet', 'h2'],
      ['Japanese auction houses grade every car before sale. The grade runs from 1 (poor) to 5 (excellent). Always ask for the original auction sheet and look for grades of 3.5 or above. The sheet also shows any accident history, paint repairs, and rust.'],
      ['2. Verify the Mileage', 'h2'],
      ['The odometer reading should match the wear on the pedals, steering wheel, and seats. For a car with 50,000 km, pedals should show light wear. If the interior looks heavily used but the mileage reads low, be suspicious.'],
      ['3. Check for Rust', 'h2'],
      ['Kenya\'s coastal humidity and rough roads accelerate rusting. Inspect the chassis, wheel arches, door sills, and undercarriage. Surface rust is manageable — structural rust is a dealbreaker.'],
      ['4. Test the Electronics', 'h2'],
      ['Turn on every switch: air conditioning, windows, mirrors, infotainment, reverse camera. Japanese cars have a lot of electronics — replacing a faulty AC compressor or screen can cost hundreds of thousands of shillings.'],
      ['5. Get a Pre-Purchase Inspection', 'h2'],
      ['Even if you trust the seller, have an independent mechanic inspect the car. A good inspection costs KSh 3,000–6,000 and can reveal issues worth ten times that amount.'],
      ['At Hive Motors, every car on our lot has been inspected and comes with a full auction sheet. Browse our current stock and buy with confidence.'],
    ),
  },
  {
    _id: 'post-toyota-vs-subaru',
    _type: 'post',
    title: 'Toyota vs Subaru: Which is Best for Kenyan Roads?',
    slug: { _type: 'slug', current: 'toyota-vs-subaru-kenyan-roads' },
    isFeatured: false,
    category: 'buying-tips',
    tags: ['Toyota', 'Subaru', 'Comparison'],
    authorName: 'Hive Motors Team',
    excerpt: 'Two Japanese giants, both hugely popular in Kenya. We break down which brand wins on reliability, cost, and road performance.',
    publishedAt: '2025-01-15T08:00:00Z',
    readTime: 6,
    body: blocks(
      ['Walk down any Nairobi street and you\'ll spot both Toyotas and Subarus in equal measure. Both brands are well-loved in Kenya, but they serve different buyers. Here\'s an honest comparison.'],
      ['Reliability', 'h2'],
      ['Toyota wins this round by a slim margin. The Toyota Corolla, Fielder, and Prado are famous for running past 300,000 km with basic maintenance. Subaru engines are excellent but more sensitive to regular oil changes — neglect them and repairs get expensive fast.'],
      ['Performance on Kenyan Roads', 'h2'],
      ['This is where Subaru shines. Models like the Forester and Outback come with Symmetrical All-Wheel Drive (AWD) as standard, making them excellent for rough murram roads and rainy conditions. Toyota\'s popular models are mostly 2WD unless you go for the Prado or Hilux.'],
      ['Fuel Economy', 'h2'],
      ['Toyota generally edges out Subaru here. A Toyota Fielder 1.5L averages around 15–18 km/L in mixed driving. A Subaru Forester 2.0L will typically return 10–13 km/L. With Nairobi\'s traffic, this difference adds up.'],
      ['Spare Parts & Maintenance Cost', 'h2'],
      ['Toyota parts are cheaper and more widely available across Kenya. Subaru parts, especially for newer models, may need to be sourced from Nairobi dealers or imported — pushing repair costs higher.'],
      ['The Verdict', 'h2'],
      ['Choose Toyota if reliability, fuel economy, and low maintenance costs are your priority. Choose Subaru if you need AWD capability and enjoy a more spirited drive. Both brands are excellent — it comes down to your lifestyle.'],
      ['Browse both Toyota and Subaru models currently in stock at Hive Motors — all verified and ready for Kenyan roads.'],
    ),
  },
  {
    _id: 'post-rainy-season',
    _type: 'post',
    title: 'How to Maintain Your Car During Kenya\'s Rainy Season',
    slug: { _type: 'slug', current: 'car-maintenance-kenya-rainy-season' },
    isFeatured: false,
    category: 'car-maintenance',
    tags: ['Maintenance', 'Rainy Season', 'Tips'],
    authorName: 'Hive Motors Team',
    excerpt: 'Heavy rains bring flooded roads, mud, and rust. These practical tips will keep your car in top condition through the long rains.',
    publishedAt: '2025-03-01T08:00:00Z',
    readTime: 4,
    body: blocks(
      ['Kenya\'s long rains (March–May) and short rains (October–December) are tough on vehicles. Here\'s how to protect your car and avoid expensive repairs.'],
      ['1. Check Your Tyres', 'h2'],
      ['Wet roads demand good tyre tread. The legal minimum is 1.6mm, but for safety on Kenyan roads aim for at least 3mm. Bald tyres on a wet road is a recipe for aquaplaning — replace them before the rains hit.'],
      ['2. Inspect Wiper Blades', 'h2'],
      ['Wipers degrade in the sun and often fail just when you need them most. If they streak or skip, replace them. Wiper blades cost KSh 800–2,000 and take five minutes to fit — there\'s no excuse to drive with bad wipers.'],
      ['3. Wash Under the Car', 'h2'],
      ['Mud and road salt accumulate on the undercarriage and accelerate rust. After heavy rains or off-road driving, rinse the underside of your car with water. A full undercarriage wash at a garage every few months goes a long way.'],
      ['4. Never Drive Through Deep Floodwater', 'h2'],
      ['Water above your exhaust pipe can enter the engine and cause catastrophic hydrolocking — bending connecting rods and destroying the engine. If you\'re not sure of the depth, don\'t risk it. Turn around and find an alternative route.'],
      ['5. Lubricate Door and Boot Seals', 'h2'],
      ['Rubber seals dry out and crack over time, letting water into the cabin. Apply silicone spray or rubber conditioner to all door, bonnet, and boot seals once a year to keep them supple and watertight.'],
      ['Keep on top of these checks and your car will survive the rains without issue. If you notice any problems, bring it in to a trusted garage early — small issues become big ones when they\'re left in wet conditions.'],
    ),
  },
  {
    _id: 'post-import-duty',
    _type: 'post',
    title: 'Understanding Car Import Duty & Taxes in Kenya (2025)',
    slug: { _type: 'slug', current: 'car-import-duty-taxes-kenya-2025' },
    isFeatured: false,
    category: 'import-process',
    tags: ['Import', 'KRA', 'Taxes', 'Duty'],
    authorName: 'Hive Motors Team',
    excerpt: 'A plain-English breakdown of every tax and levy you pay when importing a car into Kenya, with a worked example.',
    publishedAt: '2025-02-20T08:00:00Z',
    readTime: 7,
    body: blocks(
      ['Importing a car into Kenya involves several layers of tax. Many buyers are surprised by the final bill at the port. This guide explains every charge so you can budget accurately.'],
      ['What is Customs Value?', 'h2'],
      ['All taxes are calculated on the Customs Value, not necessarily what you paid for the car. KRA uses the higher of: the transaction value (invoice price + shipping + insurance) or the current market value from their internal database.'],
      ['Import Duty — 25%', 'h2'],
      ['The base tax. Applied at 25% on the Customs Value. This is the largest single charge for most vehicles.'],
      ['Excise Duty', 'h2'],
      ['Charged at 20% for vehicles with an engine above 1500cc, and 10% below 1500cc. It is calculated on the Customs Value plus Import Duty combined. This makes it a tax on a tax.'],
      ['VAT — 16%', 'h2'],
      ['VAT is applied on top of Customs Value + Import Duty + Excise Duty. It compounds on the taxes above.'],
      ['IDF Levy — 3.5%', 'h2'],
      ['Import Declaration Fee, charged at 3.5% of Customs Value. Paid when filing the import declaration.'],
      ['Worked Example', 'h2'],
      ['A 2020 Toyota RAV4 2.0L (Customs Value = KSh 2,000,000): Import Duty = KSh 500,000. Excise Duty (20%) on KSh 2.5M = KSh 500,000. VAT (16%) on KSh 3,000,000 = KSh 480,000. IDF = KSh 70,000. Total taxes = approximately KSh 1,550,000. Total cost = ~KSh 3,550,000.'],
      ['Plan Your Budget with Hive Motors', 'h2'],
      ['At Hive Motors, we give you a full cost breakdown before you commit to a purchase — so there are no surprises at the port. WhatsApp us for a personalised import quote.'],
    ),
  },
  {
    _id: 'post-fuel-economy',
    _type: 'post',
    title: 'Top 5 Most Fuel-Efficient Cars for Nairobi Traffic in 2025',
    slug: { _type: 'slug', current: 'most-fuel-efficient-cars-nairobi-2025' },
    isFeatured: false,
    category: 'buying-tips',
    tags: ['Fuel Economy', 'Nairobi', 'Hybrid', 'Buying Tips'],
    authorName: 'Hive Motors Team',
    excerpt: 'Fuel prices are high and Nairobi traffic is brutal. These five cars give you the best mileage per litre in stop-and-go conditions.',
    publishedAt: '2025-03-05T08:00:00Z',
    readTime: 5,
    body: blocks(
      ['With petrol hovering above KSh 190 per litre and Nairobi\'s notorious gridlock, fuel efficiency is no longer a luxury — it\'s a necessity. Here are five cars that deliver outstanding economy in city traffic.'],
      ['1. Toyota Aqua (Prius C) — Hybrid', 'h2'],
      ['The Toyota Aqua is arguably the most popular fuel-efficient car in Kenya. Its 1.5L petrol-electric hybrid system returns an incredible 20–26 km/L in city driving because the electric motor takes over at low speeds. Widespread availability means spare parts are easy to find.'],
      ['2. Honda Fit (Jazz) 1.3L', 'h2'],
      ['The Honda Fit punches above its weight on efficiency. The 1.3L i-VTEC engine averages 15–18 km/L in traffic. Add in the remarkably spacious interior and you have a practical, economical daily driver.'],
      ['3. Toyota Vitz 1.0L', 'h2'],
      ['Kenya\'s best-selling budget car for a reason. The 1.0L three-cylinder engine is simple, reliable, and sips fuel — expect 16–20 km/L. Spare parts are cheap and available everywhere from Mombasa Road to Eldoret.'],
      ['4. Mazda Demio 1.3L (SkyActiv)', 'h2'],
      ['Mazda\'s SkyActiv technology squeezes more power from less fuel. The 1.3L Demio averages 17–19 km/L and has a surprisingly premium interior for its size. A great choice if you want something a little different from the Toyota norm.'],
      ['5. Toyota Prius 1.8L Hybrid', 'h2'],
      ['If budget isn\'t a constraint, the full Prius is the gold standard. Its 1.8L hybrid system returns 22–28 km/L in real-world Nairobi driving. The regenerative braking system actually benefits from stop-and-go traffic — the more you stop, the more it charges.'],
      ['Find Your Fuel-Efficient Car', 'h2'],
      ['All five of these models regularly appear in our Hive Motors stock. Browse our current inventory or WhatsApp us to be notified when your preferred model becomes available.'],
    ),
  },
];

async function seed() {
  console.log(`Seeding ${posts.length} blog posts to project ${env.NEXT_PUBLIC_SANITY_PROJECT_ID}...`);

  const transaction = client.transaction();
  for (const post of posts) {
    transaction.createOrReplace(post);
  }

  try {
    const result = await transaction.commit();
    console.log('✅ Done! Posts created:', result.results.length);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

seed();
