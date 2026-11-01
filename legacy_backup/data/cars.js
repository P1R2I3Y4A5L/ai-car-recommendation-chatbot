/**
 * Mock Cars Dataset - AI Car Recommendation Chatbot
 * Comprehensive realistic catalog with specs, safety ratings, pricing, and high-res imagery.
 */

export const mockCars = [
  {
    id: "car-creta-2024",
    brand: "Hyundai",
    model: "Creta",
    variant: "SX (O) 1.5 Turbo DCT",
    year: 2024,
    price: 1999000,
    priceFormatted: "₹19.99 Lakh",
    priceCategory: "mid-range",
    bodyType: "SUV",
    tagline: "The Benchmark Urban SUV with Level 2 ADAS & Connected Tech",
    overview: "Hyundai Creta dominates the compact SUV category with bold parametric styling, a refined 158 bhp turbo engine, and class-leading dual 10.25-inch connected screens.",
    primaryImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "1.5L Smartstream T-GDi Turbo Petrol",
      power: "158 bhp @ 5500 rpm",
      torque: "253 Nm @ 1500-3500 rpm",
      mileage: "18.4 km/l",
      acceleration: "8.9s (0-100 km/h)",
      bootSpace: "433 Litres",
      groundClearance: "190 mm",
      seating: 5,
      fuelType: "Petrol",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "Bharat NCAP",
        airbags: 6
      }
    },
    keyFeatures: [
      "Level 2 ADAS with 19 autonomous safety features",
      "Dual 10.25-inch integrated infotainment & digital cluster",
      "Voice-enabled panoramic smart sunroof",
      "Ventilated 8-way powered front seats",
      "Bose premium 8-speaker audio system",
      "360-degree surround view camera with blind view monitor",
      "Hyundai BlueLink with 70+ connected car functions"
    ],
    pros: [
      "High performance turbo petrol powertrain with seamless 7-speed DCT",
      "Plush ride quality tuned perfectly for Indian city and highway conditions",
      "Top-tier tech bundle with cutting-edge ADAS safety"
    ],
    cons: [
      "Aggressive styling may not appeal to traditionalists",
      "Rear seat space is best for two adults and a child on long journeys"
    ],
    isPopular: true,
    isTrending: true
  },
  {
    id: "car-xuv700-2024",
    brand: "Mahindra",
    model: "XUV700",
    variant: "AX7 Luxury Pack AWD",
    year: 2024,
    price: 2595000,
    priceFormatted: "₹25.95 Lakh",
    priceCategory: "mid-range",
    bodyType: "SUV",
    tagline: "Unrivaled Power, 5-Star Safety & Intelligent All-Wheel Drive",
    overview: "A flagship midsize 7-seater SUV packing a ferocious 197 bhp mStallion turbo petrol engine, AWD capability, and an ultra-safe crash-tested chassis.",
    primaryImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "2.0L mStallion Turbocharged Petrol",
      power: "197 bhp @ 5000 rpm",
      torque: "380 Nm @ 1750-3000 rpm",
      mileage: "13.0 km/l",
      acceleration: "8.2s (0-100 km/h)",
      bootSpace: "450 Litres (3rd row folded)",
      groundClearance: "200 mm",
      seating: 7,
      fuelType: "Petrol",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "Global NCAP",
        airbags: 7
      }
    },
    keyFeatures: [
      "ADAS Level 2: Adaptive cruise control, lane keep assist, auto emergency braking",
      "Dual 10.25-inch superscreen cockpit",
      "Sony 3D surround sound 12-speaker audio system with roof speakers",
      "Electronic Smart Door Handles",
      "Panoramic Skyroof",
      "All-Wheel Drive (AWD) intelligent traction system"
    ],
    pros: [
      "Segment-leading engine muscle and high-speed stability",
      "True 5-Star crash safety rating with robust build quality",
      "Spacious flexible cabin with genuine 7-seater practicality"
    ],
    cons: [
      "Petrol engine is thirsty in heavy bumper-to-bumper city traffic",
      "Third-row space is tight for tall adults on full-day road trips"
    ],
    isPopular: true,
    isTrending: true
  },
  {
    id: "car-city-hev-2024",
    brand: "Honda",
    model: "City e:HEV",
    variant: "ZX Strong Hybrid",
    year: 2024,
    price: 2055000,
    priceFormatted: "₹20.55 Lakh",
    priceCategory: "mid-range",
    bodyType: "Sedan",
    tagline: "The Quintessential Executive Sedan with 27.1 km/l Strong Hybrid Tech",
    overview: "Combining legendary Honda City rear legroom with dual-motor strong hybrid technology for breathtaking fuel economy and electric silence in city driving.",
    primaryImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "1.5L Atkinson Cycle i-VTEC + Dual Electric Motors",
      power: "124 bhp combined",
      torque: "253 Nm (Electric motor instant torque)",
      mileage: "27.13 km/l",
      acceleration: "9.5s (0-100 km/h)",
      bootSpace: "306 Litres (Hybrid battery fitted)",
      groundClearance: "165 mm",
      seating: 5,
      fuelType: "Hybrid",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "ASEAN NCAP",
        airbags: 6
      }
    },
    keyFeatures: [
      "Self-charging dual motor e:HEV hybrid powertrain",
      "Honda Sensing ADAS with Collision Mitigation Braking",
      "Electric parking brake with Auto Brake Hold",
      "Class-leading rear sofa-like lounge seating",
      "Lanewatch blind spot camera monitor",
      "Honda Connect telematics with smartwatch connectivity"
    ],
    pros: [
      "Exceptional 27 km/l fuel economy rivals two-wheelers in city traffic",
      "Unmatched rear seat comfort and ride suppleness",
      "Smooth EV-like drive feel without range anxiety"
    ],
    cons: [
      "Hybrid battery consumes a portion of the luggage trunk",
      "Infotainment screen UI looks slightly dated compared to rivals"
    ],
    isPopular: true,
    isTrending: false
  },
  {
    id: "car-ioniq5-2024",
    brand: "Hyundai",
    model: "Ioniq 5",
    variant: "Long Range RWD 72.6 kWh",
    year: 2024,
    price: 4605000,
    priceFormatted: "₹46.05 Lakh",
    priceCategory: "premium",
    bodyType: "SUV",
    tagline: "World Car of the Year: 800V Ultra-Fast Charging & Retro-Futurism",
    overview: "Built on an ultra-advanced dedicated E-GMP electric platform, the Ioniq 5 offers futuristic pixel design, 631 km ARAI certified range, and ultra-fast 10% to 80% charging in just 18 minutes.",
    primaryImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "Permanent Magnet Synchronous Electric Motor (72.6 kWh battery)",
      power: "214 bhp",
      torque: "350 Nm instant torque",
      mileage: "631 km / charge",
      acceleration: "7.6s (0-100 km/h)",
      bootSpace: "527 Litres + 57L front trunk (Frunk)",
      groundClearance: "163 mm",
      seating: 5,
      fuelType: "Electric",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "Euro NCAP",
        airbags: 6
      }
    },
    keyFeatures: [
      "800V ultra-fast charging architecture (10-80% in 18 mins)",
      "Vehicle-to-Load (V2L) bidirectional power supply for laptops/appliances",
      "Relaxation front seats with calf support recline",
      "Sliding Universal Island center console",
      "Level 2 SmartSense ADAS with 21 safety functions",
      "Parametric pixel LED lighting and flush automated door handles"
    ],
    pros: [
      "Remarkable EV range and lightning-fast charging speeds",
      "Lounge-like sustainable interior with flat floor and sliding console",
      "Head-turning design looks straight out of a concept studio"
    ],
    cons: [
      "Low profile stance drives more like a large crossover than a high-riding SUV",
      "Rear wiper is absent on certain model years"
    ],
    isPopular: false,
    isTrending: true
  },
  {
    id: "car-nexon-ev-2024",
    brand: "Tata",
    model: "Nexon.ev",
    variant: "Empowered+ Long Range 45 kWh",
    year: 2024,
    price: 1699000,
    priceFormatted: "₹16.99 Lakh",
    priceCategory: "mid-range",
    bodyType: "SUV",
    tagline: "India's Best-Selling Electric SUV with 465 km Real-World Range",
    overview: "The vehicle that catalyzed the EV revolution in India. Now refreshed with seamless digital lightbars, a 12.3-inch Cinematic touchscreen by Harman, and 5-Star B-NCAP crash rating.",
    primaryImage: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "Gen 2 Permanent Magnet Synchronous AC Motor (45 kWh)",
      power: "143 bhp",
      torque: "215 Nm",
      mileage: "465 km / charge (ARAI)",
      acceleration: "8.9s (0-100 km/h)",
      bootSpace: "350 Litres",
      groundClearance: "190 mm",
      seating: 5,
      fuelType: "Electric",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "Bharat NCAP",
        airbags: 6
      }
    },
    keyFeatures: [
      "12.3-inch cinematic touchscreen with Arcade.ev app store",
      "V2V (Vehicle to Vehicle) & V2L (Vehicle to Load) charging capability",
      "Paddle shifters for 4-level regenerative braking",
      "Ventilated leatherette front seats",
      "360-degree 3D surround view system with blind spot monitor",
      "Full width connected dynamic LED lightbars front and rear"
    ],
    pros: [
      "Extremely low running cost (less than ₹1.2 per km)",
      "Uncompromised 5-star crash safety and high ground clearance",
      "Punchy instantaneous acceleration off the line"
    ],
    cons: [
      "Real-world highway range drops to ~300 km at 100 km/h speeds",
      "Software bugs occasionally observed in earlier infotainment firmware"
    ],
    isPopular: true,
    isTrending: true
  },
  {
    id: "car-slavia-2024",
    brand: "Skoda",
    model: "Slavia",
    variant: "Style 1.5 TSI DSG Elegance",
    year: 2024,
    price: 1869000,
    priceFormatted: "₹18.69 Lakh",
    priceCategory: "mid-range",
    bodyType: "Sedan",
    tagline: "European Precision, 150 BHP Turbo Thrill & 5-Star NCAP Safety",
    overview: "Built for pure driving enthusiasts, the Skoda Slavia blends timeless European notchback styling, a segment-first active cylinder shutdown engine, and an immense 521-litre boot.",
    primaryImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "1.5L TSI EVO Turbo Petrol with Active Cylinder Tech",
      power: "148 bhp @ 5000 rpm",
      torque: "250 Nm @ 1600-3500 rpm",
      mileage: "19.36 km/l",
      acceleration: "8.6s (0-100 km/h)",
      bootSpace: "521 Litres",
      groundClearance: "179 mm",
      seating: 5,
      fuelType: "Petrol",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "Global NCAP",
        airbags: 6
      }
    },
    keyFeatures: [
      "Active Cylinder Deactivation technology for high highway efficiency",
      "7-speed DSG dual-clutch transmission with paddle shifters",
      "Electric sunroof with anti-pinch",
      "10-inch touchscreen with wireless SmartLink (Apple CarPlay / Android Auto)",
      "High ground clearance of 179mm suitable for rough terrain",
      "Subwoofer integrated 8-speaker Skoda audio system"
    ],
    pros: [
      "Incredible high-speed poise and razor-sharp steering feedback",
      "Giant 521-litre cargo boot swallows luggage for 5 adults",
      "Full 5-star Global NCAP rating for both adult and child occupants"
    ],
    cons: [
      "DSG gearbox requires diligent maintenance over long ownership",
      "Cabin plastics in lower dashboard feel utilitarian"
    ],
    isPopular: false,
    isTrending: true
  },
  {
    id: "car-hycross-2024",
    brand: "Toyota",
    model: "Innova HyCross",
    variant: "ZX (O) Strong Hybrid 7-Str",
    year: 2024,
    price: 3098000,
    priceFormatted: "₹30.98 Lakh",
    priceCategory: "premium",
    bodyType: "MPV",
    tagline: "The Sovereign Family Cruiser with Ottoman Seats & 21.1 km/l Mileage",
    overview: "The benchmark for long-distance family travel. Transitioning the legendary Innova into a monocoque SUV-style MPV with self-charging hybrid power and Ottoman recliner lounge seats.",
    primaryImage: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "2.0L 4-Cylinder Hybrid with e-Drive",
      power: "184 bhp combined",
      torque: "206 Nm (engine) + Instant e-motor torque",
      mileage: "21.1 km/l",
      acceleration: "9.5s (0-100 km/h)",
      bootSpace: "991 Litres (expandable)",
      groundClearance: "185 mm",
      seating: 7,
      fuelType: "Hybrid",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "Bharat NCAP",
        airbags: 6
      }
    },
    keyFeatures: [
      "Powered second-row Ottoman captain seats with calf support",
      "Toyota Safety Sense ADAS suite",
      "Panoramic moonroof with ambient mood illumination",
      "Dual-zone climate control with dedicated roof vents for all 3 rows",
      "9-speaker JBL premium acoustic audio",
      "Zero-maintenance Toyota bulletproof hybrid reliability"
    ],
    pros: [
      "Legendary Toyota reliability and unmatched resale retention",
      "Business-class comfort for all 7 passengers on 1,000 km trips",
      "Remarkable 21.1 km/l mileage for a full-size 4.8m people mover"
    ],
    cons: [
      "Lengthy booking waitlist for top ZX (O) variant",
      "Interior materials have hard plastics for a ₹30L+ price point"
    ],
    isPopular: true,
    isTrending: true
  },
  {
    id: "car-altroz-2024",
    brand: "Tata",
    model: "Altroz",
    variant: "XZ+ (S) i-Turbo Dark Edition",
    year: 2024,
    price: 999000,
    priceFormatted: "₹9.99 Lakh",
    priceCategory: "budget",
    bodyType: "Hatchback",
    tagline: "The Gold Standard: 5-Star NCAP Safety in a Premium Hot Hatch",
    overview: "Featuring striking laser-cut aesthetics, 90-degree opening doors, and a solid European chassis feel, the Altroz is India's safest premium hatchback.",
    primaryImage: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "1.2L Revotron Turbocharged Petrol",
      power: "108 bhp @ 5500 rpm",
      torque: "140 Nm @ 1500-5500 rpm",
      mileage: "18.5 km/l",
      acceleration: "10.7s (0-100 km/h)",
      bootSpace: "345 Litres",
      groundClearance: "165 mm",
      seating: 5,
      fuelType: "Petrol",
      transmission: "Manual",
      safetyRating: {
        stars: 5,
        agency: "Global NCAP",
        airbags: 6
      }
    },
    keyFeatures: [
      "5-Star Global NCAP crash safety certified body",
      "90-degree wide opening doors for easy ingress/egress",
      "Voice assisted electric sunroof",
      "Harmann tuned 8-speaker acoustic sound system",
      "Air purifier with AQI digital display",
      "Flat rear floor with supreme rear seat comfort"
    ],
    pros: [
      "Tank-like structural safety giving peace of mind",
      "Superb high-speed stability and compliant suspension",
      "Value-for-money pricing below ₹10 Lakhs"
    ],
    cons: [
      "Gearshift action is not as slick as Japanese competitors",
      "Engine note gets vocal when revved hard above 4,500 rpm"
    ],
    isPopular: true,
    isTrending: false
  },
  {
    id: "car-swift-2024",
    brand: "Maruti Suzuki",
    model: "Swift",
    variant: "ZXi+ Dual Tone AMT",
    year: 2024,
    price: 949000,
    priceFormatted: "₹9.49 Lakh",
    priceCategory: "budget",
    bodyType: "Hatchback",
    tagline: "India's Favorite Urban Runabout with 25.75 km/l Z-Series Mileage",
    overview: "The 4th Generation all-new Swift is powered by Suzuki's hyper-efficient 3-cylinder Z-Series engine, standard 6 airbags, and a nimble 4.8m turning radius.",
    primaryImage: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "1.2L 3-Cyl Z12E Dual VVT",
      power: "81 bhp @ 5700 rpm",
      torque: "112 Nm @ 4300 rpm",
      mileage: "25.75 km/l",
      acceleration: "12.2s (0-100 km/h)",
      bootSpace: "265 Litres",
      groundClearance: "163 mm",
      seating: 5,
      fuelType: "Petrol",
      transmission: "Automatic",
      safetyRating: {
        stars: 4,
        agency: "Euro NCAP",
        airbags: 6
      }
    },
    keyFeatures: [
      "Class-leading 25.75 km/l real-world fuel economy",
      "6 airbags standard across every single variant",
      "9-inch SmartPlay Pro+ touchscreen with wireless Apple CarPlay",
      "Wireless smartphone fast charger",
      "Rear parking camera with dynamic guidance lines",
      "Cruise control with steering mounted audio controls"
    ],
    pros: [
      "Unrivaled Maruti Suzuki service network in every corner of India",
      "Pocket-friendly maintenance and segment-leading resale value",
      "Effortless to drive and park in narrow city alleys"
    ],
    cons: [
      "3-cylinder engine has slight idle vibrations compared to previous 4-cyl",
      "Compact boot capacity of 265L restricts heavy luggage"
    ],
    isPopular: true,
    isTrending: true
  },
  {
    id: "car-curvv-ev-2024",
    brand: "Tata",
    model: "Curvv.ev",
    variant: "Empowered+ 55 kWh Long Range",
    year: 2024,
    price: 2199000,
    priceFormatted: "₹21.99 Lakh",
    priceCategory: "mid-range",
    bodyType: "Coupe",
    tagline: "India's First Electric SUV-Coupe with 502 km Range & Level 2 ADAS",
    overview: "A design revelation bringing exotic coupe-SUV rooflines to the mainstream market with Tata's acti.ev architecture, 500L trunk, and powered gesture tailgate.",
    primaryImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "Permanent Magnet Synchronous Motor (55 kWh battery)",
      power: "165 bhp",
      torque: "215 Nm",
      mileage: "502 km / charge (MIDC)",
      acceleration: "8.6s (0-100 km/h)",
      bootSpace: "500 Litres + 11L Frunk",
      groundClearance: "190 mm",
      seating: 5,
      fuelType: "Electric",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "Bharat NCAP",
        airbags: 6
      }
    },
    keyFeatures: [
      "Fastback SUV-Coupe aerodynamic silhouette",
      "Level 2 ADAS with 20 key assistance functions",
      "Powered gesture-controlled tailgate",
      "Flush automated smart door handles",
      "Panoramic glass roof with multi-stage sunblind",
      "JBL cinematic sound with custom spatial sound modes"
    ],
    pros: [
      "Stunning coupe design turns heads on every avenue",
      "Large 55 kWh battery provides realistic 400+ km interstate range",
      "Deep 500-litre trunk handles ample vacation baggage"
    ],
    cons: [
      "Sloping coupe roofline reduces rear headroom for passengers above 6'1\"",
      "Rear window visibility is restricted by the aerodynamic slope"
    ],
    isPopular: false,
    isTrending: true
  },
  {
    id: "car-bmw-330li-2024",
    brand: "BMW",
    model: "3 Series Gran Limousine",
    variant: "330Li M Sport Pro",
    year: 2024,
    price: 6260000,
    priceFormatted: "₹62.60 Lakh",
    priceCategory: "luxury",
    bodyType: "Sedan",
    tagline: "The Ultimate Driving Machine with 110mm Extra Executive Rear Legroom",
    overview: "The gold standard executive sports sedan combining BMW's celebrated rear-wheel drive balance with extended wheelbase luxury and a curved widescreen display.",
    primaryImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "2.0L TwinPower Turbo 4-Cylinder Petrol",
      power: "258 bhp @ 5000 rpm",
      torque: "400 Nm @ 1550-4400 rpm",
      mileage: "15.39 km/l",
      acceleration: "6.2s (0-100 km/h)",
      bootSpace: "480 Litres",
      groundClearance: "135 mm",
      seating: 5,
      fuelType: "Petrol",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "Euro NCAP",
        airbags: 8
      }
    },
    keyFeatures: [
      "BMW Curved Display: 12.3-inch cluster + 14.9-inch iDrive 8.5 screen",
      "Illuminated BMW Iconic Glow kidney grille",
      "16-speaker Harman Kardon Surround Sound System",
      "Panoramic twin-glass sunroof",
      "Comfort rear lounge seats with extra padding and headrest pillows",
      "Parking Assistant Plus with 3D Surround View & Reversing Assistant"
    ],
    pros: [
      "Electrifying 258 bhp twin-scroll turbo engine with 6.2s 0-100 sprint",
      "Immaculate rear cabin comfort with limousine legroom",
      "Sublime 50:50 weight distribution and agile chassis dynamics"
    ],
    cons: [
      "Low ground clearance requires caution over steep speed bumps",
      "Spare wheel occupies noticeable trunk room"
    ],
    isPopular: false,
    isTrending: false
  },
  {
    id: "car-fortuner-2024",
    brand: "Toyota",
    model: "Fortuner Legender",
    variant: "4x4 AT Diesel",
    year: 2024,
    price: 4764000,
    priceFormatted: "₹47.64 Lakh",
    priceCategory: "premium",
    bodyType: "SUV",
    tagline: "Unconquerable 500 Nm Torque, True 4x4 Off-Road Dominance",
    overview: "The undisputed king of rugged body-on-frame SUVs. Engineered to withstand the harshest off-road expeditions while retaining unbeatable street prestige.",
    primaryImage: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "2.8L 4-Cylinder D-4D Turbo Diesel",
      power: "201 bhp @ 3400 rpm",
      torque: "500 Nm @ 1600-2800 rpm",
      mileage: "14.2 km/l",
      acceleration: "9.8s (0-100 km/h)",
      bootSpace: "296 Litres (expandable to 716L)",
      groundClearance: "225 mm",
      seating: 7,
      fuelType: "Diesel",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "ASEAN NCAP",
        airbags: 7
      }
    },
    keyFeatures: [
      "Full-time heavy-duty 4x4 system with High & Low range transfer case",
      "Electronic differential lock and Auto Limited Slip Differential",
      "Legender Catamaran front fascia with quad-LED headlights",
      "Kick-sensor automated powered tailgate",
      "Ventilated front bucket seats",
      "11-speaker JBL audio system with subwoofer"
    ],
    pros: [
      "Indestructible mechanical reliability and go-anywhere 4x4 hardware",
      "Monster 500 Nm low-end torque pulls up steep inclines with ease",
      "Massive commanding road presence that parts highway traffic"
    ],
    cons: [
      "Ladder-frame ride is bouncy on uneven tarmac compared to monocoque SUVs",
      "Lacks modern Level 2 ADAS features found in competitors"
    ],
    isPopular: true,
    isTrending: false
  },
  {
    id: "car-ertiga-cng-2024",
    brand: "Maruti Suzuki",
    model: "Ertiga",
    variant: "ZXi (O) S-CNG",
    year: 2024,
    price: 1188000,
    priceFormatted: "₹11.88 Lakh",
    priceCategory: "budget",
    bodyType: "MPV",
    tagline: "India's Smartest 7-Seater Family Car with 26.11 km/kg CNG Economy",
    overview: "Combining genuine 3-row comfort with factory-fitted dual-ECU S-CNG technology to provide the lowest cost-per-km road trip experience for large families.",
    primaryImage: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "1.5L K15C Smart Hybrid Petrol / S-CNG",
      power: "87 bhp (CNG mode) / 102 bhp (Petrol)",
      torque: "121.5 Nm @ 4200 rpm",
      mileage: "26.11 km/kg (CNG)",
      acceleration: "13.4s (0-100 km/h)",
      bootSpace: "209 Litres (with CNG tank)",
      groundClearance: "180 mm",
      seating: 7,
      fuelType: "CNG",
      transmission: "Manual",
      safetyRating: {
        stars: 3,
        agency: "Global NCAP",
        airbags: 4
      }
    },
    keyFeatures: [
      "Factory-installed safe dual-interdependent ECU S-CNG system",
      "Flexible second and third row recline and fold seating",
      "Roof-mounted air-conditioning blower with 3-speed control",
      "SmartPlay Pro 7-inch touchscreen with smartphone navigation",
      "Air-cooled front cup holders"
    ],
    pros: [
      "Unbelievably low running expense (approx ₹2.5 per km on CNG)",
      "Roomy, airy cabin with huge glass area and light interior",
      "Comfortable suspension handles potholes effortlessly"
    ],
    cons: [
      "CNG cylinder occupies significant rear luggage space",
      "Modest engine power when carrying 7 passengers up mountain roads"
    ],
    isPopular: true,
    isTrending: false
  },
  {
    id: "car-seltos-2024",
    brand: "Kia",
    model: "Seltos",
    variant: "GTX+ 1.5 Turbo Petrol DCT",
    year: 2024,
    price: 2000000,
    priceFormatted: "₹20.00 Lakh",
    priceCategory: "mid-range",
    bodyType: "SUV",
    tagline: "Dynamic Styling, 160 BHP Turbo Sprint & Dual Panoramic Cockpit",
    overview: "Kia Seltos stands out with aggressive tiger-nose styling, sporty GT-Line accents, Level 2 ADAS with 17 features, and a dual 10.25-inch panoramic display.",
    primaryImage: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "1.5L Smartstream Turbo GDi",
      power: "158 bhp @ 5500 rpm",
      torque: "253 Nm @ 1500-3500 rpm",
      mileage: "17.9 km/l",
      acceleration: "8.9s (0-100 km/h)",
      bootSpace: "433 Litres",
      groundClearance: "190 mm",
      seating: 5,
      fuelType: "Petrol",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "Bharat NCAP",
        airbags: 6
      }
    },
    keyFeatures: [
      "Dual 10.25-inch high-definition curved cockpit display",
      "Level 2 ADAS suite with Smart Cruise Control with Stop & Go",
      "Dual-pane panoramic sunroof",
      "8-speaker Bose premium sound system with dynamic speed compensation",
      "Ventilated front bucket seats with 8-way power adjust",
      "360-degree camera with blind spot view in cluster"
    ],
    pros: [
      "Sharp, athletic exterior design with eye-catching LED light signatures",
      "Immediate throttle response and rapid gear shifts with 7-DCT",
      "Rich interior fit and finish with soft-touch materials"
    ],
    cons: [
      "Sportier suspension setup is firm on broken urban roads",
      "Rear seat comfort is slightly firmer than the Hyundai Creta"
    ],
    isPopular: true,
    isTrending: true
  },
  {
    id: "car-verna-2024",
    brand: "Hyundai",
    model: "Verna",
    variant: "SX (O) 1.5 Turbo DCT",
    year: 2024,
    price: 1742000,
    priceFormatted: "₹17.42 Lakh",
    priceCategory: "mid-range",
    bodyType: "Sedan",
    tagline: "Futuristic Fastback Sedan with 5-Star B-NCAP Safety & 160 BHP",
    overview: "Redefining the C-sedan segment with cyberpunk fastback proportions, 5-Star crash safety rating, and a thrilling 158 bhp turbo engine capable of 0-100 km/h in 8.1 seconds.",
    primaryImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "1.5L Turbo GDi 4-Cylinder",
      power: "158 bhp @ 5500 rpm",
      torque: "253 Nm @ 1500-3500 rpm",
      mileage: "20.6 km/l",
      acceleration: "8.1s (0-100 km/h)",
      bootSpace: "528 Litres",
      groundClearance: "170 mm",
      seating: 5,
      fuelType: "Petrol",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "Global NCAP",
        airbags: 6
      }
    },
    keyFeatures: [
      "Full 5-Star Global NCAP safety rating",
      "Segment-leading 528-litre cavernous boot space",
      "Heated AND ventilated front seats (segment-first)",
      "Horizon LED positioning light & rear connected tail light",
      "Switchable dual-function climate & infotainment control panel",
      "Hyundai SmartSense Level 2 ADAS"
    ],
    pros: [
      "Fastest acceleration in its price segment (0-100 in 8.1s)",
      "Enormous boot capacity ideal for airport runs and road trips",
      "Supple high-speed highway stability"
    ],
    cons: [
      "Polarizing futuristic front grille styling",
      "Lower seating position compared to compact SUVs"
    ],
    isPopular: true,
    isTrending: false
  },
  {
    id: "car-mercedes-c200-2024",
    brand: "Mercedes-Benz",
    model: "C-Class",
    variant: "C 200 Avantgarde Line",
    year: 2024,
    price: 6185000,
    priceFormatted: "₹61.85 Lakh",
    priceCategory: "luxury",
    bodyType: "Sedan",
    tagline: "The 'Baby S-Class': 11.9-inch Vertical MBUX & 48V Mild Hybrid",
    overview: "Channeling the opulent architecture of Mercedes-Benz's flagship S-Class, the C 200 boasts a portrait touchscreen, 64-color ambient lighting, and refined mild-hybrid power.",
    primaryImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "1.5L Turbo Petrol + 48V Integrated Starter Generator",
      power: "201 bhp + 20 bhp EQ Boost",
      torque: "300 Nm + 200 Nm EQ Boost",
      mileage: "16.9 km/l",
      acceleration: "7.3s (0-100 km/h)",
      bootSpace: "455 Litres",
      groundClearance: "145 mm",
      seating: 5,
      fuelType: "Petrol",
      transmission: "Automatic",
      safetyRating: {
        stars: 5,
        agency: "Euro NCAP",
        airbags: 7
      }
    },
    keyFeatures: [
      "11.9-inch portrait OLED central touchscreen with MBUX Gen 2",
      "12.3-inch floating digital driver cluster",
      "64-color ambient lighting with illuminated turbine AC vents",
      "Biometric fingerprint recognition for custom driver profiles",
      "Active Brake Assist and Blind Spot Assist",
      "Panoramic dual-glass power sunroof"
    ],
    pros: [
      "Showstopping luxury cabin ambience that feels distinctly like an S-Class",
      "Silky-smooth 9G-Tronic transmission and serene cabin sound insulation",
      "Prestigious 3-pointed star badge recognition"
    ],
    cons: [
      "Ride is slightly firm on low-profile 18-inch alloy wheels",
      "Touch-sensitive capacitive steering buttons can be finicky on the move"
    ],
    isPopular: false,
    isTrending: false
  }
];
